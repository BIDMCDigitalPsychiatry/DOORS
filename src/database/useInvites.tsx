import { tables } from './dbConfig';
import { isExpired } from './useInstructor';
import { useTableData } from './useTableData';

export default function useInvites({ email = undefined, Model = tables.students } = {}) {
  const { data, loading, success, handleRefresh } = useTableData({
    TableName: Model,
    requestParams: {
      FilterExpression:
        '#email = :email AND (#accepted = :accepted OR attribute_not_exists(#accepted)) AND (#deleted = :deleted OR attribute_not_exists(#deleted))',
      ExpressionAttributeNames: {
        '#email': 'email',
        '#accepted': 'accepted',
        '#deleted': 'deleted'
      },
      ExpressionAttributeValues: {
        ':email': email,
        ':accepted': false,
        ':deleted': false
      }
    }
  });

  const completed = loading === false && success === true;
  return {
    invites: completed ? data.filter(r => !isExpired(r)) : undefined,
    loading,
    handleRefresh
  };
}
