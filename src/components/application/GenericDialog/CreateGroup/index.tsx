import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import Radio from '../../DialogField/Radio';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendStudentInvite } from './helpers';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import { isEmpty, parseEmails, uuid, validateEmail } from '../../../../helpers';
import { tables } from '../../../../database/dbConfig';
import { useSubmitDialogData } from '../useSubmitDialogData';

export const title = 'Create New Group';

const Model = tables.groups;

const validate = ({ participants }) => {
  const newErrors = {};
  if (isEmpty(participants)) {
    newErrors['name'] = 'Required';
  } else {
    parseEmails(participants).forEach(e => {
      if (!validateEmail(e)) {
        newErrors['participants'] = 'Invalid email format';
      }
    });
  }
  return newErrors;
};

export default function CreateGroupDialog({ id = title, onClose = undefined }) {
  const [state, setState] = useDialogState(id);
  const { initialValues, subtitle = 'Unknown Session' } = state;
  const [, setSnackbar] = useSnackBar();
  const submitData = useSubmitDialogData({ id, onClose });

  const handleClose = React.useCallback(
    (props = undefined) => {
      props && setSnackbar(props);
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState, setSnackbar]
  );

  const onError = React.useCallback(() => handleClose({ open: true, variant: 'error', message: 'Error sending student invite' }), [handleClose]);

  const onSubmitSuccess = React.useCallback(
    values => ({ id, name, location, type, participants }) => {
      parseEmails(participants).forEach(email => {
        sendStudentInvite({ id, email, name, type, location, onError });
      });
    },
    [onError]
  );

  const handleSubmit = React.useCallback(
    values =>
      submitData({
        Data: {
          id: uuid(),
          ...values
        },
        Model,
        Action: 'c',
        OnSuccess: onSubmitSuccess(values)
      }),
    [submitData, onSubmitSuccess]
  );

  return (
    <GenericDialog
      id={id}
      title={id}
      onClose={onClose}
      submitLabel={'Create Group'}
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      fields={[
        {
          label: subtitle,
          Field: Label
        },
        {
          label: 'Group Information',
          Field: Label
        },
        {
          Field: MarginDivider
        },
        {
          id: 'sessionId',
          label: 'Session ID',
          InputProps: {
            readOnly: true
          },
          hidden: true
        },
        {
          id: 'name',
          label: 'Group Name',
          placeholder: 'Enter Group Name',
          required: true
        },
        {
          id: 'location',
          label: 'Location',
          placeholder: 'Enter Group Location',
          required: true
        },
        {
          id: 'type',
          label: 'Group Type',
          Field: Radio,
          variant: 'outlined',
          items: [
            { value: 'On Site', label: 'On Site' },
            { value: 'On Line', label: 'On Line' }
          ],
          initialValue: 'On Line'
        },
        {
          id: 'participants',
          label: 'Group Participats',
          placeholder: 'Enter email addressess to give acces to this session',
          required: true,
          multiline: true,
          rows: 6
        }
      ]}
    />
  );
}
