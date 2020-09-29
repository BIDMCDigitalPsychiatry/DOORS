export default interface Attendance {
  id: string; // unique identifier
  groupId: string;  
  classId: string;
  students: string; // { student, present: true/false }
  created?: number;
  updated?: number;
  deleted?: boolean;
}
