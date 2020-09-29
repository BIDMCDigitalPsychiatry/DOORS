import * as React from 'react';
import { useTableFilter } from '../components/application/GenericTable/helpers';
import { tables } from './dbConfig';
import useTable from './useTable';

export const useGroups = ({ table = undefined, tab = undefined, requestParams = undefined } = {}) => {
  const { state, handleRequest } = useTable({ TableName: tables.groups });
  const { data, loading, success } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest(requestParams);
    // eslint-disable-next-line
  }, [JSON.stringify(requestParams), handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh, table, tab]);

  const rows = Object.keys(data).map(k => ({ ...data[k] }));

  return {
    data: useTableFilter(
      rows.map(i => ({
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
