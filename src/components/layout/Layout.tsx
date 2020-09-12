import * as React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core';
import ApplicationBar from './ApplicationBar';
import Footer from './Footer';
import SnackBar from '../application/SnackBar/SnackBar';
import { useAppBarHeight, useHeight, useLeftDrawer } from './hooks';
import { useLocation } from 'react-router';
import { useContentPadding, useFullScreen } from '../../hooks';
import LeftDrawer from './LeftDrawer';

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
      padding: padInnerContent ? contentPadding : 0
    }),
    toolbar: ({ appBarHeight }: any) => ({
      background: palette.white,
      height: appBarHeight
    })
  })
);

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const height = useHeight();
  const appBarHeight = useAppBarHeight();

  const { layout }: any = useTheme();
  const { noPadPaths, noScrollPaths } = layout;
  const componentsOnPage = [appBarHeight, layout.footerheight];
  var contentHeight = height - componentsOnPage.reduce((t, c) => t + c, 0);
  const [leftDrawerOpen] = useLeftDrawer();
  const fullScreen = useFullScreen();

  const contentPadding = useContentPadding();
  const classes = useStyles({
    contentPadding,
    padInnerContent: noPadPaths.findIndex(p => p === pathname) > -1 ? false : true,
    overflow: noScrollPaths.findIndex(p => p === pathname) > -1 ? 'hidden' : 'auto',
    contentHeight,
    appBarHeight,
    leftDrawerOpen,
    fullScreen
  });

  return (
    <div data-testid='app-container' className={classes.root}>
      <main className={classes.content}>
        <ApplicationBar />
        <LeftDrawer />
        <div className={classes.toolbar} />
        <div className={classes.innerContent}>{children}</div>
        <Footer />
        <SnackBar />
      </main>
    </div>
  );
}
