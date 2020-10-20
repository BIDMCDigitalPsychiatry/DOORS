import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout, useUserId } from '../../../layout/hooks';
import CreateNewClassButton from './CreateNewClassButton';
import useClassesByUserId from '../useClassesByUserId';

export default function AdminClasses() {
  const userId = useUserId();

  const { data } = useClassesByUserId({ userId, parentUserId: userId });

  const myClasses = data.filter(d => d.userId === userId);
  const childClasses = data.filter(d => d.parentUserId === userId);

  const changeRouteLayout = useHandleChangeRouteLayout();

  return (
    <Page title='Administrator Classes' ActionButton={CreateNewClassButton}>
      <Grid container spacing={3}>
        {myClasses.length === 0 && (
          <Grid item>
            <Box mt={2}>
              <Typography color='error'>No classes found, click the Create New Class button to add a class.</Typography>
            </Box>
          </Grid>
        )}
        {[
          myClasses.map((c, i) => (
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
              />
            </Grid>
          ))
        ]}
      </Grid>
    </Page>
  );
}
