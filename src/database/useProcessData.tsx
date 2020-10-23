import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from '../components/application/SnackBar/store';
import { dynamo } from './dbConfig';

export interface ProcessDataInfo {
  Model?: any;
  Data: any;
  Action?: 'c' | 'r' | 'u' | 'd';
  Snackbar?: boolean;
  onSuccess?: (response, data) => void;
  onError?: (response, data) => void;
}

export const useProcessData = () => {
  const dispatch = useDispatch();
  return React.useCallback((pdi: ProcessDataInfo) => dispatch(processData(pdi)), [dispatch]);
};

export const useProcessDataHandle = () => {
  const dispatch = useDispatch();
  return React.useCallback((pdi: ProcessDataInfo) => () => dispatch(processData(pdi)), [dispatch]);
};

async function executeTransaction(pdi, Data, dispatch) {
  const { Model: Table, Action = 'c', Snackbar = false, onSuccess = undefined, onError = undefined } = pdi;

  if (Action === 'c' || Action === 'u' || Action === 'd') {
    dynamo.put({ TableName: Table, Item: Data }, function (err, data) {
      if (err) {
        var message = `(Error processing data.  Table: ${Table}`;
        Snackbar && dispatch(updateSnackBar({ open: true, variant: 'error', message }));
        onError && onError(err, Data);
        console.error({ message, err, Data });
      } else {
        Snackbar && dispatch(updateSnackBar({ open: true, variant: 'success', message: 'Success' }));
        onSuccess && onSuccess(data, Data);
      }
    });
  } else {
    dynamo.get({ TableName: Table, Key: Data }, function (err, data) {
      if (err) {
        var message = `(Error processing data.  Table: ${Table}`;
        Snackbar && dispatch(updateSnackBar({ open: true, variant: 'error', message }));
        onError && onError(err, Data);
        console.error({ message, err, Data });
      } else {
        Snackbar && dispatch(updateSnackBar({ open: true, variant: 'success', message: 'Success' }));
        onSuccess && onSuccess(data, Data);
      }
    });
  }
}

const processData = (pdi: ProcessDataInfo) => async (dispatch: any, getState: any) => {
  const { Model: Table, Data: DataProp, Action = 'c', Snackbar = true, onError = undefined } = pdi;
  const Data = {
    ...DataProp,
    created: Action === 'c' ? new Date().getTime() : DataProp.created,
    updated: Action === 'd' || Action === 'u' ? new Date().getTime() : DataProp.updated,
    deleted: Action === 'd' ? true : DataProp.deleted
  };
  try {
    executeTransaction(pdi, Data, dispatch);
  } catch (error) {
    if (error.statusCode === 409) {
      //Document update conflict.  This can happen if someone updated the document at the server while another user's browser is editing an earlier revision
      //Just show an error for now, as the applications will rarely be edited and the tables are constantly refreshed with new data.
      //The correct logic would get the most recent document from the database, inform the user that the document is out of date, update the revision number and allow the user to review changes or force the update.
    }
    var message = `(Caught Error processing data.  Table: ${Table}`;
    Snackbar && dispatch(updateSnackBar({ open: true, variant: 'error', message }));
    onError && onError(error, Data);
    console.error({ message, error, Data });
  }
};

export default useProcessData;
