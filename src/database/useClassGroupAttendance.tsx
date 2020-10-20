import { useAttendance } from '../database/useAttendance';

export const title = 'Mark Attendance';

export default function useClassGroupAttendance({ classId, groupId, date }) {
  return useAttendance({
    requestParams: {
      FilterExpression: '#classId = :classId AND #groupId = :groupId AND #date = :date',
      ExpressionAttributeNames: {
        '#classId': 'classId',
        '#groupId': 'groupId',
        '#date': 'date'
      },
      ExpressionAttributeValues: {
        ':classId': classId,
        ':groupId': groupId,
        ':date': date
      }
    }
  });
}
