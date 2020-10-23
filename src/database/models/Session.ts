import Class, { ClassData } from './Class';

export default interface Session extends ClassData {
  id: string; // unique id of session
  studentId: string; // links to the student/associated group
  studentUserId: string; // userId of the student associated with the session
  classId: string; // link to the parent class
  currentRoute: string; // stores the last route for tracking and restoring progress state
  viewedPresentations: string[]; // stores the ids of all presentations that have been viewed
  completed?: boolean;
}
