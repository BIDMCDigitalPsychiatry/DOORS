import * as React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSettings from './ProfileSettings';
import ProfileDetails from './ProfileDetails';
import Page from './Page';

export default function Profile() {
  const user = { email: 'test@test.com', name: 'Test User', city: 'Test City', state: 'Test State' };
  return (
    <Page title='My Profile'>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <ProfileDetails user={user} />
        </Grid>
        <Grid item lg={8} md={6} xl={9} xs={12}>
          <ProfileSettings user={user} />
        </Grid>
      </Grid>
    </Page>
  );
}
