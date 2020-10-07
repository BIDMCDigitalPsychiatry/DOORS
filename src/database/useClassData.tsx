import { useLayoutKey } from '../components/layout/hooks';
import useData from './useData';

export const useClassData = ({ Model }) => {
  const data = useLayoutKey('class');
  return useData({ id: data?.id, Model, initialState: { data } });
};
