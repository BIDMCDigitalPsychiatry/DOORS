import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import { uuid } from '../../../../helpers';
import Select from '../../DialogField/Select';
import Label from '../../DialogField/Label';

export const title = 'Pre-Requisite';

export default function PreRecDialog({ id = title, onDelete, onClose = undefined, onSubmit, anchorEl = undefined, setValues = undefined, ...other }) {
  const [{ type, initialValues }, setState] = useDialogState(id);
  const { options = [], classOptions = [] } = initialValues;

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  const handleSubmit = React.useCallback(
    values => {
      if (type === 'Add') {
        onSubmit && onSubmit({ ...values, id: uuid() });
      } else {
        onSubmit && onSubmit(values);
      }
      handleClose();
    },
    [onSubmit, type, handleClose]
  );

  return (
    <GenericDialog
      id={id}
      title={id}
      onClose={onClose}
      onDelete={type === 'Edit' && onDelete}
      submitLabel={'Done'}
      onSubmit={handleSubmit}
      fields={[
        {
          id: 'id',
          hidden: true
        },
        {
          Field: Label,
          label: 'Select group and assicated class which must be completed prior to starting this class.'
        },
        {
          id: 'groupId',
          label: 'Select Group',
          Field: Select,
          items: options,
          autoFocus: true,
          required: true
        },
        {
          id: 'classId',
          label: 'Must Complete Class',
          Field: Select,
          items: classOptions,
          required: true
        }
      ]}
      {...other}
    />
  );
}
