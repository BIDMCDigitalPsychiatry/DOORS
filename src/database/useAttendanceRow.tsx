import { tables } from './dbConfig';
import useData from './useData';

export const useAttendanceRow = ({ id, active }) => {
  // The student table uses the concatenated key, while the instructor and admin tables use the main key
  // Format of id = id:sessionId
  return useData({ id, Model: tables.attendance, active });
};
