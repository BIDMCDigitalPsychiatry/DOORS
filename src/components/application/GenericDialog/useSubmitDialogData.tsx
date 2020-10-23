import React from 'react';
import { useDialogState } from './useDialogState';
import useProcessData from '../../../database/useProcessData';

export const useSubmitDialogData = ({ id, onClose = undefined }) => {
  const [, setState] = useDialogState(id);
  const processData = useProcessData();

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  const submitData = React.useCallback(
    ({ Data, Model, Action = 'c', OnSuccess = undefined, OnError = undefined }) => {
      setState(prev => ({ ...prev, loading: true }));
      processData({
        Model,
        Action,
        Data,
        onError: OnError ? OnError : () => setState(prev => ({ ...prev, loading: false, error: 'Error submitting values' })),
        onSuccess: OnSuccess ? OnSuccess : handleClose // If OnSuccess is provided, then that function should handle closing of the dialog, otherwise automatically close
      });
    },
    [setState, processData, handleClose]
  );

  return submitData;
};
