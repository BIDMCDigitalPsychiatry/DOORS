import { useAttendance } from '../database/useAttendance';
import { isEmpty } from '../helpers';

export const title = 'Mark Event Attendance';

export default function useEventGroupAttendance({ eventId, groupId, date = undefined, active = true }) {  
  return useAttendance({
    active: active && !isEmpty(eventId) && !isEmpty(groupId),
    requestParams: isEmpty(eventId)
      ? undefined
      : date === undefined
      ? {
          FilterExpression: '#eventId = :eventId AND #groupId = :groupId',
          ExpressionAttributeNames: {
            '#eventId': 'eventId',
            '#groupId': 'groupId'
          },
          ExpressionAttributeValues: {
            ':eventId': eventId,
            ':groupId': groupId
          }
        }
      : {
          FilterExpression: '#eventId = :eventId AND #groupId = :groupId AND #date = :date',
          ExpressionAttributeNames: {
            '#eventId': 'eventId',
            '#groupId': 'groupId',
            '#date': 'date'
          },
          ExpressionAttributeValues: {
            ':eventId': eventId,
            ':groupId': groupId,
            ':date': date
          }
        }
  });
}
