import * as React from 'react';
import { createStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { useAppBarHeight, useHeight, useLeftDrawer } from './hooks';
import LeftDrawerContent from './LeftDrawerContent';
import { useFullScreen } from '../../hooks';

const useStyles = makeStyles(({ palette, breakpoints, layout }: any) =>
  createStyles({
    drawer: {
      [breakpoints.up('sm')]: {
        width: layout.leftDrawerWidth,
        flexShrink: 0
      }
    },
    drawerPaper: ({ height, appBarHeight }: any) => ({
      padding: 8,
      marginTop: appBarHeight,
      width: layout.leftDrawerWidth,
      height: height - (appBarHeight + layout.footerheight),
      background: palette.primary.light,
      color: palette.common.white,
      [breakpoints.down('sm')]: {
        height: '100%'
      }
    }),
    drawerPaperTemporary: {
      width: layout.leftDrawerWidth
    }
  })
);

const LeftDrawer = () => {
  const height = useHeight();
  const fullScreen = useFullScreen();
  const appBarHeight = useAppBarHeight();
  const classes = useStyles({ height, appBarHeight });
  const [leftDrawer, setLeftDrawer] = useLeftDrawer();
  const handleLeftDrawerClose = React.useCallback(() => setLeftDrawer(false), [setLeftDrawer]);

  return (
    <nav className={classes.drawer} aria-label='navigation drawer'>
      <Drawer
        variant='temporary'
        open={fullScreen && leftDrawer}
        onClose={handleLeftDrawerClose}
        classes={{
          paper: classes.drawerPaperTemporary
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <LeftDrawerContent />
      </Drawer>
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant='persistent'
        open={leftDrawer}
      >
        <LeftDrawerContent />
      </Drawer>
    </nav>
  );
};

export default LeftDrawer;
