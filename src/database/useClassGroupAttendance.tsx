import { useAttendance } from '../database/useAttendance';
import { isEmpty } from '../helpers';

export const title = 'Mark Attendance';

export default function useClassGroupAttendance({ classId, groupId, date = undefined, active = true }) {
  return useAttendance({
    active: active && !isEmpty(classId) && !isEmpty(groupId),
    requestParams:
      date === undefined
        ? {
            FilterExpression: '#classId = :classId AND #groupId = :groupId',
            ExpressionAttributeNames: {
              '#classId': 'classId',
              '#groupId': 'groupId'
            },
            ExpressionAttributeValues: {
              ':classId': classId,
              ':groupId': groupId
            }
          }
        : {
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
