import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Profile } from '../../profile/profile/profile';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'upw-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {

  public formGroup: FormGroup;

  public exists = true;

  private profileSlug: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestore: AngularFirestore,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  async ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.profileSlug = this.activatedRoute.snapshot.params.profileSlug;
    await this.getProfile(this.profileSlug);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.firestore.collection('profiles').doc(this.profileSlug).set({
      name: this.formGroup.get('name').value,
      bio: this.formGroup.get('bio').value,
      image: this.formGroup.get('image').value,
      id: this.profileSlug
    });
  }

  private async getProfile(profileSlug: string): Promise<void> {
    const profileRef = await this.firestore.collection('profiles').doc(profileSlug).ref.get();

    if (!profileRef.exists) {
      this.exists = false;
      this.formGroup = new FormGroup({
        name: new FormControl(),
        bio: new FormControl(),
        image: new FormControl()
      });
    } else {
      const profile: Profile = profileRef.data() as Profile;
      this.formGroup = new FormGroup({
        name: new FormControl(profile.name),
        bio: new FormControl(profile.bio),
        image: new FormControl(profile.image)
      });
    }
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

}
