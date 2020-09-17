export default interface Instructor {
  id: string; // unique identifier
  _rev?: string;
  parentId?: string; // user id of inviting user
  email?: string; // email of user that invite corresponds to
  title?: string;
  institution?: string;
  userId?: string; // id of user who accepts the invite, if empty, the invite hasn't been accepted
  created?: number;
  updated?: number;
  deleted?: boolean; // If set to true item has been deleted, keep in database
}
