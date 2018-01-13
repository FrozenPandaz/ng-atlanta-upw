import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { Profile } from '../../profile/profile/profile';

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

  profile: Observable<Profile>;

  private profileDoc: AngularFirestoreDocument<Profile>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  async ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const profileSlug = this.activatedRoute.snapshot.params.profileSlug;
    this.profileDoc = this.firestore.collection('profiles').doc<Profile>(profileSlug);

    await this.getProfile();
  }

  publish(event: Event) {
    event.preventDefault();

    this.profileDoc.update({
      ...this.formGroup.value,
      name: this.getName()
    });
  }

  async create() {
    await this.profileDoc.set({
      id: this.profileDoc.ref.id
    } as Profile);
    this.getProfile();
  }

  async delete() {
    await this.profileDoc.delete();
  }

  private async getProfile(): Promise<void> {
    const profileRef = await this.profileDoc.ref.get();
    this.exists = profileRef.exists;
    if (this.exists) {
      const profile: Profile = profileRef.data() as Profile;
      this.formGroup = this.formBuilder.group(this.getProfileFormData(profile));
      this.profile = merge(
        this.profileDoc.valueChanges().pipe(
          tap((value) => {
            this.formGroup.setValue(this.getProfileFormData(value));
          })
        ),
        this.formGroup.valueChanges.pipe(
          map(value => {
            return {
              ...value,
              name: this.getName(),
              id: this.profileDoc.ref.id
            };
          })
        )
      );
    }
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

  private getName() {
    const formData = this.formGroup.value;
    return formData.nameFormat
      .replace('FN', formData.firstName)
      .replace('MN', formData.middleName)
      .replace('LN', formData.lastName);
  }

  private getProfileFormData(profile: Profile) {
    const formData = {
      ...profile
    };
    delete formData.id;
    delete formData.name;
    return formData;
  }

}
