import { useUserId } from '../components/layout/hooks';
import { tables } from './dbConfig';
import { useTableData } from './useTableData';

export default function useStudentsByUserId({ userId: UserId = undefined, loadOnMount = false } = {}) {
  const userId = useUserId();

  const { data, loading, success, handleRefresh } = useTableData({
    loadOnMount,
    TableName: tables.students,
    requestParams: {
      FilterExpression: '#userId = :userId AND #accepted = :accepted AND (#deleted = :deleted OR attribute_not_exists(#deleted))',
      ExpressionAttributeNames: {
        '#userId': 'userId',
        '#accepted': 'accepted',
        '#deleted': 'deleted'
      },
      ExpressionAttributeValues: {
        ':userId': UserId ? UserId : userId,
        ':accepted': true,
        ':deleted': false
      }
    }
  });

  const completed = loading === false && success === true;
  return {
    loading,
    students: completed ? data : undefined,
    handleRefresh
  };
}
