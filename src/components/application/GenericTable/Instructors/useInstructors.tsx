import * as React from 'react';
import { useTableFilter } from '../helpers';
import useTable from '../../../../database/useTable';
import { tables } from '../../../../database/dbConfig';
import { isExpired } from '../../../../database/useInstructor';

export const useInstructors = (table, tab) => {
  const { state, handleRequest } = useTable({ TableName: tables.instructors });
  const { data, loading } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest();
  }, [handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh, table, tab]);

  const instructors = Object.keys(data).map(k => ({
    id: data[k].id,
    Name: data[k].email,
    Title: data[k].title ?? 'Unknown',
    Institution: data[k].institution ?? 'Unknown',
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
    loading
  };
};
