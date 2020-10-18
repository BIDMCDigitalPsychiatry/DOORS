import { useLayoutKey } from '../components/layout/hooks';
import { tables } from './dbConfig';
import useData from './useData';

export const useClassData = ({ active = true } = {}) => {
  const data = useLayoutKey('class');
  return useData({ id: data?.id, Model: tables.classes, initialState: { data }, active });
};
