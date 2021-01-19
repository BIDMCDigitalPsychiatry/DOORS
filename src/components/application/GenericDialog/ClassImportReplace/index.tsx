import React from 'react';
import GenericDialog from '../GenericDialog';
import { bool, copyToLower } from '../../../../helpers';
import { useDialogState } from '../useDialogState';
import Label from '../../DialogField/Label';
import ClassSelector from '../../DialogField/ClassSelector';
import { Divider } from '@material-ui/core';
import useTableRow from '../../../../database/useTableRow';
import { tables } from '../../../../database/dbConfig';
import { uuid } from '../../../../helpers';
import { useUserType } from '../../../../hooks';
import { useLayout } from '../../../layout/hooks';

export const title = 'Class Update';

const validate = (values, dialogState) => {
  const { classes = [] } = values;
  var errors = copyToLower(dialogState.errors); // start with server generated errors, ensure all keys start with lowercase letter

  var foundImport = false;
  Array.isArray(classes) &&
    classes.forEach(c => {
      foundImport = foundImport || bool(c.imported);
    });

  if (!foundImport) {
    errors['classes'] = 'Must select at least one class to import.';
  }

  return errors;
};

export default function ClassImportDialog({ id = title, onClose }) {
  const [, setState] = useDialogState(id);
  const [{ instructor }] = useLayout();
  const { userId } = instructor;
  const { setRow } = useTableRow({ Model: tables.classes });
  const userType = useUserType();

  const handleSubmit = React.useCallback(
    values => {
      const done = () => {
        onClose && onClose();
        setState({ open: false });
      };

      const archiveClasses = values?.archiveClasses?.filter(c => bool(c.imported));

      if (archiveClasses && archiveClasses.length > 0) {
        archiveClasses.forEach((c, i) => {
          const { id, created, updated, deleted, ...other } = c;
          const now = new Date().getTime();

          setRow({
            id,
            values: { id, ...other, deleted: true, updated: now }
          });
        });
      }

      const classes = values?.classes?.filter(c => bool(c.imported));

      if (classes && classes.length > 0) {
        classes.forEach((c, i) => {
          const { created, updated, deleted, ...other } = c;
          const id = uuid();
          const now = new Date().getTime();
          done();
          setRow({
            id,
            values: { ...other, id, parentUserId: c.userId, parentClassId: c.id, userId, created: now, updated: now, userType },
            onSuccess: () => {
              if (i === classes.length - 1) {
                done();
              }
            }
          });
        });
      } else {
        done();
      }
    },
    [setState, onClose, setRow, userId, userType]
  );

  return (
    <GenericDialog
      id={id}
      title={title}
      onSubmit={handleSubmit}
      hasChanged={true} // Force enable the submit button
      validate={validate}
      submitLabel='Confirm Update'
      cancelLabel={'Cancel'}
      maxWidth='sm'
      fields={[
        {
          id: 'label',
          Field: Label,
          label: 'Import new class data:'
        },
        {
          Field: Divider
        },
        {
          id: 'classes',
          Field: ClassSelector,
          color: 'primary',
          style: { marginLeft: 24 }
        },
        {
          id: 'label',
          Field: Label,
          label: 'Previous class data will be automatically archived:',
          style: { marginTop: 32 }
        },
        {
          Field: Divider
        },
        {
          id: 'archiveClasses',
          Field: ClassSelector,
          color: 'primary',
          style: { marginLeft: 24 }
        }
      ]}
      onClose={onClose}
    />
  );
}
