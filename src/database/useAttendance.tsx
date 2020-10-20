import * as React from 'react';
import { tables } from './dbConfig';
import useTable from './useTable';

export const useAttendance = ({ requestParams = undefined } = {}) => {
  const { state, handleRequest } = useTable({ TableName: tables.attendance });
  const { data, loading, success } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest(requestParams);
    // eslint-disable-next-line
  }, [JSON.stringify(requestParams), handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const rows = Object.keys(data).map(k => ({ ...data[k] }));

  return {
    data: rows,
    handleRefresh,
    loading,
    success
  };
};
