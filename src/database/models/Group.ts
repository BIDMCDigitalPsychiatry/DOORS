export default interface Group {
  id: string; // unique identifier
  sessionId: string;
  name: string; // Name of group, such as 0001
  location: string;
  type: string;
  participants: string;
  created?: number;
  updated?: number;
  deleted?: boolean;
}
