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

export default function useProcessDataState({ validate = undefined, Model }) {
  const [formState, setFormState] = React.useState({
    loading: false,
    error: undefined,
    errors: {}
  });
  const processData = useProcessData();
  const [, setSnackbar] = useSnackBar();

  const handleSubmit = React.useCallback(
    ({ Data, Action = 'c' as any, onSuccess = undefined, onError = undefined }) => {
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
            onError && onError();
          },
          onSuccess: () => {
            setFormState(prev => ({ ...prev, loading: false, error: undefined }));
            onSuccess && onSuccess();
          }
        });
      }
    },
    [setFormState, validate, Model, processData, setSnackbar]
  );

  const handleCreate = React.useCallback(({ Data, onSuccess = undefined }) => handleSubmit({ Data, Action: 'c', onSuccess }), [handleSubmit]);
  const handleUpdate = React.useCallback(({ Data, onSuccess = undefined }) => handleSubmit({ Data, Action: 'u', onSuccess }), [handleSubmit]);
  const handleDelete = React.useCallback(({ Data, onSuccess = undefined }) => handleSubmit({ Data, Action: 'd', onSuccess }), [handleSubmit]);

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    formState
  };
}
