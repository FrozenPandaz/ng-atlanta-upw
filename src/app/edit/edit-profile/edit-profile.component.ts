import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Profile } from '../../profile/profile/profile';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { merge } from 'rxjs/observable/merge';

interface Change {
  key: string;
  value: any;
}

@Component({
  selector: 'upw-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {

  public formGroup: FormGroup;

  public exists = true;

  public nameFormats = [
    'FN LN',
    'FN MN LN',
    'FN'
  ];

  isNode: boolean = isPlatformServer(this.platformId);

  profile: Observable<Profile>;

  private profileDoc: AngularFirestoreDocument<Profile>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  async ngOnInit() {
    if (this.isNode) {
      return;
    }

    const profileSlug = this.activatedRoute.snapshot.params.profileSlug;
    this.profileDoc = this.firestore.collection('profiles').doc<Profile>(profileSlug);

    this.profile = this.profileDoc.valueChanges();
    await this.getProfile();

    merge(
      this.getChanges('firstName'),
      this.getChanges('middleName'),
      this.getChanges('lastName'),
      this.getChanges('nameFormat'),
      this.getChanges('bio'),
      this.getChanges('image')
    )
    .pipe(
      debounceTime(100),
    ).subscribe((partial: Partial<Profile>) => {
      this.profileDoc.update(partial);
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
  }

  create() {
    this.profileDoc.update({
      id: this.profileDoc.ref.id
    });
  }

  private getChanges(key: keyof Profile): Observable<Partial<Profile>> {
    return this.formGroup.controls[key].valueChanges.pipe(
      map((value: any) => {
        const partial: Partial<Profile> = {};
        partial[key] = value;
        return partial;
      })
    );
  }

  private async getProfile(): Promise<void> {
    const profileRef = await this.profileDoc.ref.get();
    this.exists = profileRef.exists;
    if (this.exists) {
      const profile: Profile = profileRef.data() as Profile;
      this.formGroup = new FormGroup({
        firstName: new FormControl(profile.firstName),
        middleName: new FormControl(profile.middleName),
        lastName: new FormControl(profile.lastName),
        nameFormat: new FormControl(profile.nameFormat),
        bio: new FormControl(profile.bio),
        image: new FormControl(profile.image)
      });
      this.cdRef.markForCheck();
      this.cdRef.detectChanges();
    }
  }

  private getName() {
    const formData = this.formGroup.value;
    return formData.nameFormat
      .replace('FN', formData.firstName)
      .replace('MN', formData.middleName)
      .replace('LN', formData.lastName);
  }

}
