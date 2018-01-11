import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Profile } from '../../profile/profile/profile';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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

  private profileSlug: string;

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

    this.profileSlug = this.activatedRoute.snapshot.params.profileSlug;
    await this.getProfile(this.profileSlug);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.firestore.collection('profiles').doc(this.profileSlug).set({
      ...this.formGroup.value,
      name: this.getName(),
      id: this.profileSlug
    });
  }

  private async getProfile(profileSlug: string): Promise<void> {
    const profileDoc = this.firestore.collection('profiles').doc<Profile>(profileSlug);
    const profileRef = await profileDoc.ref.get();

    if (!profileRef.exists) {
      this.exists = false;
      this.formGroup = new FormGroup({
        firstName: new FormControl(),
        middleName: new FormControl(),
        lastName: new FormControl(),
        nameFormat: new FormControl(this.nameFormats[0]),
        bio: new FormControl(),
        image: new FormControl()
      });
    } else {
      const profile: Profile = profileRef.data() as Profile;
      this.formGroup = new FormGroup({
        firstName: new FormControl(profile.firstName),
        middleName: new FormControl(profile.middleName),
        lastName: new FormControl(profile.lastName),
        nameFormat: new FormControl(profile.nameFormat),
        bio: new FormControl(profile.bio),
        image: new FormControl(profile.image)
      });

      this.profile = profileDoc.valueChanges();
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

}
