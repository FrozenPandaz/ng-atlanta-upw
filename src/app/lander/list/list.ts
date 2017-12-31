import { Profile } from '../../profile/profile/profile';


export interface List {
  name: string;
  description: string;
  id: string;
  members: { profile: Profile }[];
}
