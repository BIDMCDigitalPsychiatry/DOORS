export default interface Group {
  id: string; // unique identifier
  instructorId: string; // id of instructor who owns this group
  userId: string; // id of user who created this group, usually the instructor, but can be an admin  
  name: string; // Name of group, such as 0001
  location: string;
  type: string;
  participants: string;
  created?: number;
  updated?: number;
  deleted?: boolean;
}

