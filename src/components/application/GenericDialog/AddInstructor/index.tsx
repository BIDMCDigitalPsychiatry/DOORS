import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendInstructorInvite } from './helpers';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import useProcessData from '../../../../database/useProcessData';
import { tables } from '../../../../database/dbConfig';
import Instructor from '../../../../database/models/Instructor';
import { uuid } from '../../../../helpers';
import { useUserId } from '../../../layout/hooks';

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

  const processData = useProcessData();
  const parentId = useUserId();

  const submitData = React.useCallback(
    ({ values, OnSuccess }) => {
      const { email } = values;
      const instructor: Instructor = {
        id: uuid(),
        email,
        parentId
      };

      setState(prev => ({ ...prev, loading: true }));

      processData({
        Model: tables.instructors,
        Action: 'c',
        Data: instructor,
        onError: () => setState(prev => ({ ...prev, loading: false, error: 'Error submitting values' })),
        onSuccess: OnSuccess(instructor)
      });
    },
    [setState, processData, parentId]
  );

  const onError = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Error sending invite' });
  }, [handleClose]);

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Successfully sent invite' });
  }, [handleClose]);

  const onSubmitSuccess = React.useCallback(
    values => ({ id }) => {
      sendInstructorInvite({ id, email: values.email, onSuccess, onError });
    },
    [onError, onSuccess]
  );

  const handleSubmit = React.useCallback(values => submitData({ values, OnSuccess: onSubmitSuccess(values) }), [submitData, onSubmitSuccess]);

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
