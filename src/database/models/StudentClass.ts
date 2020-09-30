import Class from './Class';

export interface StudentClass extends Class {
  studentId?: string; // user id of the admin user which created the class
}
