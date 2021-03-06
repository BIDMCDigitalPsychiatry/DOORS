import * as React from 'react';
import { evalFunc, isEmpty } from '../helpers';
import { tables } from './dbConfig';
import useProcessData from './useProcessData';

const defaultState = { loading: false, error: undefined, response: undefined, data: undefined };

export default function useData({ id, active = true, Model = tables.classes, initialState = undefined }) {
  const processData = useProcessData();
  const [state, setState] = React.useState({ ...defaultState, ...initialState });
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
    setState({ ...defaultState, ...initialState });
    active === true && handleRefresh();
    // eslint-disable-next-line
  }, [id, active, handleRefresh, setState, JSON.stringify(initialState)]);

  // Save the newValues data to the back-end
  const updateData = React.useCallback(
    (newValues, OnSuccess = undefined, OnError = undefined) => {
      if (!isEmpty(id)) {
        setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
        const Data = { ...JSON.parse(data_str), id, ...newValues };
        processData({
          Model,
          Action: 'u',
          Data,
          onError: response => {
            console.error('Error updating data');
            setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response }));
            OnError && OnError(response);
          },
          onSuccess: response => {
            console.log('Successfully updated data');
            setState(prev => ({ ...prev, loading: false, error: undefined, response, data: Data }));
            OnSuccess && OnSuccess(response);
          }
        });
      } else {
        console.error('Error: No id provided to the updateData function');
      }
    },
    [id, Model, setState, processData, data_str]
  );

  // Save the values in state.data to the back-end
  const saveData = React.useCallback(({ onSuccess = undefined, onError = undefined }) => updateData(JSON.parse(data_str), onSuccess, onError), [
    data_str,
    updateData
  ]);

  const handleSaveData = React.useCallback(props => () => saveData(props), [saveData]);

  return { loading, index, error, data, setData, handleChange, saveData, handleSaveData, updateData };
}
