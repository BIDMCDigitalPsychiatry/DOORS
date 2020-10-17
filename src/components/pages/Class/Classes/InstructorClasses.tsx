import * as React from 'react';
import { Grid } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout } from '../../../layout/hooks';
import useCombinedClasses from '../useCombinedClasses';
import CreateNewClassButton from './CreateNewClassButton';

export default function InstructorClasses() {
  // Find all instructors
  const { data } = useCombinedClasses();

  const changeRouteLayout = useHandleChangeRouteLayout();

  return (
    <Page title='Available Classes' ActionButton={CreateNewClassButton}>
      <Grid container spacing={3}>
        {[
          data.map(c => (
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
