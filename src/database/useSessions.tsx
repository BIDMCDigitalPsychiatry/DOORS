import * as React from 'react';
import useTable from './useTable';
import { tables } from './dbConfig';
import { useChangeRouteLayout } from '../components/layout/hooks';
import useProcessDataState from '../components/hooks/useProcessDataState';
import { uuid } from '../helpers';

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

export const useSessionsByStudentId = ({ studentId }) => {
  return useSessions({
    requestParams: {
      FilterExpression: '#studentId = :studentId',
      ExpressionAttributeNames: {
        '#studentId': 'studentId'
      },
      ExpressionAttributeValues: {
        ':studentId': studentId
      }
    }
  });
};

export const useHandleCreateSession = ({ studentId, studentUserId, nextRoute = '/Pre-Survey' }) => {
  const changeRouteLayout = useChangeRouteLayout();

  const { handleUpdate } = useProcessDataState({ Model: tables.sessions });

  return React.useCallback(
    c => () => {
      const session = {
        ...c, // Copy class data
        id: uuid(), // Create new session id
        classId: c.id, // Link the class id
        studentId,
        studentUserId
      };
      handleUpdate({
        Data: session,
        onSuccess: () => {
          changeRouteLayout(nextRoute, { session });
        }
      }); // insert into database and change route on success
    },
    [studentId, studentUserId, handleUpdate, changeRouteLayout, nextRoute]
  );
};
