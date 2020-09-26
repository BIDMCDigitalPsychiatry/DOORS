import * as React from 'react';
import useProcessData from '../../database/useProcessData';
import { useSnackBar } from '../application/SnackBar/useSnackBar';

const actions = {
  c: 'creating',
  r: 'reading',
  u: 'updating',
  d: 'deleting'
};

export const actionText = action => actions[action];

export default function useFormState({ validate = undefined, Model, onError: OnError = undefined, onSuccess: OnSuccess = undefined }) {
  const [formState, setFormState] = React.useState({
    loading: false,
    error: undefined,
    errors: {}
  });
  const processData = useProcessData();
  const [, setSnackbar] = useSnackBar();

  const handleSubmit = React.useCallback(
    (Data, Action = 'c' as any) => () => {
      setFormState(prev => ({ ...prev, loading: true, error: undefined, errors: {} }));
      const errors = validate ? validate(Data) : {};      
      if (Object.keys(errors).length > 0) {
        setFormState(prev => ({ ...prev, loading: false, errors }));
        setSnackbar({ open: true, variant: 'error', message: 'Input validation error' });
      } else {
        processData({
          Model,
          Action,
          Data,
          onError: () => {
            setFormState(prev => ({ ...prev, loading: false, error: `Error ${actionText(Action)}` }));
            setSnackbar({ open: true, variant: 'error', message: `Error ${actionText(Action)}` });
            OnError && OnError();
          },
          onSuccess: () => {
            setFormState(prev => ({ ...prev, loading: false, error: undefined }));
            setSnackbar({ open: true, variant: 'success', message: `Success ${actionText(Action)}` });
            OnSuccess && OnSuccess();
          }
        });
      }
    },
    [setFormState, validate, Model, OnError, OnSuccess, processData, setSnackbar]
  );

  const handleCreate = React.useCallback(Data => handleSubmit(Data, 'c'), [handleSubmit]);
  const handleUpdate = React.useCallback(Data => handleSubmit(Data, 'u'), [handleSubmit]);
  const handleDelete = React.useCallback(Data => handleSubmit(Data, 'd'), [handleSubmit]);

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    formState
  };
}
