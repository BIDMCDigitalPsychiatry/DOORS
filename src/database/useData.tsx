import * as React from 'react';
import { evalFunc, isEmpty } from '../helpers';
import { tables } from './dbConfig';
import useProcessData from './useProcessData';

export default function useData({ id, active = true, Model = tables.classes, initialState = undefined }) {
  const processData = useProcessData();
  const [state, setState] = React.useState({ loading: false, error: undefined, response: undefined, data: undefined, ...initialState });
  const { data = {}, index, loading, error } = state;
  const data_str = JSON.stringify(data);

  const setData = React.useCallback(data => setState(prev => ({ ...prev, data: evalFunc(data, prev?.data) })), [setState]);

  const handleChange = React.useCallback(
    key => ({ target }) => {
      const { value } = target;
      setData(prev => ({ ...prev, [`${key}`]: value }));
    },
    [setData]
  );

  const handleRefresh = React.useCallback(() => {
    if (!isEmpty(id)) {
      setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
      processData({
        Model,
        Action: 'r',
        Data: { id },
        onError: response => setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response, data: undefined })),
        onSuccess: response => setState(prev => ({ ...prev, loading: false, error: undefined, response, data: response?.Item }))
      });
    }
  }, [id, Model, processData, setState]);

  React.useEffect(() => {
    active === true && handleRefresh();
  }, [id, active, handleRefresh]);

  // Save the newValues data to the back-end
  const updateData = React.useCallback(
    (newValues, OnSuccess = undefined, OnError = undefined) => {
      if (!isEmpty(id)) {
        setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
        processData({
          Model,
          Action: 'u',
          Data: { ...JSON.parse(data_str), id, ...newValues },
          onError: response => {
            setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response }));
            OnError && OnError(response);
          },
          onSuccess: response => {
            setState(prev => ({ ...prev, loading: false, error: undefined, response }));
            OnSuccess && OnSuccess(response);
          }
        });
      }
    },
    [id, Model, setState, processData, data_str]
  );

  // Save the values in state.data to the back-end
  const saveData = React.useCallback((OnSuccess = undefined, OnError = undefined) => updateData(JSON.parse(data_str), OnSuccess, OnError), [
    data_str,
    updateData
  ]);

  return { loading, index, error, data, setData, handleChange, saveData, updateData };
};
