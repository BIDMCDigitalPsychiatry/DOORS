export default interface Student {
  id: string; // unique identifier
  sessionId?: string; // Session that the user is invited to
  groupId: string; // Group that the user is invited to
  classId?: string; // Group that the user is invited to
  parentId: string; // user id of inviting user
  email: string; // email of user that invite corresponds to
  userId?: string; // id of user who accepts the invite, if empty, then the invite hasn't been accepted
  lessonCompleted?: boolean; // TBD indicates if the lesson step is complete
  preSurvey?: any; //TBD pre survey object
  postSurvey?: any; //TBD post survey object
  created?: number;
  updated?: number;
  deleted?: boolean; // If set to true item has been deleted, keep in database
}
