export default interface Class {
  id: string; // unique identifier
  instructorId; // associated instructor
  name: string; // name of class
  keySkills: string[];
  rankingModel: string[];
  surveyQuestions: any[]; // TBD survey question objects
  classPresentation: any; // TBD file meta data
  classResources: any[]; // TBD classResource objects
  created?: number;
  updated?: number;
  deleted?: boolean;
}
