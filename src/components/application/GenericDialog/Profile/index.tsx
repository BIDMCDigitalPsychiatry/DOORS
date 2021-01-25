import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import { useProfile } from '../../../../database/useProfile';
import YesNo from '../../DialogField/YesNo';
import VinfenSelector from '../../DialogField/VinfenSelector';
import MultiSelectCheck from '../../DialogField/MultiSelectCheck';

export const title = 'Profile';

export default function ProfileDialog({ id = title, onClose = undefined, ...other }) {
  const [state, setState] = useDialogState(id);
  const { initialValues } = state;
  const [, setSnackbar] = useSnackBar();

  const { profile, setProfile } = useProfile({ id: initialValues?.id, state, setState, shouldSetLayout: false });

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
  const handleSubmit = React.useCallback((values, setValues) => setProfile({ values, onSuccess, onError }), [setProfile, onSuccess, onError]);

  return (
    <GenericDialog
      id={id}
      title={title}
      onClose={onClose}
      cancelLabel='Done'
      submitLabel={null}
      initialValues={profile}
      onSubmit={handleSubmit}
      fields={[
        {
          id: 'name',
          label: 'Username',
          required: true,
          disabled: true
        },
        {
          id: 'email',
          label: 'Email',
          disabled: true
        },
        { id: 'vinfenServices', label: 'Do you work at or receive services from Vinfen?', Field: YesNo, disabled: true },
        { id: 'type', label: 'Are you a clinician, a person served by Vinfen or other?', Field: VinfenSelector, disabled: true },
        {
          id: 'affiliatedProgram',
          label: 'Affiliated Vinfen Programs',
          Field: MultiSelectCheck,
          disabled: true,
          hidden: values => values?.type !== 'Person Served by Vinfen',
          items: [
            'I go to a Clubhouse',
            'I go to a Recovery Learning Center',
            'I go to an outpatient clinic',
            'I live in a Vinfen group home',
            'I receive services from a Vinfen team (outreach worker, peer support, housing support, etc)',
            'Other'
          ].map(label => ({ value: label, label }))
        },
        {
          id: 'affiliatedProgram',
          label: 'Affiliated Vinfen Programs',
          Field: MultiSelectCheck,
          disabled: true,
          hidden: values => values?.type !== 'Person Served by Vinfen',
          items: [
            'I go to a Clubhouse',
            'I go to a Recovery Learning Center',
            'I go to an outpatient clinic',
            'I live in a Vinfen group home',
            'I receive services from a Vinfen team (outreach worker, peer support, housing support, etc)',
            'Other'
          ].map(label => ({ value: label, label }))
        },
        {
          id: 'clinicianAffiliation',
          hidden: values => values?.type !== 'Clinician',
          label: 'Clinical Affiliation',
          disabled: true
        },
        {
          id: 'otherAffiliation',
          hidden: values => values?.type !== 'Other',
          label: 'Other Affiliation',
          disabled: true
        }
      ]}
      {...other}
    />
  );
}
