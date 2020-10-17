import { tables } from '../../../database/dbConfig';
import { useUserId } from '../../layout/hooks';
import useClasses from './useClasses';

export default function useInstructorClasses({ userId: UserId = undefined } = {}) {
  const userId = useUserId({ userId: UserId }); // Use current userId unless UserId is set

  return useClasses({
    Model: tables.classesInstructor,
    requestParams: {
      FilterExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }
  });
}
