import * as React from 'react';
import { tables } from './dbConfig';
import { isEmpty, minutesFrom } from '../helpers';
import useProcessData from './useProcessData';
import { inviteExpiration } from '../../package.json';

export const isExpired = item => minutesFrom(item?.created) > inviteExpiration;

export const useTableRow = ({ Model = tables.instructors, id, state, setState }) => {
  const { open } = state ?? { open: undefined };
  const processData = useProcessData();
  const row = state?.response?.Item;
  const row_str = JSON.stringify(row) ?? '{}'; // Default to empty object string if undefined

  const handleRefresh = React.useCallback(() => {
    if (!isEmpty(id)) {
      setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
      processData({
        Model,
        Action: 'r',
        Data: { id },
        onError: response => setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response })),
        onSuccess: response => setState(prev => ({ ...prev, loading: false, error: undefined, response }))
      });
    }
  }, [id, Model, processData, setState]);

  React.useEffect(() => {
    if (open !== undefined) {
      open && handleRefresh(); // For use with dialogs, so we only request data on open
    } else {
      handleRefresh();
    }
  }, [handleRefresh, open]);

  const setRow = React.useCallback(
    (newValues, OnSuccess = undefined, OnError = undefined) => {
      if (!isEmpty(id)) {
        setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
        processData({
          Model,
          Action: 'u',
          Data: { ...JSON.parse(row_str), id, ...newValues },
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
    [id, Model, setState, processData, row_str]
  );

  const expired = isExpired(row);

  return { row, setRow, expired, handleRefresh };
};
