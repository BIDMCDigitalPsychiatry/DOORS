import * as React from 'react';
import { useTableFilter } from '../helpers';
import useTable from '../../../../database/useTable';
import { tables } from '../../../../database/dbConfig';
import { isExpired } from '../../../../database/useInstructor';

export const useInstructors = ({ table = undefined, tab = undefined, requestParams = undefined }) => {
  const { state, handleRequest } = useTable({ TableName: tables.instructors });
  const { data, loading, success } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest(requestParams);
    // eslint-disable-next-line
  }, [JSON.stringify(requestParams), handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh, table, tab]);

  const instructors = Object.keys(data).map(k => ({
    ...data[k],
    Invite: data[k].accepted ? 'Accepted' : isExpired(data[k]) ? 'Expired' : 'Pending'
  }));

  return {
    data: useTableFilter(
      instructors.map(i => ({
        ...i,
        getValues: () => i
      })),
      table
    ),
    handleRefresh,
    loading,
    success
  };
};
