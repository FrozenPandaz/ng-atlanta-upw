import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Profile } from '../../profile/profile/profile';

@Injectable()
export class EditProfileService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  async updateProfile(profileId: string, profile: Partial<Profile>) {
    const profileDoc = this.firestore.collection('profiles').doc(profileId);
    const batch = this.firestore.firestore.batch();

    if (profile.powers) {
      const powersRef = profileDoc.collection('powers');
      const powerDocs = await powersRef.ref.get();

      profile.powers.forEach((power, i) => {
        powersRef.doc(i.toString()).set(power);
      });
      powerDocs.docs
        .filter((doc, i) => i >= profile.powers.length)
        .forEach((doc) => {
          batch.delete(doc.ref);
        });
      delete profile.powers;
    }

    batch.update(profileDoc.ref, {
      ...profile,
      name: this.getName(profile)
    });

    return batch.commit();
  }

  getName(profile: Partial<Profile>) {
    if (!profile.nameFormat) {
      return '';
    }
    return profile.nameFormat
      .replace('FN', profile.firstName)
      .replace('MN', profile.middleName)
      .replace('LN', profile.lastName);
  }

}
