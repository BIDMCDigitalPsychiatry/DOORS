import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout, useUserId } from '../../../layout/hooks';
import CreateNewClassButton from './CreateNewClassButton';
import useClassesByUserId from '../useClassesByUserId';
import DialogButton from '../../../application/GenericDialog/DialogButton';

export default function AdminClasses() {
  const userId = useUserId();

  const { data, handleRefresh, loading } = useClassesByUserId({ userId, parentUserId: userId });

  const myClasses = data.filter(d => d.userId === userId);
  const childClasses = data.filter(d => d.parentUserId === userId);

  const changeRouteLayout = useHandleChangeRouteLayout();

  const [showArchived, setShowArchived] = React.useState(false);

  const Buttons = React.useCallback(() => {
    return (
      <Grid container spacing={3}>
        <Grid item>
          <DialogButton size='large' onClick={() => setShowArchived(!showArchived)} fullWidth variant='styled'>
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </DialogButton>
        </Grid>

        <Grid item>
          <CreateNewClassButton />
        </Grid>
      </Grid>
    );
  }, [showArchived]);

  return (
    <Page title='Administrator Classes' loading={loading} ActionButton={Buttons}>
      <Grid container spacing={3}>
        {myClasses.length === 0 && (
          <Grid item>
            <Box mt={2}>
              <Typography color='error'>No classes found, click the Create New Class button to add a class.</Typography>
            </Box>
          </Grid>
        )}
        {showArchived && myClasses.filter(c => c.deleted).length === 0 && (
          <>
            <Box m={3}>
              <Typography>There are no archived classes at this time.</Typography>
            </Box>
          </>
        )}
        {[
          myClasses
            .filter(c => (showArchived && c.deleted) || (!showArchived && !c.deleted))
            .map((c, i) => (
              <Grid key={[c.id, c.title, i].join('-')} item lg={3} sm={6} xs={12}>
                <Class
                  {...c}
                  buttonLabel='View'
                  showUpdated={true}
                  onClick={changeRouteLayout('/ClassDashboard', {
                    instructor: undefined, // Reset instructor to ensure the class roster isn't visible for admin classes
                    class: c
                  })}
                  childClasses={childClasses.filter(cc => cc.parentClassId === c.id)}
                  showChildClasses={true} // show even when there are no child classes for min height purposes
                  canArchive={true}
                  onRefresh={handleRefresh}
                />
              </Grid>
            ))
        ]}
      </Grid>
    </Page>
  );
}
