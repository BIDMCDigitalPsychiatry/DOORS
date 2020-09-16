import { tables } from './dbConfig';
import { useTableState } from './useTableState';
import { useSelector } from 'react-redux';
import { AppState } from '../store';

export const useInstructors = () => useTableState(tables.instructors);
export const useInstructor = id => useSelector((state: AppState) => (state.database[tables.instructors] ?? {})[id]);
