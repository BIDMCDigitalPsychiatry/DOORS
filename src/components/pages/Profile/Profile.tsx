import * as React from 'react';
import { Grid } from '@material-ui/core';
import ProfileSettings from './ProfileSettings';
import ProfileDetails from './ProfileDetails';
import Page from '../Page';
import { useProfile } from '../../../database/useProfile';
import { useUserId } from '../../layout/hooks';

export const ProfileProvider = () => {
  const id = useUserId();
  const { profile, setProfile, handleRefresh, loading } = useProfile({ id });
  return <Profile profile={profile} setProfile={setProfile} handleRefresh={handleRefresh} loading={loading} />;
};

export default function Profile({ profile, setProfile, handleRefresh, loading, showDescriptions = false }) {
  return (
    <Page title='My Profile' loading={loading}>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <ProfileDetails profile={profile} setProfile={setProfile} onSuccess={handleRefresh} />
        </Grid>
        <Grid item lg={8} md={6} xl={9} xs={12}>
          <ProfileSettings showDescriptions={showDescriptions} profile={profile} setProfile={setProfile} onSuccess={handleRefresh} />
        </Grid>
      </Grid>
    </Page>
  );
}
