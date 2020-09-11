export default interface User {
  _id: string; // unique identifier
  _rev: string;
  email: string;
  name: string;  
}

export default interface InstructorInvite {
  _id: string; // unique identifier
  _rev: string;
  parentId: string; // user id of inviting user
  email: string; // email of user that invite corresponds to
  linkId: string; // id of user who accepts the invite
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}

export default interface StudentInvite {
  _id: string; // unique identifier
  _rev: string;
  parentId: string; // user id of inviting user
  email: string; // email of user that invite corresponds to
  linkId: string; // id of user who accepts the invite
  created: number;
  updated: number;
  deleted: boolean; // If set to true item has been deleted, keep in database
}
