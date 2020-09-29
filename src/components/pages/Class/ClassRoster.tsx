import * as React from 'react';
import { Grid, Box, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import { tables } from '../../../database/dbConfig';
import { useLocationData } from '../../../database/useLocationData';
import { getClassTitle, isEmpty } from '../../../helpers';
import useFormState from '../../hooks/useFormState';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as CreateGroupDialog from '../../application/GenericDialog/CreateGroup';
import Group from './Group';
import { useFullScreen } from '../../../hooks';
import { useGroups } from '../../../database/useGroups';

const Model = tables.classes;
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
        Add Existing Group
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
  const { formState, handleUpdate } = useFormState({ Model, validate, onSuccess: handleChangeRoute('/Classes') });
  const { loading } = formState;
  const fullScreen = useFullScreen();
  const { data: groups } = useGroups();

  return (
    <ChildPage
      backLabel='Back to Class'
      onBack={handleChangeRoute('/ClassDashboard', data)}
      title={getClassTitle({ headline, name })}
      subtitle='Class Roster'
      TitleButton={props => (
        <TitleButton subtitle={getClassTitle({ headline, name })} initialValues={{ class: data }} disabled={loading} onClick={handleUpdate(data)} {...props} />
      )}
    >
      <Box mt={2}>
        <Divider />
        <Grid container style={{ padding: !fullScreen ? 24 : 8 }} spacing={3}>
          {groups.map((g, i) => (
            <Grid item key={g?.id} xs={12}>
              <Group {...g} mount={i === 0} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ChildPage>
  );
}
