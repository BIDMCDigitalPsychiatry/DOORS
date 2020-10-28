import * as React from 'react';
import { useLogout } from './hooks';
import LoadingGate from './LoadingGate';
import Profile from '../pages/Profile/Profile';
import { Box } from '@material-ui/core';
import { isEmpty } from '../../helpers';
import Page from '../pages/Page';
import useProfileEmailAutoUpdate from './useProfileEmailAutoUpdate';

export default function ProfileGate({ children }) {
  const { profile, setProfile, loading, handleRefresh } = useProfileEmailAutoUpdate();
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
                <Profile showDescriptions={true} profile={profile} handleRefresh={handleRefresh} loading={loading} setProfile={setProfile} />
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
