import * as React from 'react';
import { tables } from './dbConfig';
import useTable from './useTable';

export const useGroups = ({ active = true, requestParams = undefined } = {}) => {
  const { state, handleRequest } = useTable({ TableName: tables.groups });
  const { data, loading, success } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest(requestParams);
    // eslint-disable-next-line
  }, [JSON.stringify(requestParams), handleRequest]);

  React.useEffect(() => {
    active && handleRefresh();
  }, [active, handleRefresh]);

  const rows = Object.keys(data).map(k => ({ ...data[k] }));

  return {
    data: rows,
    handleRefresh,
    loading,
    success
  };
};
