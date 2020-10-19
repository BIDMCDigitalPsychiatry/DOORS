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
  const { userId } = instructor;

  const { data: instructorClasses, handleRefresh: refreshInstructor } = useClassesByUserId({ userId });
  const { data: adminClasses, handleRefresh: refreshAdmin } = useClassesByUserId({ userId: instructor?.parentId });

  const notAddedClasses = adminClasses.filter(ac => !instructorClasses.find(ic => ic.parentClassId === ac.id || ic.id === ac.id));
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
      setRow({
        id,
        values: { ...other, id, parentUserId: c.userId, parentClassId: c.id, userId },
        onSuccess: i === classes.length - 1 && handleRefresh
      });
    });
  }, [setRow, handleRefresh, notAddedClasses_str, userId]);

  return (
    <Page
      title='Instructor Classes'
      ActionButton={!isAdminMode && CreateNewClassButton}
      backLabel={back?.label}
      onBack={back?.route && changeRouteLayout(back.route)}
    >
      <Grid container spacing={3}>
        {notAddedClasses.length > 0 && (
          <Grid item xs={12}>
            <Box pt={1} pb={1}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography
                    variant='body2'
                    color='error'
                  >{`There are ${notAddedClasses.length} admin classes which are not included in your available classes.`}</Typography>
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
        {instructorClasses.map(c => (
          <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
            <Class
              {...c}
              buttonLabel='View'
              onClick={changeRouteLayout('/ClassDashboard', {
                class: c
              })}
            />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
