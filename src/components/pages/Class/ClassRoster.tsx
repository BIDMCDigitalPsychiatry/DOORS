import * as React from 'react';
import { Grid, Box, Divider, Typography } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRouteLayout, useLayout } from '../../layout/hooks';
import { tables } from '../../../database/dbConfig';
import { getClassTitle, isEmpty } from '../../../helpers';
import useFormState from '../../hooks/useFormState';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as CreateGroupDialog from '../../application/GenericDialog/CreateGroup';
import { useFullScreen, useIsInstructorMode } from '../../../hooks';
import { useGroups } from '../../../database/useGroups';
import { useClassData } from '../../../database/useClassData';
import ClassGroup from './ClassGroup';

const Model = tables.classes;
const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

const TitleButton = ({ subtitle = undefined, initialValues = undefined, showArchived, setShowArchived, onClose, disabled }) => (
  <Grid container spacing={3} justify='center'>
    <Grid item>
      <Grid container spacing={1} justify='center'>
        <Grid item xs={12}>
          <DialogButton size='large' onClick={() => setShowArchived(!showArchived)} fullWidth variant='styled'>
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </DialogButton>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
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
  const { data }: any = useClassData();
  const { userId } = data;

  const { name, headline, id } = data;
  const isInstructorMode = useIsInstructorMode();
  const [{ instructor }] = useLayout();

  // TODO: Add logic to retreive class, if no class found, then automatically create the class for the instructor, disable everything until this is done.
  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const { formState, handleUpdate } = useFormState({ Model, validate, onSuccess: handleChangeRouteLayout('/Classes') });
  const { loading } = formState;
  const fullScreen = useFullScreen();

  const { data: groups, handleRefresh, loading: loadingGroups } = useGroups({
    requestParams: instructor && {
      // If instructor mode, then filter groups by instructor's userId
      FilterExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': instructor?.userId
      }
    }
  });

  const [showArchived, setShowArchived] = React.useState(false);

  return (
    <ChildPage
      loading={loading || loadingGroups}
      backLabel='Back to Class'
      onBack={handleChangeRouteLayout('/ClassDashboard', { class: data })}
      title={getClassTitle({ headline, name })}
      subtitle='Class Roster'
      TitleButton={props =>
        isInstructorMode && ( // Only show the create group button for instructors
          <TitleButton
            showArchived={showArchived}
            setShowArchived={setShowArchived}
            subtitle={getClassTitle({ headline, name })}
            initialValues={{ userId, class: data }}
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
          {groups
            .filter(c => showArchived || !c.deleted)
            .map((g, i) => (
              <Grid item key={g?.id} xs={12}>
                <ClassGroup {...g} handleRefreshGroups={handleRefresh} classId={id} mount={i === 0} />
              </Grid>
            ))}
        </Grid>
        {showArchived && groups.filter(c => c.deleted).length === 0 && (
          <>
            <Box m={3}>
              <Typography color='error'>There are no archived groups at this time.</Typography>
            </Box>
          </>
        )}
      </Box>
    </ChildPage>
  );
}
