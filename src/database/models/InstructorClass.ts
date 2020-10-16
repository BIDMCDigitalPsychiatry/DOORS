import { ClassData } from './Class';

export default interface InstructorClass extends ClassData {
  id?: string; // unique identifier of instructor class
  classId?: string; // link to original class
  instructorId?: string;
}
