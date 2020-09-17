import * as React from 'react';
import { dynamo } from './dbConfig';

export default function useTable({ TableName }) {
  const [state, setState] = React.useState({ data: [], loading: false });

  const handleRequest = React.useCallback(() => {
    const getRows = async () => {
      let scanResults = [];
      let items;
      var params = {
        TableName,
        ExclusiveStartKey: undefined
      };
      do {
        items = await dynamo.scan(params).promise();
        items.Items.forEach(i => scanResults.push(i));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
      } while (typeof items.LastEvaluatedKey != 'undefined');
      setState(prev => ({
        ...prev,
        loading: false,
        data: scanResults.reduce((f, c: any) => {
          f[c.id] = c;
          return f;
        }, {})
      }));
    };
    setState(prev => ({ ...prev, data: [], loading: true }));
    getRows();
  }, [TableName, setState]);  

  return { state, setState, handleRequest };
}
