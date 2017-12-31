import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { isPlatformServer } from '@angular/common';
import * as firebase from 'firebase';
import { first, map, tap } from 'rxjs/operators';

import { List } from '../../lander/list/list';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../../profile/profile/profile';

@Component({
  selector: 'fbs-edit-lander',
  templateUrl: './edit-lander.component.html',
  styleUrls: ['./edit-lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLanderComponent implements OnInit {

  public listFormGroup: FormGroup;

  private listName: string = this.activatedRoute.snapshot.params.listName;
  private listRef: AngularFirestoreDocument<List> = this.firestore.collection('lists').doc(this.listName);

  public profiles: Observable<firebase.firestore.DocumentData[]> = this.getProfiles();

  public members: Observable<{ profile: firebase.firestore.DocumentReference }[]> = this.getMembers();

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string) { }

  async ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    await this.getList(this.listName);
  }

  async addProfile(profile: Profile) {
    if (await this.memberExists(profile)) {
      alert('Profile already exists');
    } else {
      const members = await this.listRef.collection('members').ref.get();
      this.listRef.collection('members').add({
        rank: members.size + 1,
        profile: this.firestore.collection('profiles').doc(profile.id).ref
      });
    }
  }

  async removeMember(member: any) {
    const membersSnapshot = await this.listRef
      .collection<{ profile: firebase.firestore.DocumentReference }>('members').ref
      .where('rank', '>=', member.rank).get();

    membersSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.rank === member.rank) {
        doc.ref.delete();
      } else {
        doc.ref.update({
          rank: data.rank - 1
        });
      }
    });
    membersSnapshot.docs[0].ref.delete();
  }

  async shiftMember(member: any, direction: 'up' | 'down') {
    const membersRef = this.listRef
      .collection<{ profile: firebase.firestore.DocumentReference }>('members').ref;

    const offset = direction === 'up' ? -1 : 1;

    const targetMemberRefs = await membersRef.where('rank', '==', member.rank).limit(1).get();
    const affectedMemberRefs = await membersRef.where('rank', '==', member.rank + offset).limit(1).get();

    const [ targetMemberDoc ] = targetMemberRefs.docs;
    const [ affectedMemberDoc ] = affectedMemberRefs.docs;

    targetMemberDoc.ref.update({
      rank: targetMemberDoc.data().rank + offset
    });
    affectedMemberDoc.ref.update({
      rank: affectedMemberDoc.data().rank - offset
    });
  }

  private async memberExists(profile: Profile): Promise<boolean> {
    const membersSnapshot = await this.listRef
      .collection<{ profile: firebase.firestore.DocumentReference }>('members', ref => ref.orderBy('rank'))
      .ref.get();
    const index = membersSnapshot.docs.findIndex(doc => {
      return doc.data().profile.id === profile.id;
    });
    return index > -1;
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
    return this.listRef
      .collection<{ profile: firebase.firestore.DocumentReference }>('members', ref => ref.orderBy('rank'))
      .valueChanges();
  }

  private getProfiles() {
    return this.firestore.collection<Profile>('profiles')
      .valueChanges();
  }

}
