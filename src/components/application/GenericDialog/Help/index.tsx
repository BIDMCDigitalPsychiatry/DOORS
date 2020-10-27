import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendHelpEmail } from './helpers';
import { useUserEmail } from '../../../layout/hooks';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import { useIsStudentMode } from '../../../../hooks';

export const title = 'Get In Touch';

export default function HelpDialog({ id = title, onClose = undefined, ...other }) {
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
    ({ name, email, message }, setValues) => {
      sendHelpEmail({ name, email, message, onSuccess, onError });
    },
    [onSuccess, onError]
  );

  const isStudentMode = useIsStudentMode();  

  return (
    <GenericDialog
      id={id}
      title={id}
      onClose={onClose}
      submitLabel={'Send'}
      onSubmit={handleSubmit}
      fields={[
        {
          label: 'This interface is not monitored . If you are having thoughts of suicide or self-harm, please call 1-800-273-8255.',
          Field: Label,
          hidden: !isStudentMode
        },
        {
          Field: MarginDivider,
          hidden: !isStudentMode
        },
        {
          label: 'If you have any questions or comments about the program, send a message to the program administrators.',
          Field: Label
        },

        {
          Field: MarginDivider
        },
        {
          id: 'email',
          label: 'Your Email',
          initialValue: useUserEmail(),
          required: true,
          email: true,
          InputProps: {
            readOnly: true
          }
        },
        {
          id: 'name',
          label: 'Your Name',
          placeholder: 'Enter your name',
          required: true
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
      {...other}
    />
  );
}
