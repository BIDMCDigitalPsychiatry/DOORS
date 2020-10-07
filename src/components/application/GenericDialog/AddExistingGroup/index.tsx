import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import Radio from '../../DialogField/Radio';
import MarginDivider from '../../DialogField/MarginDivider';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import { uuid } from '../../../../helpers';
import { tables } from '../../../../database/dbConfig';
import { useSubmitDialogData } from '../useSubmitDialogData';
import { useUserId } from '../../../layout/hooks';

export const title = 'Add Existing Group';

const Model = tables.groups;

const validate = ({}) => {
  const newErrors = {};
  return newErrors;
};

export default function AddExistingGroupDialog({ id = title, onClose = undefined }) {
  const [state, setState] = useDialogState(id);
  const { initialValues, subtitle = 'Unknown Class' } = state;
  const [, setSnackbar] = useSnackBar();
  const submitData = useSubmitDialogData({ id });
  const userId = useUserId();
  
  const handleClose = React.useCallback(
    (props = undefined) => {
      props && setSnackbar(props);      
      setState(prev => ({ ...prev, open: false, loading: false }));
      onClose && onClose();
    },
    [onClose, setState, setSnackbar]
  );

  const onSubmitSuccess = React.useCallback(
    values => ({ id, name, location, type, participants }) => {
      //handleClose();
    },
    []
  );

  const handleSubmit = React.useCallback(
    values =>
    // TODO Complete logic for adding existing group id to class
        
      submitData({
        Data: {
          id: uuid(),
          userId,
          ...values
        },
        Model,
        Action: 'c',
        OnSuccess: onSubmitSuccess(values)
      }),
    [userId, submitData, onSubmitSuccess]
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
          id: 'classId',
          label: 'Class ID',
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
          placeholder: 'Enter email addressess to give acces to this class',
          required: true,
          multiline: true,
          rows: 6
        }
      ]}
    />
  );
}
