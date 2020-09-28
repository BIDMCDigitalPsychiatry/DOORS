import Session from './Session';

// The Class table links the instructor the othe specific instructors associated data
export default interface Class {
  id: string; // unique identifier
  instructorId: string; // associated instructor
  session: Session; // Instructor's associated session data, this data is secondary to the Admin's session data
  groupIds: string[]; // Groups that are associated with this class
  created?: number;
  deleted?: boolean;
  updated?: number;
}
