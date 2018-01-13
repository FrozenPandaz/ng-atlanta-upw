import { List } from '../../lander/list/list';

export interface Power {
  /**
   * Name of the power
   */
  name: string;

  /**
   * Strength of the power
   */
  strength: number;
}

export interface ListData extends Partial<List> {
  memberData: MemberData;
}

export interface MemberData {
  next?: Profile;
  previous?: Profile;
  rank: number;
}

export interface Profile {
  /**
   * ID of the document in profiles collection
   */
  id: string;

  /**
   * First name of the profile
   */
  firstName: string;

  /**
   * Middle name of the profile
   */
  middleName: string;

  /**
   * Last name of the profile
   */
  lastName: string;

  /**
   * Format of the name
   */
  nameFormat: string;

  /**
   * Display Name of the profile
   */
  name: string;

  /**
   * Description of the profile
   */
  bio: string;

  /**
   * Url of image of the profile
   */
  image: string;

  /**
   * Powers of the profile
   */
  powers?: Power[];

  /**
   * Lists where this profile appears
   */
  lists?: ListData[];
}
