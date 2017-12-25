import * as firebase from 'firebase';

export class ProfilesController {

  constructor(private firestore: firebase.firestore.Firestore) {}

  async getProfile(profileSlug: string): Promise<any> {
    const snapshot = await this.firestore.collection('profiles').doc(profileSlug).get();
    if (!snapshot.exists) {
      return {};
    }
    return snapshot.data();
  }
}
