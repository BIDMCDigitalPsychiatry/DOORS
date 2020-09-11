import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendInstructorInvite } from './helpers';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';

export const title = 'Add Instructor';

export default function AddInstructorDialog({ id = title }) {
  const [, setState] = useDialogState(id);
  const [, setSnackbar] = useSnackBar();

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
  }, [setState]);

  const onError = React.useCallback(() => {
    setSnackbar({ open: true, variant: 'success', message: 'Error sending invite' });
    handleClose();
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    setSnackbar({ open: true, variant: 'success', message: 'Invite successfully sent.' });
    handleClose();
  }, [handleClose, setSnackbar]);

  const handleSubmit = React.useCallback(({ email }, setValues) => {
    // TODO: Add logic to invite user and enter invite code in database
    console.log(email);
    sendInstructorInvite({ email, onSuccess, onError });
  }, []);

  return (
    <GenericDialog
      id={id}
      title={id}
      submitLabel='Send Invite'
      onSubmit={handleSubmit}
      fields={[
        {
          label: `Enter instructor's email below and we will send them a link to activate their account.`,
          Field: Label
        },
        {
          Field: MarginDivider
        },
        {
          id: 'email',
          label: 'Email',
          required: true,
          email: true
        }
      ]}
    />
  );
}
