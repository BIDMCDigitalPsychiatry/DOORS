import React from 'react';
import GenericDialog from '../GenericDialog';
import { bool, copyToLower } from '../../../../helpers';
import Check from '../../DialogField/Check';
import { useDialogState } from '../useDialogState';
import ResearchPartAgreement from '../../../pages/ResearchPartyAgreement';

export const title = 'Research Party Agreement';

const validate = (values, dialogState) => {
  const { agree } = values;
  var errors = copyToLower(dialogState.errors); // start with server generated errors, ensure all keys start with lowercase letter

  if (bool(agree) !== true) {
    errors['agree'] = 'You must agree to the terms and conditions to proceed.';
  }

  return errors;
};

export default function ResearchPartyAgreementDialog({ id = title, onSubmit }) {
  const [, setState] = useDialogState(id);
  const handleSubmit = React.useCallback(() => {
    setState({ open: false });
    onSubmit && onSubmit();
  }, [setState, onSubmit]);
  return (
    <GenericDialog
      id={id}
      title={null}
      onSubmit={handleSubmit}
      validate={validate}
      submitLabel='I Agree'
      cancelLabel={'Cancel'}
      maxWidth='md'
      fields={[
        {
          Field: ResearchPartAgreement
        },
        {
          id: 'agree',
          Field: Check,
          color: 'primary',
          style: { marginLeft: 24 },
          label: 'I agree to the terms and conditions above'
        }
      ]}
    />
  );
}
