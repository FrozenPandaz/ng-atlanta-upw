import * as firebase from 'firebase';

export class ListsController {

  constructor(private firestore: firebase.firestore.Firestore) {}

  async getList(name: string): Promise<any> {
    const snapshot = await this.firestore.collection('lists').doc(name).get();
    if (!snapshot.exists) {
      return {};
    }
    return snapshot.data();
  }
}
