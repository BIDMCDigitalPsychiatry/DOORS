import * as React from 'react';
import clsx from 'clsx';
import { Grid, Box, Card, CardContent, makeStyles, Divider } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { useUserEmail } from '../../layout/hooks';
import { isEmpty } from '../../../helpers';
import { useValues } from '../../application/GenericDialog/helpers';
import Fields from '../../application/GenericDialog/Fields';
import { useDialogState } from '../../application/GenericDialog/useDialogState';
import Label from '../../application/DialogField/Label';
import YesNo from '../../application/DialogField/YesNo';
import MultiSelectCheck from '../../application/DialogField/MultiSelectCheck';
import VinfenSelector from '../../application/DialogField/VinfenSelector';

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

const margin = 16;

const getFields = (email, showDescriptions) => [
  {
    Field: Label,
    hidden: !showDescriptions,
    label:
      'Create a username (please do not use any personally identifiable information when creating your username. This includes your first or last name or your birthdate):'
  },
  { id: 'name', label: 'Username', required: true },
  { Field: Divider, hidden: !showDescriptions },
  { id: 'vinfenServices', label: 'Do you work at or receive services from Vinfen?', Field: YesNo, required: true },
  { Field: Divider, hidden: !showDescriptions },
  { id: 'type', label: 'Are you a clinician, a person served by Vinfen or other?', Field: VinfenSelector, required: true },
  {
    hidden: values => !showDescriptions || values?.type !== 'Person Served by Vinfen',
    style: { marginLeft: margin },
    label: 'What programs are you affiliated with? Please check all programs that apply:',
    Field: Label
  },
  {
    id: 'affiliatedProgram',
    label: 'Affiliated Vinfen Programs',
    Field: MultiSelectCheck,
    style: { marginLeft: margin },
    required: true,
    hidden: values => values?.type !== 'Person Served by Vinfen',
    items: [
      'I go to a Clubhouse',
      'I go to a Recovery Learning Center',
      'I go to an outpatient clinic',
      'I live in a Vinfen group home',
      'I receive services from a Vinfen team (outreach worker, peer support, housing support, etc)',
      'Other'
    ].map(label => ({ value: label, label }))
  },

  {
    hidden: values => !showDescriptions || values?.type !== 'Clinician',
    style: { marginLeft: margin },
    label: 'What Hospital, Clinic, or community based mental health program are you affiliated with?',
    //hidden: !showDescriptions,
    Field: Label
  },
  {
    id: 'clinicianAffiliation',
    hidden: values => values?.type !== 'Clinician',
    style: { marginLeft: margin },
    label: 'Clinical Affiliation',
    required: true
  }
];

export default function ProfileSettings({ showDescriptions = false, className = undefined, profile = {}, setProfile, onSuccess, ...rest }) {
  const classes = useStyles();
  const email = useUserEmail(); // Email comes from the auth layer, not the profile layer
  const fields = getFields(email, showDescriptions);

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
