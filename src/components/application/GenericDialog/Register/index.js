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
import Label from '../../DialogField/Label';
import TextPassword from '../../DialogField/TextPassword';

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
  const { agree, password, confirmationCodeError, resendCodeError, confirmPassword, message } = values;
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

  if (!isValEmpty(resendCodeError)) {
    errors['email'] = resendCodeError;
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

const ResendConfirmationCode = ({ value = false, onChange }) => {
  const handleClick = () => onChange({ target: { value: !value } });
  return (
    <DialogButton variant='link' tooltip='' onClick={handleClick}>
      {value ? 'Back' : 'Resend Verification Code'}
    </DialogButton>
  );
};

export const ViewTermsAndConditions = () => (
  <DialogButton Module={TermsAndConditionsDialog} fullWidth={true} size='small' margin='dense' variant='link' tooltip=''>
    View Terms and Conditions
  </DialogButton>
);

const hidden = ({ confirm, resend }) => confirm || resend;

export default function RegisterDialog({ id = title, onClose }) {
  const [dialogState, setState] = useDialogState(id);
  const { confirm } = dialogState;
  const dialogStateStr = JSON.stringify(dialogState);

  const { handleLogin } = useLogin({ dialogState, setState });

  const handleAdd = React.useCallback(
    (values, setValues) => {
      console.log('Creating account');
      const { email: Email = '', password } = values;
      const email = Email.toLowerCase(); // enusre lower case
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
          /*setTimeout(
            () =>
              alert(
                'Account created successfully.  Please check your email for a confirmation code.  You may need to check your spam and junk folders if you cannot locate the confirmation email.'
              ),
            500
          );*/
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
      const { email: Email = '', password, confirmationCode } = values;
      const email = Email.toLowerCase(); // ensure lower case
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

  const handleResend = React.useCallback(
    (values, setValues) => {
      const { email: Email = '' } = values;
      const email = Email.toLowerCase(); // ensure lower case
      console.log('Requesting resend of verification code');
      Auth.resendSignUp(email)
        .then(() => {
          setState(prev => ({ ...prev, confirm: true, resend: false }));
          setValues(prev => ({ ...prev, confirm: true, resend: false }));
        })
        .catch(err => {
          console.error('Error requesting new verification code');
          console.error(err);
          const newErrors = handleValidation({ ...values, resendCodeError: err.message }, JSON.parse(dialogStateStr));
          setState(prev => ({ ...prev, loading: false, showErrors: true, errors: newErrors }));
        });
    },
    [dialogStateStr, setState]
  );

  const handleSubmit = React.useCallback(
    ({ confirm, resend, ...other }, setValues) => {
      return resend ? handleResend(other, setValues) : confirm ? handleConfirm(other, setValues) : handleAdd(other, setValues);
    },
    [handleResend, handleConfirm, handleAdd]
  );

  return (
    <GenericDialog
      id={id}
      title={values => (values.confirmOnly ? 'Confirm Account' : id)}
      submitLabel={values => (values.resend ? 'Resend Verification Code' : values.confirm ? 'Confirm' : id)}
      onSubmit={handleSubmit}
      onClose={onClose}
      validate={handleValidation}
      fields={[
        {
          id: 'confirmationCodeLabel',
          Field: Label,
          variant: 'caption',
          label:
            'An verification code has been sent to your email address.  If you did not receive a confirmation code please check your junk and spam folders.  You may request a new verification code by clicking the Resend Verification Code link below.',
          hidden: ({ confirm, resend }) => !confirm || resend,
          style: { marginBottom: 8 }
        },
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
          hidden,
          Field: TextPassword
        },
        {
          id: 'confirmPassword',
          label: 'Confirm Password',
          required: true,
          hidden,
          Field: TextPassword
        },
        {
          id: 'confirmationCode',
          label: 'Enter Verification Code Sent to above Email',
          required: confirm ? true : false,
          hidden: ({ confirm, resend }) => !confirm || resend
        },
        {
          id: 'agree',
          Field: Check,
          color: 'primary',
          label: 'I agree to the terms and conditions',
          hidden
        },
        {
          Field: ViewTermsAndConditions,
          hidden
        },

        {
          id: 'confirm',
          label: 'Enter Verification Code',
          Field: EnterConfirmationCode,
          initialValue: false,
          hidden: ({ resend, confirmOnly }) => resend || confirmOnly
        },
        {
          id: 'resend',
          label: 'Resend Verification Code',
          Field: ResendConfirmationCode,
          initialValue: false
        }
      ]}
    />
  );
}
