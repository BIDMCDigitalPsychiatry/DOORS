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

  const handleClose = React.useCallback(
    (props = undefined) => {
      props && setSnackbar(props);
      setState(prev => ({ ...prev, open: false, loading: false }));
    },
    [setState, setSnackbar]
  );

  const onError = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Error sending invite' });
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Successfully sent invite' });
  }, [handleClose]);

  const handleSubmit = React.useCallback(
    ({ email }) => {
      // TODO: Add logic to invite user and enter invite code in database
      console.log(email);
      sendInstructorInvite({ email, onSuccess, onError });
    },
    [onError, onSuccess]
  );

  return (
    <GenericDialog
      id={id}
      title={id}
      submitLabel='Send Invite'
      onSubmit={handleSubmit}
      fields={[
        {
          label: `Enter instructor's email and we will send a link to activate their account:`,
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
