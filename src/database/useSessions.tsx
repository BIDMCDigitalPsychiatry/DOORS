import * as React from 'react';
import useTable from './useTable';
import { tables } from './dbConfig';

export default function useSessions({ requestParams = undefined } = {}) {
  const { state, handleRequest } = useTable({ TableName: tables.sessions });
  const { data, loading, success } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest(requestParams);
    // eslint-disable-next-line
  }, [JSON.stringify(requestParams), handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return {
    sessions: Object.keys(data).map(k => ({ ...data[k] })),
    handleRefresh,
    loading,
    success
  };
}

export const useSessionsByGroupId = ({ groupId }) => {
  return useSessions({
    requestParams: {
      requestParams: {
        FilterExpression: '#groupId = :groupId',
        ExpressionAttributeNames: {
          '#groupId': 'groupId'
        },
        ExpressionAttributeValues: {
          ':groupId': groupId
        }
      }
    }
  });
};
