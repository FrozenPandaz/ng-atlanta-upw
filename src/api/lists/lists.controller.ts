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
    const memberships = await this.firestore.collection('memberships')
      .orderBy('rank')
      .where('listId', '==', name)
      .get();

    result.members = await Promise.all(memberships.docs.map(async membershipSnapshot => {
      const membership = membershipSnapshot.data();
      delete membership.list;
      delete membership.listId;
      delete membership.prev;
      delete membership.next;
      const profileSnapshot = await membership.profile.get();
      membership.profile = profileSnapshot.data();
      return membership;
    }));

    return result;
  }
}
