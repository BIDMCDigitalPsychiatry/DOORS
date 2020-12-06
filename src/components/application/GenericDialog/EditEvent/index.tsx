import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import useProcessData from '../../../../database/useProcessData';
import { tables } from '../../../../database/dbConfig';
import Switch from '../../DialogField/Switch';
import DateTimePicker from '../../DialogField/DateTimePicker';
import useTableRow from '../../../../database/useTableRow';
import { useGroups } from '../../../../database/useGroups';
import { useUserId } from '../../../layout/hooks';
import { useIsInstructorMode } from '../../../../hooks';
import Select from '../../DialogField/Select';
import DialogButton from '../DialogButton';
import * as MarkEventAttendanceDialog from '../MarkEventAttendance';
import Label from '../../DialogField/Label';
import { Divider } from '@material-ui/core';

export const title = 'Edit Event';
const Model = tables.events;

const MarkAttendanceButton = ({ values }) => {
  const { id, groupId } = values;

  return (
    <DialogButton
      disabled={!groupId}
      Module={MarkEventAttendanceDialog}
      mount={false}
      fullWidth={true}
      variant='styled'
      size='large'
      tooltip=''
      initialValues={{
        eventId: id,
        groupId
      }}
    >
      View or Mark Attendance
    </DialogButton>
  );
};

export default function EditEventDialog({ id = title, disabled = false, onClose }) {
  const [{ eventId, open }, setState] = useDialogState(id);

  const userId = useUserId(); // Only instructors can currently create events, so grab the user id
  const isInstructorMode = useIsInstructorMode();

  //Edit event can either be instructor or admin, so select groups accordningly

  const { data: groups } = useGroups({
    requestParams: isInstructorMode && {
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
      title={disabled ? 'View Event' : id}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      onClose={onClose}
      onDelete={!disabled ? handleDelete : undefined}
      submitLabel={disabled ? null : 'Save'}
      cancelLabel='Close'
      fields={[
        {
          id: 'id',
          hidden: true
        },
        {
          Field: Label,
          label: 'Event Information'
        },
        {
          Field: Divider
        },
        {
          id: 'title',
          label: 'Title',
          required: true,
          disabled
        },
        {
          id: 'description',
          label: 'Description',
          disabled
        },
        {
          id: 'allDay',
          label: 'All day',
          Field: Switch,
          disabled
        },
        {
          id: 'start',
          label: 'Start',
          Field: DateTimePicker,
          disabled
        },
        {
          id: 'end',
          label: 'End',
          Field: DateTimePicker,
          disabled
        },
        {
          id: 'groupId',
          label: value => groups.find(g => g.id === value)?.name,
          Field: Label,
          items: groups.map(g => ({ label: g.name, value: g.id })),
          disableClearable: true,
          required: true,
          fullWidth: true,
          disabled: true,
          xs: 4
        },
        {
          Field: Label,
          label: 'Attendance Information',
          style: { marginTop: 8 }
        },
        {
          Field: Divider
        },
        {
          id: 'groupId',
          label: 'Group',
          Field: Select,
          items: groups.map(g => ({ label: g.name, value: g.id })),
          disableClearable: true,
          required: true,
          fullWidth: true,
          disabled: true,
          xs: 4
        },
        {
          id: 'groupId',
          Field: MarkAttendanceButton
        }
      ]}
    />
  );
}
