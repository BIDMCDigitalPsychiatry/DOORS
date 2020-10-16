import { useLayoutKey } from '../components/layout/hooks';
import useData from './useData';

export const useClassData = ({ Model, active = true}) => {
  const data = useLayoutKey('class');
  return useData({ id: data?.id, Model, initialState: { data }, active });
};
