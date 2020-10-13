import { getDayMonthYear } from '../../helpers';

export const createAttendanceKey = (classId = '', groupId = '', date = getDayMonthYear()) => [classId, groupId, date].join(':');

export const getAttendanceKeys = (key = '') => {
  const parts = key.split(':');
  return {
    classId: parts[0],
    groupId: parts[1],
    date: parts[2]
  };
};

export default interface Attendance {
  id: string; // unique identifier, format: classId:groupId:date
  students: string; // array of students that attended
  created?: number;
  updated?: number;
  deleted?: boolean;
}
