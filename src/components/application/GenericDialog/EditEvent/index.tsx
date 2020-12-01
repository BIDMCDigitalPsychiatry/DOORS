import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import useProcessData from '../../../../database/useProcessData';
import { tables } from '../../../../database/dbConfig';
import Switch from '../../DialogField/Switch';
import DateTimePicker from '../../DialogField/DateTimePicker';
import useTableRow from '../../../../database/useTableRow';

export const title = 'Edit Event';
const Model = tables.events;

export default function EditEventDialog({ id = title, onClose }) {
  const [{ eventId, open }, setState] = useDialogState(id);

  const { row: initialValues } = useTableRow({ id: eventId, Model: tables.events, active: open });

  const handleClose = React.useCallback(
    (props = undefined) => {
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState]
  );

  const processData = useProcessData();

  const submitData = React.useCallback(
    ({ values, OnSuccess }) => {
      const Data = values;
      setState(prev => ({ ...prev, loading: true }));
      processData({
        Model,
        Action: 'u',
        Data,
        onError: () => setState(prev => ({ ...prev, loading: false, error: 'Error submitting values' })),
        onSuccess: () => OnSuccess(Data)
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

  const handleDelete = React.useCallback(
    values => {
      const Data = { ...values, deleted: true };
      setState(prev => ({ ...prev, loading: true }));
      processData({
        Model,
        Action: 'u',
        Data,
        onError: () => setState(prev => ({ ...prev, loading: false, error: 'Error submitting values' })),
        onSuccess: () => onSuccess()
      });
    },
    [setState, processData, onSuccess]
  );

  const handleSubmit = React.useCallback(values => submitData({ values, OnSuccess: onSuccess, OnError: onError }), [submitData, onSuccess, onError]);

  return (
    <GenericDialog
      id={id}
      title={id}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      onClose={onClose}
      onDelete={handleDelete}
      submitLabel='Save'
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