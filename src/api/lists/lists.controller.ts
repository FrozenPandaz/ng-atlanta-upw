import * as firebase from 'firebase/app';

export class ListsController {

  constructor(private firestore: firebase.firestore.Firestore) {}

  async getList(name: string): Promise<any> {
    const listRef = this.firestore.collection('lists').doc(name);
    const listSnapshot = await listRef.get();
    if (!listSnapshot.exists) {
      return {};
    }

    const result = listSnapshot.data();
    result.members = [];

    const membersSnapshot = await listRef.collection('members').orderBy('rank').get();
    result.members = await Promise.all(membersSnapshot.docs.map(async doc => {
      const item = doc.data();
      const profileSnapshot = await this.firestore.collection('profiles').doc(item.profile.id).get();
      item.profile = profileSnapshot.data();
      return item;
    }));

    return result;
  }
}
