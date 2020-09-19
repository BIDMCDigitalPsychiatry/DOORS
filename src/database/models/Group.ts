export default interface Group {
  id: string; // unique identifier
  name: string; // Name of group, such as 0001
  created?: number;
  updated?: number;
  deleted?: boolean;
}
