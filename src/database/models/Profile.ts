export default interface Profile {
  id: string; // unique identifier
  userId: string; // id of user
  type: string; // User's profile type
  picture: string; // profile picture
  name: string; // full name of user
  vinfenServices: string; //yes no
  clinicianAffiliation: string;
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}
