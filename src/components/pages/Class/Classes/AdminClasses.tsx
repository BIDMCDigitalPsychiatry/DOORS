import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout, useUserId } from '../../../layout/hooks';
import CreateNewClassButton from './CreateNewClassButton';
import DialogButton from '../../../application/GenericDialog/DialogButton';
import useAdminClasses from '../useAdminClasses';

export default function AdminClasses() {
  const { data, handleRefresh, loading } = useAdminClasses();

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
        {data.length === 0 && (
          <Grid item>
            <Box mt={2}>
              <Typography color='error'>No classes found, click the Create New Class button to add a class.</Typography>
            </Box>
          </Grid>
        )}
        {showArchived && data.filter(c => c.deleted).length === 0 && (
          <>
            <Box m={3}>
              <Typography>There are no archived classes at this time.</Typography>
            </Box>
          </>
        )}
        {[
          data
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
