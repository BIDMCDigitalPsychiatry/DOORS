import { useLayoutKey } from '../components/layout/hooks';
import { getId } from '../helpers';
import { tables } from './dbConfig';
import useData from './useData';

export const useClassData = ({ Model }) => {
  const data = useLayoutKey('class');
  // The student table uses the concatenated key, while the instructor and admin tables use the main key
  // Format of id = id:sessionId
  const id = Model === tables.classesStudent ? data?.id : getId(data?.id);
  return useData({ id, Model, initialState: { data } });
};
