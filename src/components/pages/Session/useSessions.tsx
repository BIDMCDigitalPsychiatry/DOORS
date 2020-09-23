import * as React from 'react';
import useTable from '../../../database/useTable';
import { tables } from '../../../database/dbConfig';
import { useTableFilter } from '../../application/GenericTable/helpers';

export default function useSessions({ table = undefined, tab = undefined, requestParams = undefined }) {
  const { state, handleRequest } = useTable({ TableName: tables.sessions });
  const { data, loading, success } = state as any;

  const handleRefresh = React.useCallback(() => {
    handleRequest(requestParams);
    // eslint-disable-next-line
  }, [JSON.stringify(requestParams), handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh, table, tab]);

  const rows = Object.keys(data).map((k, i) => ({ ...data[k], title: `Session ${i + 1}` }));

  return {
    data: useTableFilter(
      rows.map(i => ({ ...i })),
      table
    ),
    handleRefresh,
    loading,
    success
  };
}
