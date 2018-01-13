import * as firebase from 'firebase/app';
import { ListData, MemberData, Power, Profile } from '../../app/profile/profile/profile';

export class ProfilesController {

  constructor(private firestore: firebase.firestore.Firestore) {}

  async getProfile(profileSlug: string): Promise<any> {
    console.time('get profile info');
    const profileDoc = this.firestore.collection('profiles').doc(profileSlug);
    const snapshot = await profileDoc.get();
    if (!snapshot.exists) {
      return {};
    }
    console.timeEnd('get profile info');
    console.time('get extra info');
    const profile: Profile = snapshot.data() as Profile;
    [profile.powers, profile.lists] = await Promise.all([
      this.getPowers(profileDoc),
      this.getLists(profileDoc)
    ]);
    console.timeEnd('get extra info');

    return profile;
  }

  private async getLists(profileDoc: firebase.firestore.DocumentReference): Promise<ListData[]> {
    const listsDoc = profileDoc.collection('lists');
    const lists = await listsDoc.get();
    if (lists.empty) {
      return [];
    }

    return Promise.all(
      lists.docs.map(async doc => {
        const listRef: firebase.firestore.DocumentReference = doc.data().list;
        return this.getListInfo(profileDoc.id, listRef);
      })
    );
  }

  private async getListInfo (
    profileSlug: string,
    listRef: firebase.firestore.DocumentReference,
    getMembers: boolean = true
  ): Promise<ListData> {
    console.time('get list info');
    const listSnapshot = await listRef.get();

    const result = listSnapshot.data() as ListData;
    console.time('get member from list');
    const memberSnapshot = await listRef.collection('members')
      .doc(profileSlug)
      .get();
    const memberData = memberSnapshot.data() as MemberData;

    delete (memberData as any).profile;
    console.timeEnd('get member from list');

    console.time('get next and prev');
    const relatedMembersSnapshot = await listRef.collection('members')
      .where('rank', '>=', memberData.rank - 1)
      .limit(3)
      .get();

    const relatedMembers = relatedMembersSnapshot.docs
      .map(memberDoc => memberDoc.data());

    [memberData.previous, memberData.next] = await Promise.all([
      this.getMember(memberData.rank, 'previous', relatedMembers),
      this.getMember(memberData.rank, 'next', relatedMembers),
    ]);
    console.timeEnd('get next and prev');

    result.memberData = memberData;
    console.timeEnd('get list info');
    return result;
  }

  private async getMember(rank: number, relation: 'next' | 'previous', relatedMembers: any[]): Promise<Profile> {
    const offset = relation === 'next' ? 1 : -1;
    const member = relatedMembers.find(relatedMember => relatedMember.rank === rank + offset);
    if (member) {
      const memberSnapshot = await member.profile.get();
      return memberSnapshot.data();
    } else {
      return null;
    }
  }

  private async getPowers(profileDoc: firebase.firestore.DocumentReference): Promise<Power[]> {
    console.log('getting powers');
    console.time('get powers');
    const powersDoc = profileDoc.collection('powers');
    const powers = await powersDoc.get();
    if (!powers.empty) {
      console.timeEnd('get powers');
      return powers.docs.map(doc => doc.data() as Power);
    }
  }
}
