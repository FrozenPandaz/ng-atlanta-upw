import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { isPlatformServer } from '@angular/common';

import { map } from 'rxjs/operators';

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

  public profiles: Observable<Profile[]> = this.firestore.collection('profiles').valueChanges() as Observable<Profile[]>;

  private listName: string;

  constructor(
    private firestore: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string) { }

  async ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.listName = this.activatedRoute.snapshot.params.listName;
    await this.getList(this.listName);
  }

  addProfile(profile: Profile) {
    console.log(profile);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.firestore.collection('lists').doc(this.listName).set({
      name: this.listFormGroup.get('name').value,
      description: this.listFormGroup.get('description').value
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

}
