import { useUserId } from '../components/layout/hooks';
import { tables } from './dbConfig';
import { useTableData } from './useTableData';

export default function useStudentsByUserId() {
  const userId = useUserId();

  const { data, loading, success, handleRefresh } = useTableData({
    loadOnMount: false,
    TableName: tables.students,
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
    students: completed ? data : undefined,
    handleRefresh
  };
}
