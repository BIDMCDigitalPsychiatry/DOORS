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
import { useUserId } from '../../../layout/hooks';
import useProcessData from '../../../../database/useProcessData';
import Student from '../../../../database/models/Student';
import Group from '../../../../database/models/Group';

export const title = 'Create New Group';

const validate = ({ participants }) => {
  const newErrors = {};
  if (isEmpty(participants)) {
    newErrors['participants'] = 'Required';
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
  const { initialValues, subtitle = 'Unknown Class' } = state;
  const classId = initialValues['class']?.id;

  const [, setSnackbar] = useSnackBar();
  const submitData = useSubmitDialogData({ id });
  const userId = useUserId();

  const handleClose = React.useCallback(
    (props = undefined, isLast = true) => {
      props && setSnackbar(props);
      if (isLast) {
        setState(prev => ({ ...prev, open: false, loading: false }));
        onClose && onClose();
      }
    },
    [onClose, setState, setSnackbar]
  );

  const onSuccess = React.useCallback(() => {
    console.log('onSuccess');
    handleClose({ open: true, variant: 'success', message: 'Successfully sent invite' });
  }, [handleClose]);

  const onError = React.useCallback(
    isLast => () => {
      handleClose({ open: true, variant: 'error', message: 'Error sending invite' }, isLast);
    },
    [handleClose]
  );

  const processData = useProcessData();
  const parentId = useUserId();

  const onSubmitSuccess = React.useCallback(
    ({ id: groupId, participants, name, type, location }) => () => {
      parseEmails(participants).forEach((email, i) => {
        // Create the student invite rows and also send the individual invites
        const isLast = i === parseEmails(participants).length - 1;
        const id = uuid();

        const Data: Student = {
          id,
          groupId,
          classId,
          parentId,
          email
        };

        setState(prev => ({ ...prev, loading: true }));

        processData({
          Model: tables.students,
          Action: 'c',
          Data,
          onError: onError(isLast),
          onSuccess: () => {
            sendStudentInvite({ id, email, name, type, location, onError: onError(isLast), onSuccess: isLast && onSuccess });
          }
        });
      });
    },
    [classId, onSuccess, onError, parentId, setState, processData]
  );

  const handleSubmit = React.useCallback(
    ({ name, location, type, participants }) => {
      // First create the group in the database
      const group: Group = {
        id: uuid(),
        userId, // id of user that created the group
        instructorId: userId,
        classId,
        name,
        location,
        type,
        participants
      };

      submitData({
        Data: group,
        Model: tables.groups,
        Action: 'c',
        OnSuccess: onSubmitSuccess(group) // Next create the student invites
      });
    },
    [userId, classId, submitData, onSubmitSuccess]
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
