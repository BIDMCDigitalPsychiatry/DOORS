import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import CreateNewClassButton from './CreateNewClassButton';
import useClassesByUserId from '../useClassesByUserId';
import DialogButton from '../../../application/GenericDialog/DialogButton';
import useTableRow from '../../../../database/useTableRow';
import { tables } from '../../../../database/dbConfig';
import { uuid } from '../../../../helpers';
import { useIsAdminMode } from '../../../../hooks';

export default function InstructorClasses() {
  const isAdminMode = useIsAdminMode();
  const [{ back, instructor }] = useLayout();
  const { userId, parentId } = instructor;

  const { data: instructorClasses, handleRefresh: refreshInstructor } = useClassesByUserId({ userId });
  const { data: adminClasses, handleRefresh: refreshAdmin } = useClassesByUserId({ userId: parentId });

  const notAddedClasses = adminClasses.filter(ac => !ac.deleted && !instructorClasses.find(ic => ic.parentClassId === ac.id || ic.id === ac.id));
  const notAddedClasses_str = JSON.stringify(notAddedClasses);

  const handleRefresh = React.useCallback(() => {
    refreshInstructor();
    refreshAdmin();
  }, [refreshInstructor, refreshAdmin]);

  const changeRouteLayout = useHandleChangeRouteLayout();

  const { setRow } = useTableRow({ Model: tables.classes });

  const handleAdd = React.useCallback(() => {
    const classes = JSON.parse(notAddedClasses_str);
    classes.forEach((c, i) => {
      const { created, updated, deleted, ...other } = c;
      const id = uuid();
      const now = new Date().getTime();
      setRow({
        id,
        values: { ...other, id, parentUserId: c.userId, parentClassId: c.id, userId, created: now, updated: now },
        onSuccess: i === classes.length - 1 && handleRefresh
      });
    });
  }, [setRow, handleRefresh, notAddedClasses_str, userId]);

  const [showArchived, setShowArchived] = React.useState(false);

  const Buttons = React.useCallback(() => {
    return (
      <Grid container spacing={3}>
        <Grid item>
          <DialogButton size='large' onClick={() => setShowArchived(!showArchived)} fullWidth variant='styled'>
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </DialogButton>
        </Grid>
        {!isAdminMode && (
          <Grid item>
            <CreateNewClassButton />
          </Grid>
        )}
      </Grid>
    );
  }, [isAdminMode, showArchived]);

  return (
    <Page title='Instructor Classes' ActionButton={Buttons} backLabel={back?.label} onBack={back?.route && changeRouteLayout(back.route)}>
      <Grid container spacing={3}>
        {!showArchived && notAddedClasses.length > 0 && (
          <Grid item xs={12}>
            <Box pt={1} pb={1}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant='body2' color='error'>
                    {notAddedClasses.length === 1 
                      ? `There is ${notAddedClasses.length} admin class which is not included in your available classes.`
                      : `There are ${notAddedClasses.length} admin classes which are not included in your available classes.`}
                  </Typography>
                </Grid>
                <Grid item>
                  <DialogButton onClick={handleAdd} variant='link' underline='always'>
                    Click here to auto import.
                  </DialogButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
        {showArchived && instructorClasses.filter(c => c.deleted).length === 0 && (
          <>
            <Box m={3}>
              <Typography>There are no archived classes at this time.</Typography>
            </Box>
          </>
        )}
        {instructorClasses
          .filter(c => (showArchived && c.deleted) || (!showArchived && !c.deleted))
          .map(c => (
            <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
              <Class
                {...c}
                buttonLabel='View'
                showUpdated={true}
                onClick={changeRouteLayout('/ClassDashboard', {
                  class: c
                })}
                canArchive={true}
                onRefresh={handleRefresh}
              />
            </Grid>
          ))}
      </Grid>
    </Page>
  );
}
