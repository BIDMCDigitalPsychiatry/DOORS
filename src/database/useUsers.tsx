import { tables } from './dbConfig';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export const useUser = id => useSelector((state: AppState) => (state.database[tables.users] ?? {})[id]);
