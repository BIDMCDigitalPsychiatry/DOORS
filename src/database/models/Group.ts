export default interface Group {
  id: string; // unique identifier  
  userId: string; // id of user who created this group
  sessionId: string; // id of session that group is linked to - depending on implementation this may be removed
  name: string; // Name of group, such as 0001
  location: string;
  type: string;
  participants: string;
  created?: number;
  updated?: number;
  deleted?: boolean;
}
