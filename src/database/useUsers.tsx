import { tables } from './dbConfig';
import { useTableState } from './useTableState';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export const useUsers = () => useTableState(tables.users);
export const useUser = id => useSelector((state: AppState) => (state.database[tables.users] ?? {})[id]);
