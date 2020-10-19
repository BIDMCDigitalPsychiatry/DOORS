import { SurveyQuestionItem } from '../../components/general/SurveyQuestions';
import { BlockListItem } from './../../components/general/BlockList';

export const defaultAgeRankingModels = [
  {
    id: 'Under 21'
  },
  {
    id: '21-24'
  },
  {
    id: '25-34'
  },
  {
    id: '35-44'
  },
  {
    id: '45-54'
  },
  {
    id: '56-64'
  },
  {
    id: '65 or older'
  }
];

export const defaultRankingModels: BlockListItem[] = [
  {
    id: '0',
    rankingValue: 1,
    name: 'I cannot do it on my own'
  },
  {
    id: '1',
    rankingValue: 2,
    name: 'I can do it on my own, but with step by step directions'
  },
  {
    id: '2',
    rankingValue: 3,
    name: 'I can do it mostly on my own, but may have a few questions'
  },
  {
    id: '3',
    rankingValue: 4,
    name: 'I can do it on my own with ease'
  },
  {
    id: '4',
    rankingValue: 5,
    name: 'I can do it and can teach someone else'
  }
].map(i => ({ ...i, canEdit: false, canDelete: false }));

export interface ClassData {
  userId?: string; // user id of the admin or instructor user which created the class
  parentClassId?: string; // id of parent class if created from existing class
  parentUserId?: string; // id of parent user, for query simplicity
  headline?: string;
  name?: string;
  image?: string;
  ageQuestion?: any;
  keySkills?: BlockListItem[];
  rankingModel?: BlockListItem[];
  surveyQuestions?: SurveyQuestionItem[];
  classPresentations?: any[];
  classResources?: any[];
  created?: number;
  updated?: number;
  deleted?: boolean;
}

export default interface Class extends ClassData {
  id?: string; // unique class id
}
