import * as firebase from 'firebase/app';
import { Membership } from '../../app/edit/edit-lander/edit-lander.component';
import { ListData, MemberData, Power, Profile } from '../../app/profile/profile/profile';

export class ProfilesController {

  constructor(private firestore: firebase.firestore.Firestore) {}

  async getProfile(profileSlug: string): Promise<any> {
    const profileDoc = this.firestore.collection('profiles').doc(profileSlug);
    const snapshot = await profileDoc.get();
    const profile = snapshot.data();
    if (!snapshot.exists) {
      return {};
    }
    [profile.powers, profile.lists] = await Promise.all([
      this.getPowers(profileDoc),
      this.getLists(profileDoc)
    ]);

    return profile;
  }

  private async getLists(profileDoc: firebase.firestore.DocumentReference): Promise<ListData[]> {
    const membershipsSnapshot = await this.firestore.collection('memberships')
      .where('profileId', '==', profileDoc.id)
      .get();

    if (membershipsSnapshot.empty) {
      return [];
    }

    return Promise.all(
      membershipsSnapshot.docs.map(async doc => {
        const membership: Membership = doc.data() as Membership;
        const listSnapshot = await membership.list.get();
        const listData = listSnapshot.data() as ListData;
        const memberData: MemberData = {
          rank: membership.rank
        };
        [memberData.previous, memberData.next] = await Promise.all([
          this.getMember(membership, 'prev'),
          this.getMember(membership, 'next')
        ]);
        listData.memberData = memberData;
        return listData;
      })
    );
  }

  private async getMember(membership: Membership, relation: 'prev' | 'next'): Promise<Profile> {
    const memberRef = membership[relation];
    if (memberRef) {
      const memberSnapshot = await memberRef.get();
      const member = memberSnapshot.data() as Membership;
      const memberSnap = await member.profile.get();
      return memberSnap.data() as Profile;
    } else {
      return null;
    }
  }

  private async getPowers(profileDoc: firebase.firestore.DocumentReference): Promise<Power[]> {
    const powersDoc = profileDoc.collection('powers');
    const powers = await powersDoc.get();
    if (!powers.empty) {
      return powers.docs.map(doc => doc.data() as Power);
    }
  }
}
