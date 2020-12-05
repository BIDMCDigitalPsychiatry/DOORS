import { useGroups } from '../database/useGroups';
import { isEmpty } from '../helpers';
import { useLayout } from '../components/layout/hooks';

export default function useInstructorGroups() {
  const [{ instructor }] = useLayout();
  var active = instructor && !isEmpty(instructor?.userId) ? true : false;

  return useGroups({
    active,
    requestParams: instructor && {
      // If instructor mode, then filter groups by instructor's userId
      FilterExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': instructor?.userId
      }
    }
  });
}
