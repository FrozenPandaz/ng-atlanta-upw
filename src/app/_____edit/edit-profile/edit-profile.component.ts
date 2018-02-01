import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subscription } from 'rxjs/Subscription';

import { Power, Profile } from '../../profile/profile/profile';
import { EditProfileService } from './edit-profile.service';

@Component({
  selector: 'upw-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;

  get powers(): FormArray {
    if (!this.formGroup) {
      return null;
    }
    return this.formGroup.get('powers') as FormArray;
  }

  public exists = true;

  public nameFormats = [
    'FN LN',
    'FN MN LN',
    'FN'
  ];

  profile: Observable<Profile>;

  private profileDoc: AngularFirestoreDocument<Profile>;

  private profileSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private editProfileService: EditProfileService,
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

    const profile = await this.getProfile();

    this.exists = !!profile;

    if (profile) {

      this.formGroup = await this.createForm(profile);
      this.subscribeForChanges();
    }
    this.cdRef.detectChanges();
  }

  async publish(event: Event) {
    event.preventDefault();

    return this.editProfileService.updateProfile(this.profileDoc.ref.id, this.formGroup.value);
  }

  async create() {
    await this.profileDoc.set({
      id: this.profileDoc.ref.id
    } as Profile);
    this.formGroup = await this.createForm(this.getProfileFormData({}));
    this.exists = true;
    this.subscribeForChanges();
    this.cdRef.detectChanges();
  }

  async delete() {
    await this.profileDoc.delete();
  }

  addPower() {
    this.powers.push(this.formBuilder.group({
      name: '',
      strength: 0
    }));
  }

  private async createForm(profile: Partial<Profile>) {
    const form = this.formBuilder.group(this.getProfileFormData(profile));

    const powers = await this.getPowers();
    form.setControl('powers', this.formBuilder.array(
      powers.map((power: Power) => this.formBuilder.group(power))
    ));

    return form;
  }

  private async getPowers(): Promise<Power[]> {
    const powersRef = await this.profileDoc.collection<Power>('powers').ref.get();
    if (powersRef.empty) {
      return [];
    }
    return powersRef.docs
      .map<Power>(doc => doc.data() as Power);
  }

  private subscribeForChanges() {
    this.profileSub = this.profileDoc.valueChanges().subscribe((value) => {
      this.formGroup.patchValue(this.getProfileFormData(value));
    });
    this.profile = this.formGroup.valueChanges.pipe(
      map(value => {
        if (value.powers.length < 1) {
          delete value.powers;
        }
        return {
          ...value,
          name: this.editProfileService.getName(value),
          id: this.profileDoc.ref.id
        };
      })
    );
  }

  private async getProfile(): Promise<Profile | null> {
    const profileRef = await this.profileDoc.ref.get();
    if (!profileRef.exists) {
      return null;
    }
    return profileRef.data() as Profile;
  }

  private getProfileFormData(profile: Partial<Profile>) {
    const formData: Partial<Profile> = {
      firstName: '',
      middleName: '',
      lastName: '',
      nameFormat: this.nameFormats[0],
      bio: '',
      image: '',
      ...profile
    };
    delete formData.id;
    delete formData.name;
    return formData;
  }

  ngOnDestroy() {
    if (this.profileSub) {
      this.profileSub.unsubscribe();
    }
  }

}
