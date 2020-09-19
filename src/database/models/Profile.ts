export default interface Profile {
  id: string; // unique identifier
  userId: string; // id of user who accepts the invite
  picture: string; // profile picture
  name: string; // full name of user
  city: string;
  state: string;
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}
