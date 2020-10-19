import Class, { ClassData } from './Class';

export default interface Session extends ClassData {
  id: string; // unique id of session
  studentId: string; // links to the student/associated group
  studentUserId: string; // userId of the student associated with the session
  groupId: string; // available via studentId linkage, but go ahead and duplicate for ease of access when pulling reports
  classId: string; // link to the parent class
  currentRoute: string; // stores the last route for tracking and restoring progress state
  completed?: boolean;
}
