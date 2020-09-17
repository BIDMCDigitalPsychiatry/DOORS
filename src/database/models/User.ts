export default interface User {
  id: string; // unique identifier
  _rev: string;
  email: string;
  name: string;
}

export default interface Instructor {
  id: string; // unique identifier
  _rev: string;
  parentId: string; // user id of inviting user
  email: string; // email of user that invite corresponds to
  userId: string; // id of user who accepts the invite
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}

export default interface Student {
  id: string; // unique identifier
  _rev: string;
  parentId: string; // user id of inviting user
  email: string; // email of user that invite corresponds to
  userId: string; // id of user who accepts the invite
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}
