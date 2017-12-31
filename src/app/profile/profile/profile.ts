export interface Profile {
  /**
   * ID of the document in profiles collection
   */
  id: string;

  /**
   * Name of the profile
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
}
