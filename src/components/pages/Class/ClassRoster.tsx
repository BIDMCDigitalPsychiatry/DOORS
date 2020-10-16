import * as React from 'react';
import { Grid, Box, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import { tables } from '../../../database/dbConfig';
import { getClassTitle, isEmpty } from '../../../helpers';
import useFormState from '../../hooks/useFormState';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as CreateGroupDialog from '../../application/GenericDialog/CreateGroup';
import Group from './Group';
import { useFullScreen, useIsInstructorMode } from '../../../hooks';
import { useGroups } from '../../../database/useGroups';
import { useClassData } from '../../../database/useClassData';

const Model = tables.classesAdmin;
const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

const TitleButton = ({ subtitle = undefined, initialValues = undefined, onClose, disabled }) => (
  <Grid container style={{ width: 270 }} spacing={1} justify='center'>
    <Grid item xs={12}>
      <DialogButton
        Module={CreateGroupDialog}
        onClose={onClose}
        subtitle={subtitle}
        variant='styled'
        size='large'
        fullWidth
        disabled={disabled}
        initialValues={initialValues}
      >
        Create Group
      </DialogButton>
    </Grid>
  </Grid>
);

export default function ClassRoster() {
  const { data }: any = useClassData({ Model });
  const { name, headline } = data;
  const isInstructorMode = useIsInstructorMode();

  // TODO: Add logic to retreive class, if no class found, then automatically create the class for the instructor, disable everything until this is done.
  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const { formState, handleUpdate } = useFormState({ Model, validate, onSuccess: handleChangeRouteLayout('/Classes') });
  const { loading } = formState;
  const fullScreen = useFullScreen();
  const { data: groups, handleRefresh } = useGroups();

  return (
    <ChildPage
      backLabel='Back to Class'
      onBack={handleChangeRouteLayout('/ClassDashboard', { class: data })}
      title={getClassTitle({ headline, name })}
      subtitle='Class Roster'
      TitleButton={props =>
        isInstructorMode && ( // Only show the create group button for instructors
          <TitleButton
            subtitle={getClassTitle({ headline, name })}
            initialValues={{ class: data }}
            disabled={loading}
            onClose={handleRefresh}
            onClick={handleUpdate(data)}
            {...props}
          />
        )
      }
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
