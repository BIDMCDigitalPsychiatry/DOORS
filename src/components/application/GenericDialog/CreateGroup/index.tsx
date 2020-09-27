import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendStudentInvite } from './helpers';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import { isEmpty, parseEmails, validateEmail } from '../../../../helpers';

export const title = 'Create New Group';

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

  const handleClose = React.useCallback(
    (props = undefined) => {
      props && setSnackbar(props);
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState, setSnackbar]
  );

  const onError = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Error creating group' });
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Successfully created group' });
  }, [handleClose]);

  const handleSubmit = React.useCallback(
    ({ id, name, location, sessionId, participants }, setValues) => {
      // TODO: Create group in database
      // Send invite emails
      parseEmails(participants).forEach(email => {
        sendStudentInvite({ id, email, name, location, onSuccess, onError });
      });
    },
    [onSuccess, onError]
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
