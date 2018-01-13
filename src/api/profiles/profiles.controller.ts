import * as firebase from 'firebase/app';
import { Power, Profile } from '../../app/profile/profile/profile';

export class ProfilesController {

  constructor(private firestore: firebase.firestore.Firestore) {}

  async getProfile(profileSlug: string): Promise<any> {
    const profileDoc = this.firestore.collection('profiles').doc(profileSlug);
    const snapshot = await profileDoc.get();
    if (!snapshot.exists) {
      return {};
    }

    const profile: Profile = snapshot.data() as Profile;

    const powersDoc = profileDoc.collection('powers');
    const powers = await powersDoc.get();
    if (powers.empty) {
      return profile;
    }

    profile.powers = [];
    powers.docs.forEach(doc => {
      profile.powers.push(doc.data() as Power);
    });
    return profile;
  }
}
