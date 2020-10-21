import * as React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSettings from './ProfileSettings';
import ProfileDetails from './ProfileDetails';
import Page from '../Page';
import { useProfile } from '../../../database/useProfile';
import { useUserId } from '../../layout/hooks';

export default function Profile() {
  const id = useUserId();
  const { profile, setProfile, handleRefresh, loading } = useProfile({ id });
  return (
    <Page title='My Profile' loading={loading}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <ProfileDetails profile={profile} setProfile={setProfile} onSuccess={handleRefresh} />
        </Grid>
        <Grid item lg={8} md={6} xl={9} xs={12}>
          <ProfileSettings profile={profile} setProfile={setProfile} onSuccess={handleRefresh} />
        </Grid>
      </Grid>
    </Page>
  );
}
