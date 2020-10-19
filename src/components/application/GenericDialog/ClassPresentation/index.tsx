import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import { uuid } from '../../../../helpers';
import Select from '../../DialogField/Select';
import ClassPresentationLink from '../../../pages/Class/ClassPresentationLink';
import Check from '../../DialogField/Check';

export const title = 'Class Presentation';

export default function ClassPresentationDialog({ id = title, onClose = undefined, onSubmit, anchorEl = undefined, setValues = undefined, ...other }) {
  const [{ type }, setState] = useDialogState(id);

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  const handleSubmit = React.useCallback(
    (values, setValues) => {
      const id = type === 'Add' ? uuid() : values?.id;
      onSubmit && onSubmit({ values: { ...values, id }, setValues, type });
      handleClose();
    },
    [onSubmit, type, handleClose]
  );

  return (
    <GenericDialog
      id={id}
      title={id}
      onClose={onClose}
      submitLabel={'Save'}
      onSubmit={handleSubmit}
      fields={[
        {
          id: 'id',
          hidden: true
        },
        {
          id: 'name',
          label: 'Presentation Name',
          placeholder: 'Enter name',
          required: true
        },
        {
          id: 'type',
          label: 'Type',
          Field: Select,
          items: [
            //{ label: 'PDF', value: 'PDF' },
            { label: 'Video', value: 'Video' }
            //{ label: 'Link', value: 'Link' }
          ],
          hidden: true,
          initialValue: 'Video'
        },
        {
          id: 'link',
          label: 'Presentation Link',
          http: true,
          Field: ClassPresentationLink,
          placeholder: 'Enter link to video presentation',
          required: true,
          xs: 12
        },
        {
          id: 'locked',
          label: 'Is locked for editing?',
          Field: Check,
          color: 'primary'
        }
      ]}
      {...other}
    />
  );
}
