import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { Power, Profile } from '../../profile/profile/profile';

@Component({
  selector: 'upw-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {

  public formGroup: FormGroup;

  get powers(): FormArray {
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

  async publish(event: Event) {
    event.preventDefault();

    const formData = this.formGroup.value;

    if (formData.powers) {
      const powersDoc = this.profileDoc.collection('powers');
      const powersRef = await powersDoc.ref.get();
      formData.powers.forEach((power, i) => {
        this.profileDoc.collection('powers').doc(i.toString()).set(power);
      });
      delete formData.powers;
    }

    this.profileDoc.update({
      ...formData,
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

  addPower() {
    this.powers.push(this.formBuilder.group({
      name: '',
      strength: 0
    }));
  }

  private async getProfile(): Promise<void> {
    const profileRef = await this.profileDoc.ref.get();
    const powersRef = await this.profileDoc.collection<Power>('powers').ref.get();
    this.exists = profileRef.exists;
    if (this.exists) {
      const profile: Profile = profileRef.data() as Profile;
      const form = this.formBuilder.group(this.getProfileFormData(profile));
      form.setControl('powers', this.formBuilder.array([]));
      if (!powersRef.empty) {
        const powers = powersRef.docs.map(doc => {
          return this.formBuilder.group(doc.data());
        });
        form.setControl('powers', this.formBuilder.array(powers));
      }
      this.formGroup = form;
      this.profileDoc.valueChanges().subscribe((value) => {
        this.formGroup.patchValue(this.getProfileFormData(value));
      }),
      this.profile = this.formGroup.valueChanges.pipe(
        map(value => {
          return {
            ...value,
            name: this.getName(),
            id: this.profileDoc.ref.id
          };
        })
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

}
