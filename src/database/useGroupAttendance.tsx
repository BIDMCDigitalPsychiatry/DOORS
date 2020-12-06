import { useAttendance } from './useAttendance';
import { isEmpty } from '../helpers';

export default function useGroupAttendance({ groupId, active = true }) {
  return useAttendance({
    active: active && !isEmpty(groupId),
    requestParams: {
      FilterExpression: '#groupId = :groupId',
      ExpressionAttributeNames: {
        '#groupId': 'groupId'
      },
      ExpressionAttributeValues: {
        ':groupId': groupId
      }
    }
  });
}
