import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { List } from '../../lander/list/list';
import { Profile } from '../../profile/profile/profile';

export interface Membership {
  rank: number;
  list: firebase.firestore.DocumentReference;
  listId: string;
  profile: firebase.firestore.DocumentReference;
  profileId: string;
  prev?: firebase.firestore.DocumentReference;
  next?: firebase.firestore.DocumentReference;
}

@Component({
  selector: 'upw-edit-lander',
  templateUrl: './edit-lander.component.html',
  styleUrls: ['./edit-lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLanderComponent implements OnInit {

  public listFormGroup: FormGroup;

  private listName: string = this.activatedRoute.snapshot.params.listName;
  private listRef: AngularFirestoreDocument<List> = this.firestore.collection('lists').doc(this.listName);

  public profiles: Observable<firebase.firestore.DocumentData[]> = this.getProfiles();

  public members: Observable<Membership[]> = this.getMembers();

  isNode: boolean = isPlatformServer(this.platformId);

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string) { }

  async ngOnInit() {
    if (this.isNode) {
      return;
    }

    await this.getList(this.listName);
  }

  async addProfile(profile: Profile) {
    if (await this.memberExists(profile)) {
      alert('Profile already exists');
    } else {
      const memberships = this.firestore.collection<Membership>('memberships');
      const lastMemberSnapshot = await memberships
        .ref
        .orderBy('rank', 'desc')
        .where('listId', '==', this.listName)
        .limit(1)
        .get();
      const lastMemberDoc = lastMemberSnapshot.docs[0];
      const data = {
        list: this.listRef.ref,
        listId: this.listName,
        profile: this.firestore.collection('profiles').doc(profile.id).ref,
        profileId: profile.id
      };

      const newMembershipDoc = memberships.doc(`${this.listName}:${profile.id}`);

      const batch = this.firestore.firestore.batch();

      if (lastMemberSnapshot.empty) {
        batch.set(newMembershipDoc.ref, {
          ...data,
          rank: 1
        });
      } else {
        batch.set(newMembershipDoc.ref, {
          ...data,
          prev: lastMemberDoc.ref,
          rank: lastMemberDoc.get('rank') + 1
        });
        batch.update(lastMemberDoc.ref, {
          next: newMembershipDoc.ref
        });
      }
      await batch.commit();
    }
  }

  async removeMember(membership: Membership) {
    const memberships = this.firestore.collection<Membership>('memberships');
    const memberDoc = memberships.doc(`${membership.listId}:${membership.profileId}`).ref;

    const lowerMembers = await memberships
      .ref
      .where('rank', '>', membership.rank)
      .get();

    const prev = membership.prev;
    const next = membership.next;
    const batch = this.firestore.firestore.batch();
    if (prev) {
      batch.update(prev, {
        next: next || firebase.firestore.FieldValue.delete()
      });
    }
    if (next) {
      batch.update(next, {
        prev: prev || firebase.firestore.FieldValue.delete()
      });
    }
    lowerMembers.forEach(doc => {
      batch.update(doc.ref, {
        rank: doc.get('rank') - 1
      });
    });
    batch.delete(memberDoc);

    await batch.commit();
  }

  async shiftMember(membership: Membership, direction: 'up' | 'down') {
    // wow, this was too hard...

    const memberships = this.firestore.collection<Membership>('memberships');

    this.firestore.firestore.runTransaction(async transaction => {
      const memberDoc = memberships.doc(`${membership.listId}:${membership.profileId}`).ref;
      const prevDoc = membership.prev;
      const nextDoc = membership.next;

      if (direction === 'up') {
        // Our member is moving up
        if (!prevDoc) {
          // Bail if the member has nowhere to go
          return;
        }

        const prevMembership = await transaction.get(prevDoc);
        // We're going to need the one above the previous member
        const newPrev: firebase.firestore.DocumentReference = prevMembership.get('prev');

        // The previous doc moves down 1 and gets linked to the next doc
        transaction.update(prevDoc, {
          rank: membership.rank,
          prev: memberDoc,
          next: nextDoc || firebase.firestore.FieldValue.delete()
        });

        // The next doc points to the previous doc
        // There could be no nextDoc
        if (nextDoc) {
          transaction.update(nextDoc, {
            prev: prevDoc || firebase.firestore.FieldValue.delete()
          });
        }

        // The target doc now points to the one above the previous doc
        transaction.update(memberDoc, {
          rank: membership.rank - 1,
          prev: newPrev || firebase.firestore.FieldValue.delete(),
          next: prevDoc
        });
      } else {
        // Our member is moving down
        if (!nextDoc) {
          // If there is no member below it, bail
          return;
        }

        const nextMembership = await transaction.get(nextDoc);
        // We're going to need the one below the next doc
        const newNext: firebase.firestore.DocumentReference = nextMembership.get('next');

        // The next doc moves up 1 and gets linked to the previous doc
        transaction.update(nextDoc, {
          rank: membership.rank,
          next: memberDoc,
          prev: prevDoc || firebase.firestore.FieldValue.delete()
        });

        // The previous doc gets linked to the next doc
        // There could be no prevDoc
        if (prevDoc) {
          transaction.update(prevDoc, {
            next: nextDoc || firebase.firestore.FieldValue.delete()
          });
        }

        // The target doc moves down 1 and gets linked to the one below the next doc
        transaction.update(memberDoc, {
          rank: membership.rank + 1,
          next: newNext || firebase.firestore.FieldValue.delete(),
          prev: nextDoc
        });
      }
    });
  }

  private async memberExists(profile: Profile): Promise<boolean> {
    const memberSnapshot = await this.firestore
      .collection<Membership>('memberships')
      .doc(`${this.listName}:${profile.id}`).ref.get();

    return memberSnapshot.exists;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.listRef.update({
      name: this.listFormGroup.get('name').value,
      description: this.listFormGroup.get('description').value,
      id: this.activatedRoute.snapshot.params.listName
    });
  }

  private async getList(listName: string): Promise<void> {
    const listRef = await this.firestore.collection('lists').doc(listName).ref.get();

    if (!listRef.exists) {
      this.listFormGroup = new FormGroup({
        name: new FormControl(),
        description: new FormControl()
      });
    } else {
      const list: List = listRef.data() as List;
      this.listFormGroup = new FormGroup({
        name: new FormControl(list.name),
        description: new FormControl(list.description)
      });
    }
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

  private getMembers() {
    return this.firestore.collection<Membership>('memberships', ref => {
      return ref
        .orderBy('rank', 'asc')
        .where('listId', '==', this.listName);
    }).valueChanges();
  }

  private getProfiles() {
    return this.firestore.collection<Profile>('profiles')
      .valueChanges();
  }

}
