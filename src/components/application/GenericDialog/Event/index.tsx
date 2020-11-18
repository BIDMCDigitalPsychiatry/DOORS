import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import useProcessData from '../../../../database/useProcessData';
import { tables } from '../../../../database/dbConfig';
import { uuid } from '../../../../helpers';
import { useUserId } from '../../../layout/hooks';
import Switch from '../../DialogField/Switch';
import DateTimePicker from '../../DialogField/DateTimePicker';

export const title = 'Event';
const Model = tables.events;

export default function EventDialog({ id = title, onClose }) {
  const [, setState] = useDialogState(id);
  const [, setSnackbar] = useSnackBar();

  const handleClose = React.useCallback(
    (props = undefined) => {
      props && setSnackbar(props);
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState, setSnackbar]
  );

  const processData = useProcessData();

  const submitData = React.useCallback(
    ({ values, OnSuccess }) => {
      const Data = values;
      setState(prev => ({ ...prev, loading: true }));

      console.log('processing');
      console.log({ Data });

      processData({
        Model,
        Action: 'c',
        Data,
        onError: () => setState(prev => ({ ...prev, loading: false, error: 'Error submitting values' })),
        onSuccess: OnSuccess(Data)
      });
    },
    [setState, processData]
  );

  const onError = React.useCallback(() => {
    handleClose({ open: true, variant: 'error', message: 'Error' });
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Success' });
  }, [handleClose]);

  const handleSubmit = React.useCallback(values => submitData({ values, OnSuccess: onSuccess, OnError: onError }), [submitData, onSuccess, onError]);

  const userId = useUserId();

  return (
    <GenericDialog
      initialValues={{
        id: uuid(),
        userId
      }}
      id={id}
      title={id}
      onSubmit={handleSubmit}
      onClose={onClose}
      fields={[
        {
          id: 'id',
          hidden: true
        },
        {
          id: 'title',
          label: 'Title',
          required: true
        },
        {
          id: 'description',
          label: 'Description'
        },
        {
          id: 'allDay',
          label: 'All day',
          Field: Switch
        },
        {
          id: 'start',
          label: 'Start',
          Field: DateTimePicker
        },
        {
          id: 'end',
          label: 'End',
          Field: DateTimePicker
        }
      ]}
    />
  );
}
