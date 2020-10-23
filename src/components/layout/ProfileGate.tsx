import * as React from 'react';
import { useLogout, useUserId } from './hooks';
import LoadingGate from './LoadingGate';
import { useProfile } from '../../database/useProfile';
import Profile from '../pages/Profile/Profile';
import { Box } from '@material-ui/core';
import { isEmpty } from '../../helpers';
import Page from '../pages/Page';

export default function ProfileGate({ children }) {
  const userId = useUserId();
  const { profile, setProfile, loading, handleRefresh } = useProfile({ id: userId });
  const handleLogout = useLogout();
  return (
    <LoadingGate loading={loading}>
      {profile === undefined || isEmpty(profile?.name) ? (
        <Box m={3}>
          <Page
            backLabel='Logout'
            onBack={handleLogout}
            title='Welcome to DOORS!'
            subtitle='To get started, please complete your profile and hit save to continue:'
          >
            <LoadingGate loading={loading}>
              <Box m={4}>
                <Profile profile={profile} handleRefresh={handleRefresh} loading={loading} setProfile={setProfile} />
              </Box>
            </LoadingGate>
          </Page>
        </Box>
      ) : (
        children
      )}
    </LoadingGate>
  );
}
