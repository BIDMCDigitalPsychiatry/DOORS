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
import { useFullScreen } from '../../../hooks';

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

  const created = new Date().getTime();
  const fullScreen = useFullScreen();

  const groups = [
    { name: 'Group 1', location: 'Test Location 1', type: 'On Line', created },
    { name: 'Group 2', location: 'Test Location 2', type: 'On Line', created },
    { name: 'Group 3', location: 'Test Location 3', type: 'On Line', created },
    { name: 'Group 4', location: 'Test Location 4', type: 'On Line', created },
    { name: 'Group 5', location: 'Test Location 5', type: 'On Line', created }
  ];

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
        <Grid container style={{ padding: !fullScreen ? 24 : 8 }} spacing={3}>
          {groups.map(g => (
            <Grid item xs={12}>
              <Group {...g} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ChildPage>
  );
}
