import * as React from 'react';
import clsx from 'clsx';
import { Grid, Box, Card, CardContent, makeStyles, Divider } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { useUserEmail } from '../../layout/hooks';
import { isEmpty } from '../../../helpers';
import { useValues } from '../../application/GenericDialog/helpers';
import Fields from '../../application/GenericDialog/Fields';
import { useDialogState } from '../../application/GenericDialog/useDialogState';

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  header: {
    background: palette.primary.main,
    color: palette.common.white
  }
}));

const validate = values => {
  const newErrors = {};
  if (isEmpty(values['name'])) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

const getFields = email => [
  { id: 'name', label: 'Name', required: true },
  { id: 'city', label: 'City', xs: 8 },
  { id: 'state', label: 'State', xs: 4 }
];

export default function ProfileSettings({ className = undefined, profile = {}, setProfile, onSuccess, ...rest }) {
  const classes = useStyles();
  const email = useUserEmail(); // Email comes from the auth layer, not the profile layer
  const fields = getFields(email);

  const [state, setState] = useDialogState('My Profile');
  const { loading, submitting } = state;

  const { values, hasChanged, errorCount, errors, mapField } = useValues({
    open: true,
    fields,
    InitialValues: profile,
    state,
    setState,
    validate
  });

  const values_s = JSON.stringify(values);
  const handleSubmit = React.useCallback(() => {
    if (errorCount > 0) {
      setState(prev => ({ ...prev, showErrors: true }));
    } else {
      setProfile && setProfile({ values: JSON.parse(values_s), onSuccess });
      setState(prev => ({ ...prev, showErrors: false }));
    }
  }, [setState, setProfile, values_s, errorCount, onSuccess]);

  const contentProps = {
    fields,
    mapField,
    values
  };

  const inProgress = loading || submitting;
  const disabled = inProgress || errors['loading'];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Fields {...contentProps} />
        </Grid>
      </CardContent>
      <Divider />
      <Box p={2} display='flex' justifyContent='flex-end'>
        <StyledButton disabled={disabled || !hasChanged} onClick={handleSubmit}>
          Save
        </StyledButton>
      </Box>
    </Card>
  );
}
