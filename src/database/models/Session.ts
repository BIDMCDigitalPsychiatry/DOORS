import Class from './Class';

export default interface Session extends Class {
  classId: string; // link to the parent class
  currentRoute: string; // stores the last route for tracking and restoring progress state
}
