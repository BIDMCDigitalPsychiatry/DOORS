export default interface Profile {
  id: string; // unique identifier (userId in cognito)
  email: string; // email of user, synced with cognito
  type: string; // User's profile type
  picture: string; // profile picture
  phone: string; // user's phone number
  name: string; // full name of user
  vinfenServices: string; //yes no
  clinicianAffiliation: string;
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}
