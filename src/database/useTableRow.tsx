import * as React from 'react';
import { tables } from './dbConfig';
import { isEmpty, minutesFrom } from '../helpers';
import useProcessData from './useProcessData';
import { inviteExpiration } from '../../package.json';

export const isExpired = item => minutesFrom(item?.created) > inviteExpiration;

export default function useTableRow({
  Model = tables.instructors,
  id: Id = undefined,
  state: externalState = undefined,
  setState: setExternalState = undefined
}) {
  const [internalState, setInternalState] = React.useState();
  const state = externalState ? externalState : internalState;
  const setState = setExternalState ? setExternalState : setInternalState;
  const { open } = state ?? { open: undefined };
  const processData = useProcessData();
  const row = state?.response?.Item;
  const row_str = JSON.stringify(row) ?? '{}'; // Default to empty object string if undefined

  const handleRefresh = React.useCallback(
    ({ onSuccess } = {}) => {
      if (!isEmpty(Id)) {
        setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
        processData({
          Model,
          Action: 'r',
          Data: { id: Id },
          onError: response => setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response })),
          onSuccess: response => {
            setState(prev => ({ ...prev, loading: false, error: undefined, response }));
            onSuccess && onSuccess(response);
          }
        });
      }
    },
    [Id, Model, processData, setState]
  );

  React.useEffect(() => {
    if (open !== undefined) {
      open && handleRefresh(); // For use with dialogs, so we only request data on open
    } else {
      handleRefresh();
    }
  }, [handleRefresh, open]);

  const setRow = React.useCallback(
    ({ id: _Id = undefined, values, prev = undefined, onSuccess = undefined, onError = undefined }) => {
      // If an id is provided via the function call, use that over Id
      const id = _Id ? _Id : Id;
      if (!isEmpty(id)) {
        const prevValues = prev === undefined ? JSON.parse(row_str) : prev; // If user provides previous value, use that, otherwise use the values stored in local state
        setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
        processData({
          Model,
          Action: 'u',
          Data: { ...prevValues, id, ...values },
          onError: response => {
            setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response }));
            onError && onError(response);
          },
          onSuccess: response => {
            setState(prev => ({ ...prev, loading: false, error: undefined, response }));
            onSuccess && onSuccess(response);
          }
        });
      }
    },
    [Id, Model, setState, processData, row_str]
  );

  // Reads the row from the database first, and then merges the new values into the existing data before saving back to the database
  const readSetRow = React.useCallback(
    ({ values, ...other }) => {
      handleRefresh({ onSuccess: response => setRow({ values, prev: response?.Item, ...other }) });
    },
    [setRow, handleRefresh]
  );

  const expired = isExpired(row);

  return { row, setRow, readSetRow, expired, handleRefresh };
}
