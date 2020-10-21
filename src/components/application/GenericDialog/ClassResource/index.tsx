import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import Check from '../../DialogField/Check';
import { uuid } from '../../../../helpers';
import Select from '../../DialogField/Select';
import FileUploadLink from '../../DialogField/FileUploadLink';

export const title = 'Class Resource';

export default function ClassResourceDialog({ id = title, onClose = undefined, onSubmit, anchorEl = undefined, setValues = undefined, ...other }) {
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
      submitLabel={'Done'}
      onSubmit={handleSubmit}
      fields={[
        {
          id: 'id',
          hidden: true
        },
        {
          id: 'name',
          label: 'Resource Name',
          placeholder: 'Enter name',
          required: true,
          autoFocus: true,
          xs: 8
        },

        {
          id: 'type',
          label: 'Type',
          Field: Select,
          items: [
            { label: 'PDF', value: 'PDF' },
            //{ label: 'Video', value: 'Video' },
            { label: 'Link', value: 'Link' }
          ],
          disableClearable: true,
          required: true,          
          xs: 4
        },

        {
          id: 'link',
          label: 'Resource Link',
          Field: FileUploadLink,
          http: true,
          placeholder: 'Enter link to resource or upload file',
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
