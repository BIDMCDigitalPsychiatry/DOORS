import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import { Divider } from '@material-ui/core';

export const title = 'Get In Touch';

export const MarginDivider = () => <Divider style={{ marginTop: 8, marginBottom: 8 }} />;

export default function HelpDialog({ id = title, ...other }) {
  const handleSubmit = React.useCallback(({ name, email, message }, setValues) => {
    alert('To be implemented');
  }, []);

  return (
    <GenericDialog
      id={id}
      title={id}
      submitLabel={'Send'}
      onSubmit={handleSubmit}
      fields={[
        {
          label: 'If you have any questions or comments about the program, send a message to the program administrators.',
          Field: Label
        },
        {
          Field: MarginDivider
        },
        {
          id: 'name',
          label: 'Full Name',
          required: true
        },
        {
          id: 'email',
          label: 'Email',
          required: true,
          email: true
        },
        {
          id: 'message',
          label: 'Your Message',
          required: true,
          multiline: true,
          rows: 6,
          placeholder: 'Enter your message'
        }
      ]}
      {...other}
    />
  );
}
