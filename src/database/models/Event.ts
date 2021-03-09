export interface Event {
  id: string;
  parentId: string; // Parent id, if event was created from a bulk create event action
  allDay: boolean;
  color?: string;
  description: string;
  link?: string;
  end: Date;
  start: Date;
  title: string;
  userId?: string; // user id of the admin or instructor user which created the class
  frequency?: string; // Used for creation of bulk events
  frequencyEnd?: string; // Used for creation of bulk events
  created?: number;
  updated?: number;
  deleted?: boolean;
}
