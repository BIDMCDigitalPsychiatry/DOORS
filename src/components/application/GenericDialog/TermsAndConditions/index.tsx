import React from 'react';
import GenericDialog from '../GenericDialog';
import TermsAndConditions from '../../../pages/TermsAndConditions';

export const title = 'Terms and Conditions';

export default function TermsAndConditionsDialog({ id = title, onClose = undefined, ...other }) {
  return (
    <GenericDialog
      id={id}
      title={null}
      submitLabel={null}
      cancelLabel={'Close'}
      maxWidth='md'
      fields={[
        {
          Field: TermsAndConditions
        }
      ]}
      {...other}
    />
  );
}
