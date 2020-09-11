import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { sendInstructorInvite } from './helpers';

export const title = 'Add Instructor';

export default function AddInstructorDialog({ id = title }) {
  const handleSubmit = React.useCallback(({ email }, setValues) => {
    // TODO: Add logic to invite user and enter invite code in database
    console.log(email);
    sendInstructorInvite({ email });
  }, []);

  return (
    <GenericDialog
      id={id}
      title={id}
      submitLabel='Send Invite'
      onSubmit={handleSubmit}
      fields={[
        {
          label: `Enter instructor's email below and we will send them a link to activate their account.`,
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
