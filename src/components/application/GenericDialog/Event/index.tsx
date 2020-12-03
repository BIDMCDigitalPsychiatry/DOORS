import React from 'react';
import moment from 'moment';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import useProcessData from '../../../../database/useProcessData';
import { tables } from '../../../../database/dbConfig';
import { uuid } from '../../../../helpers';
import { useUserId } from '../../../layout/hooks';
import Switch from '../../DialogField/Switch';
import DateTimePicker from '../../DialogField/DateTimePicker';
import { useTheme } from '@material-ui/core';
import { useGroups } from '../../../../database/useGroups';
import Select from '../../DialogField/Select';

export const title = 'Add Event';
const Model = tables.events;

export default function EventDialog({ id = title, onClose }) {
  const userId = useUserId(); // Only instructors can currently create events, so grab the user id

  const { data: groups } = useGroups({
    requestParams: {
      // If instructor mode, then filter groups by instructor's userId
      FilterExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }
  });

  const [, setState] = useDialogState(id);
  const handleClose = React.useCallback(
    (props = undefined) => {
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState]
  );

  const processData = useProcessData();
  const { palette } = useTheme();
  const color = palette.primary.light;

  const submitData = React.useCallback(
    ({ values, OnSuccess }) => {
      const Data = { ...values, color };
      setState(prev => ({ ...prev, loading: true }));
      processData({
        Model,
        Action: 'c',
        Data,
        onError: () => setState(prev => ({ ...prev, loading: false, error: 'Error submitting values' })),
        onSuccess: () => OnSuccess(Data)
      });
    },
    [setState, processData, color]
  );

  const onError = React.useCallback(() => {
    handleClose({ open: true, variant: 'error', message: 'Error' });
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Success' });
  }, [handleClose]);

  const handleSubmit = React.useCallback(values => submitData({ values, OnSuccess: onSuccess, OnError: onError }), [submitData, onSuccess, onError]);

  return (
    <GenericDialog
      initialValues={{
        id: uuid(),
        userId
      }}
      id={id}
      title={id}
      onSubmit={handleSubmit}
      submitLabel='Add'
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
          id: 'groupId',
          label: 'Group',
          Field: Select,
          items: groups.map(g => ({ label: g.name, value: g.id })),
          disableClearable: true,
          required: true,
          fullWidth: true,
          xs: 4
        },
        {
          id: 'allDay',
          label: 'All day',
          Field: Switch
        },
        {
          id: 'start',
          label: 'Start',
          Field: DateTimePicker,
          initialValue: moment().toDate()
        },
        {
          id: 'end',
          label: 'End',
          Field: DateTimePicker,
          initialValue: moment().add(30, 'minutes').toDate()
        }
      ]}
    />
  );
}
