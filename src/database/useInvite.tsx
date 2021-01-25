import { tables } from './dbConfig';
import { useTableData } from './useTableData';

export default function useInvite({ loadOnMount = true, userId = undefined, Model = tables.students } = {}) {
  const { data, loading, success, handleRefresh } = useTableData({
    loadOnMount,
    TableName: Model,
    requestParams: {
      FilterExpression: '(#userId = :userId AND #accepted = :accepted) AND (#deleted = :deleted OR attribute_not_exists(#deleted))',
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
    invite: completed ? data[0] : undefined,
    loading,
    handleRefresh
  };
}
