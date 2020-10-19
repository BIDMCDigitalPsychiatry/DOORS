import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendInstructorEmail } from './helpers';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';

export const title = 'Alert Instructor';

export default function InstructorAlertDialog({ id = title, onClose = undefined }) {
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

  const onError = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Error sending message' });
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Successfully sent message' });
  }, [handleClose]);

  const handleSubmit = React.useCallback(
    ({ email, message }) => {
      sendInstructorEmail({ email, message, onSuccess, onError });
    },
    [onSuccess, onError]
  );

  return (
    <GenericDialog
      id={id}
      title={title}
      onClose={onClose}
      submitLabel={'Send'}
      onSubmit={handleSubmit}
      fields={[
        {
          label: 'Enter a message to send the instructor an email alert.',
          Field: Label
        },
        {
          Field: MarginDivider
        },
        {
          id: 'email',
          label: 'Instructors Email',
          required: true,
          email: true,
          InputProps: {
            readOnly: true
          }
        },
        {
          id: 'message',
          label: 'Your Message',
          required: true,
          multiline: true,
          rows: 6,
          placeholder: 'Enter your message'
        }
      ]}
    />
  );
}
