import { useLocation } from 'react-router';
import useData from './useData';

export const useLocationData = ({ Model }) => {
  const { state = {} }: any = useLocation();
  const { id } = state;
  return useData({ id, Model, initialState: { data: state } });
};
