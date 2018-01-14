import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { List } from '../../lander/list/list';
import { Profile } from '../../profile/profile/profile';
import { Membership } from './edit-lander.component';

@Injectable()
export class EditLanderService {

  constructor(private firestore: AngularFirestore) { }

  async addProfile(profile: Profile, listId: string) {
    if (await this.memberExists(profile, listId)) {
      alert('Profile already exists');
    } else {
      const listRef = this.firestore.collection<List>('lists').doc(listId);
      const memberships = this.firestore.collection<Membership>('memberships');
      const lastMemberSnapshot = await memberships
        .ref
        .orderBy('rank', 'desc')
        .where('listId', '==', listId)
        .limit(1)
        .get();
      const lastMemberDoc = lastMemberSnapshot.docs[0];
      const data = {
        list: listRef.ref,
        listId,
        profile: this.firestore.collection('profiles').doc(profile.id).ref,
        profileId: profile.id
      };

      const newMembershipDoc = memberships.doc(`${listId}:${profile.id}`);

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

  getMembers(listId: string): Observable<Membership[]> {
    return this.firestore.collection<Membership>('memberships', ref => {
      return ref
        .orderBy('rank', 'asc')
        .where('listId', '==', listId);
    }).valueChanges();
  }

  private async memberExists(profile: Profile, listId: string): Promise<boolean> {
    const memberSnapshot = await this.firestore
      .collection<Membership>('memberships')
      .doc(`${listId}:${profile.id}`).ref.get();

    return memberSnapshot.exists;
  }

}
