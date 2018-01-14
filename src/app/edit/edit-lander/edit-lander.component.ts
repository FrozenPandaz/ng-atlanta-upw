import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { List } from '../../lander/list/list';
import { Profile } from '../../profile/profile/profile';
import { EditLanderService } from './edit-lander.service';

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

  public profiles: Observable<Profile[]> = this.getProfiles();

  public members: Observable<Membership[]> = this.getMembers();

  isNode: boolean = isPlatformServer(this.platformId);

  constructor(
    private firestore: AngularFirestore,
    private editLanderService: EditLanderService,
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
    await this.editLanderService.addProfile(profile, this.listName);
  }

  async removeMember(membership: Membership) {
    await this.editLanderService.removeMember(membership);
  }

  async shiftMember(membership: Membership, direction: 'up' | 'down') {
    await this.editLanderService.shiftMember(membership, direction);
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
    return this.editLanderService.getMembers(this.listName);
  }

  private getProfiles() {
    return this.firestore.collection<Profile>('profiles')
      .valueChanges();
  }

}
