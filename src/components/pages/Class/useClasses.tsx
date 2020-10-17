import * as React from 'react';
import useTable from '../../../database/useTable';
import { tables } from '../../../database/dbConfig';
import { useTableFilter } from '../../application/GenericTable/helpers';

export default function useClasses({ Model = tables.classesAdmin, table = undefined, tab = undefined, requestParams = undefined } = {}) {
  const { state, handleRequest } = useTable({ TableName: Model });
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
      rows.map(i => ({ ...i })),
      table
    ),
    handleRefresh,
    loading,
    success
  };
}
