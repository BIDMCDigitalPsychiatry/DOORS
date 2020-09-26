import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import Check from '../../DialogField/Check';
import { bool, uuid } from '../../../../helpers';

export const title = 'Block List';

export default function BlockListDialog({ id = title, onClose = undefined, onSubmit, anchorEl = undefined, setValues = undefined, ...other }) {
  const [{ type }, setState] = useDialogState(id);

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  const handleSubmit = React.useCallback(
    (values, setValues) => {
      onSubmit && onSubmit({ values, setValues, type });
      handleClose();
    },
    [onSubmit, type, handleClose]
  );

  return (
    <GenericDialog
      id={id}
      title={id}
      onClose={onClose}
      submitLabel={'Done'}
      onSubmit={handleSubmit}
      fields={[
        {
          id: 'id',
          hidden: true,
          initialValue: type === 'Add' ? uuid() : undefined
        },
        {
          id: 'name',
          label: 'Name',
          placeholder: 'Enter name'
        },
        /*
        {
          id: 'canDelete',
          label: 'Can remove?',
          Field: Check
        },
        {
          id: 'canEdit',
          label: 'Can edit?',
          Field: Check
        },*/
        {
          id: 'canLock',
          label: 'Can lock for editing?',
          Field: Check
        },
        {
          id: 'locked',
          label: 'Is locked for editing?',
          Field: Check,
          active: vals => bool(vals?.canLock)
        }
      ]}
      {...other}
    />
  );
}
