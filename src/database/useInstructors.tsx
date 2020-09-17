import { tables } from './dbConfig';
import { useTableState } from './useTableState';

export const useInstructors = () => useTableState(tables.instructors);
