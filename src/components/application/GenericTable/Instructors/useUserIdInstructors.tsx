import { useUserId } from '../../../layout/hooks';
import { useInstructors } from './useInstructors';

export const useUserIdInstructors = () => {
  const userId = useUserId();
  const { data, loading, success } = useInstructors({
    requestParams: {
      FilterExpression: '#userId = :userId AND #accepted = :accepted AND (#deleted = :deleted OR attribute_not_exists(#deleted))',
      ExpressionAttributeNames: {
        '#userId': 'userId',
        '#accepted': 'accepted',
        '#deleted': 'deleted'
      },
      ExpressionAttributeValues: {
        ':userId': userId,
        ':accepted': true,
        ':deleted': false
      }
    }
  });

  const completed = loading === false && success === true;
  return completed ? data : undefined;
};
