import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { isPlatformServer } from '@angular/common';

import { List } from '../lander/list/list';

@Component({
  selector: 'fbs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  public listFormGroup: FormGroup;

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
      return;
    }

    const list: List = listRef.data() as List;
    this.listFormGroup = new FormGroup({
      name: new FormControl(list.name),
      description: new FormControl(list.description)
    });
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

}
