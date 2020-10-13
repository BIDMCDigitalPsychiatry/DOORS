import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import { useProfile } from '../../../../database/useProfile';

export const title = 'Profile';

export default function ProfileDialog({ id = title, onClose = undefined, ...other }) {
  const [state, setState] = useDialogState(id);
  const { initialValues } = state;
  const [, setSnackbar] = useSnackBar();

  const { profile, setProfile } = useProfile({ id: initialValues?.id, state, setState });

  const handleClose = React.useCallback(
    (props = undefined) => {
      props && setSnackbar(props);
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState, setSnackbar]
  );

  const onError = React.useCallback(() => handleClose({ open: true, variant: 'success', message: 'Error saving profile' }), [handleClose]);
  const onSuccess = React.useCallback(() => handleClose({ open: true, variant: 'success', message: 'Successfully saved profile' }), [handleClose]);
  const handleSubmit = React.useCallback((values, setValues) => setProfile({ values, onSuccess, onError }), [
    setProfile,
    onSuccess,
    onError
  ]);

  return (
    <GenericDialog
      id={id}
      title={id}
      onClose={onClose}
      cancelLabel='Done'
      submitLabel={null}
      initialValues={profile}
      onSubmit={handleSubmit}
      fields={[
        {
          id: 'name',
          label: 'Name',
          InputProps: {
            readOnly: true
          }
        },
        {
          id: 'city',
          label: 'City',
          InputProps: {
            readOnly: true
          },
          xs: 8
        },
        {
          id: 'state',
          label: 'State',
          InputProps: {
            readOnly: true
          },
          xs: 4
        }
      ]}
      {...other}
    />
  );
}
