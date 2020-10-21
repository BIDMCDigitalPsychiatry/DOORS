import { tables } from '../../../../database/dbConfig';
import { useTableData } from '../../../../database/useTableData';
import { useUserId } from '../../../layout/hooks';

export default function useInstructorsByUserId() {
  const userId = useUserId();
  const { data = [], loading, success, handleRefresh } = useTableData({
    loadOnMount: false,
    TableName: tables.instructors,
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
  return {
    loading,
    instructors: completed ? data : undefined,
    handleRefresh
  };
}
