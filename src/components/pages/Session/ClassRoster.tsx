import * as React from 'react';
import { Grid, Box, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import { tables } from '../../../database/dbConfig';
import { useLocationData } from '../../../database/useLocationData';
import { getSessionTitle, isEmpty } from '../../../helpers';
import useFormState from '../../hooks/useFormState';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as CreateGroupDialog from '../../application/GenericDialog/CreateGroup';
import Group from './Group';

const Model = tables.sessions;
const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

const TitleButton = ({ subtitle = undefined, initialValues = undefined, disabled }) => (
  <Grid container style={{ width: 270 }} spacing={1} justify='center'>
    <Grid item xs={12}>
      <DialogButton Module={CreateGroupDialog} subtitle={subtitle} variant='styled' size='large' fullWidth disabled={disabled} initialValues={initialValues}>
        Create Group
      </DialogButton>
    </Grid>
    <Grid item xs={12}>
      <DialogButton subtitle={subtitle} variant='styled' styledVariant='secondary' size='large' fullWidth disabled={disabled}>
        Enter Existing Group ID
      </DialogButton>
    </Grid>
    <Grid item xs={12}>
      <DialogButton subtitle={subtitle} variant='styled' styledVariant='text' size='large' fullWidth disabled={disabled}>
        View All Groups
      </DialogButton>
    </Grid>
  </Grid>
);

export default function ClassRoster() {
  const { data }: any = useLocationData({ Model });
  const { name, headline } = data;

  // TODO: Add logic to retreive class, if no class found, then automatically create the class for the instructor, disable everything until this is done.

  const handleChangeRoute = useHandleChangeRoute();

  const { formState, handleUpdate } = useFormState({ Model, validate, onSuccess: handleChangeRoute('/Sessions') });
  const { loading } = formState;

  return (
    <ChildPage
      backLabel='Back to Session'
      onBack={handleChangeRoute('/SessionDashboard', data)}
      title={getSessionTitle({ headline, name })}
      subtitle='Class Roster'
      TitleButton={props => (
        <TitleButton
          subtitle={getSessionTitle({ headline, name })}
          initialValues={{ session: data }}
          disabled={loading}
          onClick={handleUpdate(data)}
          {...props}
        />
      )}
    >
      <Box mt={2}>
        <Divider />
        <Group />
      </Box>
    </ChildPage>
  );
}
