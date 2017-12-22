import * as firebase from 'firebase';

import { environment } from '../environments/environment';

import 'firebase/firestore';

firebase.initializeApp(environment.firebaseConfig);

const firestore = firebase.firestore();

export class ListsController {
  async getList(name: string): Promise<any> {
    const snapshot = await firestore.collection('lists').doc(name).get();
    if (!snapshot.exists) {
      return {};
    }
    return snapshot.data();
  }
}
