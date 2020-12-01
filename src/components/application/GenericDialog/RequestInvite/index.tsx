import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { useDialogState } from '../useDialogState';
import { sendInviteRequestEmail } from '../../../layout/sendInviteRequestEmail';

export const title = 'Request an Invite';

export default function RequestInviteDialog({ id = title, onClose }) {
  const [, setState] = useDialogState(id);
  React.useEffect(() => {
    setState({ loading: true });
  }, [setState]);

  const handleSubmit = React.useCallback(
    values => {
      const { email } = values;
      setState(prev => ({ ...prev, loading: true }));
      email &&
        sendInviteRequestEmail({
          email,
          onSuccess: () => {
            setState(prev => ({ ...prev, loading: false, open: false }));
            setTimeout(
              () => alert('The program administrators have been notified of your invite request.  Once approved you will receive an invite link via email.'),
              500
            );
          }
        });
    },
    [setState]
  );

  return (
    <GenericDialog
      id={id}
      hasChanged={true} // Don't require a changed value
      title={id}
      submitLabel='Request Invite'
      onSubmit={handleSubmit}
      onClose={onClose}
      fields={[
        {
          label: `Please enter your email to request an invite:`,
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
