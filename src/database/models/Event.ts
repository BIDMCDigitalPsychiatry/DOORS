export interface Event {
  id: string;
  allDay: boolean;
  color?: string;
  description: string;
  end: Date;
  start: Date;
  title: string;
  userId?: string; // user id of the admin or instructor user which created the class
  created?: number;
  updated?: number;
  deleted?: boolean;
}
