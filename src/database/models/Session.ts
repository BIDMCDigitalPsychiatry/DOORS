export default interface Session {
  id: string; // unique identifier
  classId: string;
  created?: number;
  updated?: number;
  deleted?: boolean;
}
