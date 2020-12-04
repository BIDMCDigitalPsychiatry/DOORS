export default interface Attendance {
  id;
  groupId;
  classId;
  eventId: string; // leave blank if not linked ot a specific event
  dateString: string; // Day Month xth format
  date: string; // yyyymmdd format
  students: string; // array of students that attended
  created?: number;
  updated?: number;
  deleted?: boolean;
}
