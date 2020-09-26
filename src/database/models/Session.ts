import { BlockListItem } from './../../components/general/BlockList';

export const defaultRankingModels: BlockListItem[] = [
  {
    id: '0',
    name: 'I cannot do it on my own'
  },
  {
    id: '1',
    name: 'I can do it on my own, but with step by step directions'
  },
  {
    id: '2',
    name: 'I can do it mostly on my own, but may have a few questions'
  },
  {
    id: '3',
    name: 'I can do it on my own with ease'
  },
  {
    id: '4',
    name: 'I can do it and can teach someone else'
  }
].map(i => ({ ...i, canEdit: false, canLock: false, canDelete: false }));

export default interface Session {
  id: string; // unique identifier
  adminId?: string; // user id of the admin user which created the session
  headline?: string;
  name?: string;
  image?: string;
  keySkills?: BlockListItem[];
  rankingModel?: BlockListItem[];
  surveyQuestions?: BlockListItem[]; // TBD survey question objects
  classPresentation?: any; // TBD file meta data
  classResources?: any[]; // TBD classResource objects
  created?: number;
  updated?: number;
  deleted?: boolean;
}
