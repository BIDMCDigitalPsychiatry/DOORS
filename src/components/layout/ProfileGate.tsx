import * as React from 'react';
import { useLogout } from './hooks';
import LoadingGate from './LoadingGate';
import Profile from '../pages/Profile/Profile';
import { Box } from '@material-ui/core';
import { isEmpty } from '../../helpers';
import Page from '../pages/Page';
import useProfileEmailAutoUpdate from './useProfileEmailAutoUpdate';
import { makeStyles, createStyles } from '@material-ui/core';
import { useHeight } from './hooks';
import { useContentPadding, useFullScreen } from '../../hooks';
import { useProfile } from '../../database/useProfile';

const useStyles = makeStyles(({ breakpoints, palette, transitions, layout }: any) =>
  createStyles({
    root: {
      display: 'static'
    },
    content: ({ leftDrawerOpen }) => ({
      flexGrow: 1,
      backgroundColor: palette.common.white,
      marginLeft: leftDrawerOpen ? layout.leftDrawerWidth : 0,
      [breakpoints.down('sm')]: {
        marginLeft: 0,
        flexShrink: 0
      },
      transition: transitions.create(['margin'], {
        easing: transitions.easing.easeOut,
        duration: transitions.duration.enteringScreen
      })
    }),
    innerContent: ({ overflow = 'auto', contentHeight, contentPadding, padInnerContent = true }) => ({
      height: contentHeight - (!padInnerContent ? 0 : contentPadding * 2 + 1),
      overflow,
      padding: padInnerContent ? contentPadding : 0,
      color: palette.primary.dark
    }),
    toolbar: ({ appBarHeight }: any) => ({
      background: palette.white,
      height: appBarHeight
    })
  })
);

export default function ProfileGate({ children }) {
  const { profile, setProfile, loading, handleRefresh } = useProfile();
  useProfileEmailAutoUpdate();
  const handleLogout = useLogout();

  const height = useHeight();
  const fullScreen = useFullScreen();

  const contentPadding = useContentPadding();
  const classes = useStyles({
    contentPadding,
    padInnerContent: true,
    overflow: 'auto',
    contentHeight: height,
    appBarHeight: 0,
    fullScreen
  });

  return (
    <LoadingGate loading={loading}>
      {profile === undefined || isEmpty(profile?.name) ? (
        <div data-testid='app-container' className={classes.root}>
          <main className={classes.content}>
            <div className={classes.innerContent}>
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
            </div>
          </main>
        </div>
      ) : (
        children
      )}
    </LoadingGate>
  );
}
