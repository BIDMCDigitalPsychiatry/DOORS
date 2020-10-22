import React from 'react';
import GenericDialog from '../GenericDialog';
import { bool, copyToLower, isEmpty as isValEmpty } from '../../../../helpers';
import { useDialogState } from '../useDialogState';
import { Auth } from 'aws-amplify';
import DialogButton from '../DialogButton';
import { useLogin } from '../../../layout/hooks';
import Check from '../../DialogField/Check';
import * as TermsAndConditionsDialog from '../../GenericDialog/TermsAndConditions';
import { Grid, Typography } from '@material-ui/core';

const passwordValidator = require('password-validator');
export const title = 'Create New Account';

// create a password schema
const schema = new passwordValidator();

schema.is().min(8).has().uppercase().has().lowercase().has().digits().has().symbols();

const formatPasswordValidateError = errors => {
  const displayErrors = [];
  for (let i = 0; i < errors.length; i++) {
    if (errors[i] === 'min') {
      displayErrors.push('Password length should be a at least 8 characters');
    } else if (errors[i] === 'lowercase') {
      displayErrors.push('Password should contain lowercase letters');
    } else if (errors[i] === 'uppercase') {
      displayErrors.push('Password should contain uppercase letters');
    } else if (errors[i] === 'digits') {
      displayErrors.push('Password should contain digits');
    } else if (errors[i] === 'symbols') {
      displayErrors.push('Password should contain symbols');
    }
  }
  return (
    <Grid container>
      {displayErrors.map(e => (
        <Grid item xs={12}>
          <Typography variant='caption'>{e}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

const handleValidation = (values, dialogState) => {
  const { agree, password, confirmationCodeError, confirmPassword, message } = values;
  var errors = copyToLower(dialogState.errors); // start with server generated errors, ensure all keys start with lowercase letter

  if (password !== confirmPassword) {
    errors['confirmPassword'] = 'Passwords must match.';
    errors['password'] = 'Passwords must match.';
  }

  const validationRulesErrors = schema.validate(password, { list: true });
  if (validationRulesErrors.length > 0) {
    errors['password'] = formatPasswordValidateError(validationRulesErrors);
  }

  if (!isValEmpty(message)) {
    if (message.includes('password') || message.includes('Password')) {
      errors['confirmPassword'] = message;
      errors['password'] = message;
    } else {
      errors['email'] = message;
    }
  }

  if (!isValEmpty(confirmationCodeError)) {
    errors['confirmationCode'] = confirmationCodeError;
  }

  if (bool(agree) !== true) {
    errors['agree'] = 'You must agree to the terms and conditions to proceed.';
  }

  return errors;
};

const EnterConfirmationCode = ({ value = false, onChange }) => {
  const handleClick = () => onChange({ target: { value: !value } });
  return (
    <DialogButton variant='link' tooltip='' onClick={handleClick}>
      {value ? 'Back' : 'Enter Verification Code'}
    </DialogButton>
  );
};

const ViewTermsAndConditions = () => (
  <DialogButton Module={TermsAndConditionsDialog} fullWidth={true} size='small' margin='dense' variant='link' tooltip=''>
    View Terms and Conditions
  </DialogButton>
);

export default function RegisterDialog({ id = title, onClose }) {
  const [dialogState, setState] = useDialogState(id);
  const { confirm } = dialogState;
  const dialogStateStr = JSON.stringify(dialogState);

  const { handleLogin } = useLogin({ dialogState, setState });

  const handleAdd = React.useCallback(
    (values, setValues) => {
      console.log('Creating account');
      const { email, password } = values;
      setState(prev => ({ ...prev, loading: true, showErrors: false, errors: {} }));
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: email
        }
      })
        .then(result => {
          console.log('Succesfully signed up user!');
          setState(prev => ({ ...prev, open: true, loading: false, errors: {} }));
          setValues(prev => ({ ...prev, confirm: true }));
        })
        .catch(err => {
          console.error('Error with Register');
          console.error({ err });
          const newErrors = handleValidation({ ...values, message: err.message }, JSON.parse(dialogStateStr));
          setState(prev => ({ ...prev, showErrors: true, loading: false, errors: newErrors }));
        });
    },
    [dialogStateStr, setState]
  );

  const handleConfirm = React.useCallback(
    values => {
      const { email, password, confirmationCode } = values;
      console.log('Confirming account');
      Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
          console.log('Confirmed account!');
          setState(prev => ({ ...prev, open: false, loading: false, confirm: false }));
          handleLogin({ email, password });
        })
        .catch(err => {
          console.error('Invalid code');
          console.error(err);
          const newErrors = handleValidation({ ...values, confirmationCodeError: err.message }, JSON.parse(dialogStateStr));
          setState(prev => ({ ...prev, loading: false, showErrors: true, errors: newErrors }));
        });
    },
    [dialogStateStr, setState, handleLogin]
  );

  const handleSubmit = React.useCallback(({ confirm, ...other }, setValues) => (confirm ? handleConfirm(other, setValues) : handleAdd(other, setValues)), [
    handleConfirm,
    handleAdd
  ]);

  return (
    <GenericDialog
      id={id}
      title={id}
      submitLabel={values => (values.confirm ? 'Confirm' : id)}
      onSubmit={handleSubmit}
      onClose={onClose}
      validate={handleValidation}
      fields={[
        {
          id: 'email',
          label: 'Email',
          required: true,
          email: true
        },
        {
          id: 'password',
          label: 'Password',
          required: true,
          inputProps: {
            type: 'password'
          },
          hidden: ({ confirm }) => confirm
        },
        {
          id: 'confirmPassword',
          label: 'Confirm Password',
          required: true,
          inputProps: {
            type: 'password'
          },
          hidden: ({ confirm }) => confirm
        },
        {
          id: 'confirmationCode',
          label: 'Enter Verification Code Sent to above Email',
          required: confirm ? true : false,
          hidden: ({ confirm }) => !confirm
        },
        {
          id: 'agree',
          Field: Check,
          color: 'primary',
          label: 'I agree to the terms and conditions',
          hidden: ({ confirm }) => confirm
        },
        {
          Field: ViewTermsAndConditions,
          hidden: ({ confirm }) => confirm
        },
        {
          id: 'confirm',
          label: 'Enter Verification Code',
          Field: EnterConfirmationCode,
          initialValue: false
        }
      ]}
    />
  );
}
