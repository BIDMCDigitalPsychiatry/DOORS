import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout } from '../../../layout/hooks';
import CreateNewClassButton from './CreateNewClassButton';
import useInstructorClasses from '../useInstructorClasses';
import useClasses from '../useClasses';

export default function InstructorClasses() {
  const { data: instructorClasses } = useInstructorClasses();
  const { data: adminClasses } = useClasses();
  const notAddedClasses = adminClasses.filter(ac => !instructorClasses.find(ic => ic.classId === ac.id));

  const changeRouteLayout = useHandleChangeRouteLayout();

  return (
    <Page title='My Classes (Instructor)' ActionButton={CreateNewClassButton}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box pt={1} pb={1}>
            <Typography
              variant='body2'
              color='error'
            >{`There are ${notAddedClasses.length} admin classes which are not included in your available classes.  You may add them by clicking the Create From Existing button.`}</Typography>
          </Box>
        </Grid>
        {[
          instructorClasses.map(c => (
            <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
              <Class
                {...c}
                buttonLabel='View'
                onClick={changeRouteLayout('/ClassDashboard', {
                  class: c
                })}
              />
            </Grid>
          ))
        ]}
      </Grid>
    </Page>
  );
}
