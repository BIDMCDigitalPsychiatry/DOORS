import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { useDialogState } from '../useDialogState';
import { useSnackBar } from '../../SnackBar/useSnackBar';
import useProcessData from '../../../../database/useProcessData';
import { tables } from '../../../../database/dbConfig';
import Student from '../../../../database/models/Student';
import { isEmpty, parseEmails, uuid, validateEmail } from '../../../../helpers';
import { useLayout, useUserId } from '../../../layout/hooks';
import { sendStudentInvite } from '../CreateGroup/helpers';

export const title = 'Add New Student';

const validate = ({ emails }) => {
  const newErrors = {};
  if (isEmpty(emails)) {
    newErrors['emails'] = 'Required';
  } else {
    parseEmails(emails).forEach(e => {
      if (!validateEmail(e)) {
        newErrors['emails'] = 'Invalid email format';
      }
    });
  }
  return newErrors;
};

export default function AddStudentDialog({ id = title, onClose }) {
  const [{ initialValues }, setState] = useDialogState(id);
  const { group = {} } = initialValues;
  const { id: groupId, name, type, location } = group;
  const [, setSnackbar] = useSnackBar();

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

  const processData = useProcessData();

  // Students should be invited by the active isntructor (don't use userId because admin's can add users for an instructor via layout.instructor)
  const [{ instructor }] = useLayout();
  var parentId = instructor.userId;

  // If for some reason instructor isn't set, then use the current user Id (which is the instructor's userId when lgge in as an instructor)
  const userId = useUserId();
  if (!parentId) {
    parentId = userId;
  }

  const onSuccess = React.useCallback(() => {
    handleClose({ open: true, variant: 'success', message: 'Successfully sent invite' });
  }, [handleClose]);

  const onError = React.useCallback(
    isLast => () => {
      handleClose({ open: true, variant: 'error', message: 'Error sending invite' }, isLast);
    },
    [handleClose]
  );

  const handleSubmit = React.useCallback(
    values => {
      const { emails } = values;
      parseEmails(emails).forEach((email, i) => {
        const id = uuid();
        const isLast = i === parseEmails(emails).length - 1;

        const Data: Student = {
          id,
          groupId,
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
    [setState, processData, parentId, onSuccess, onError, name, type, location, groupId]
  );

  return (
    <GenericDialog
      id={id}
      maxWidth='sm'
      title={title}
      submitLabel='Send Invite'
      onSubmit={handleSubmit}
      onClose={onClose}
      validate={validate}
      fields={[
        {
          label: `Students will receive an invitation via their email address, if the student is already registered they will see the class available on their main dashboard.  You can add multiple email addresses at the same time, just enter a space or comma between different email addresses.`,
          Field: Label
        },
        {
          Field: MarginDivider
        },
        {
          id: 'emails',
          label: 'Emails to Add',
          autoFocus: true,
          placeholder: 'Enter email address to give access to this class',
          required: true,
          multiline: true,
          rows: 4
        }
      ]}
    />
  );
}
