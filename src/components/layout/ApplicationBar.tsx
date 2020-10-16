import * as React from 'react';
import { makeStyles, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../images/logo.svg';
import { useAppBarHeightRef, useChangeRoute, useLayout, useLeftDrawer, useLogout } from './hooks';
import { useCanChangeUserType, useSignedIn, useFullScreen, useContentPadding } from '../../hooks';
import { beta } from '../../constants';
import TabSelectorToolBar from '../general/TabSelector/TabSelectorToolBar';
import * as Icons from '@material-ui/icons';
import useTabSelector from '../application/Selector/useTabSelector';
import useTabs from './useTabs';
import * as HelpDialog from '../application/GenericDialog/Help';
import { useDialogState } from '../application/GenericDialog/useDialogState';
import { renderDialogModule } from '../application/GenericDialog/DialogButton';
import { defaultUserState } from './store';

const useStyles = makeStyles(({ breakpoints, palette, zIndex, layout }: any) =>
  createStyles({
    appBar: ({ contentPadding }: any) => ({
      zIndex: zIndex.drawer + 1,
      paddingTop: beta ? layout.footerheight : 0,
      color: palette.primary.main,
      background: palette.common.white,
      paddingLeft: contentPadding,
      paddingRight: contentPadding
    }),
    appBarFullScreen: {
      paddingTop: beta ? layout.footerheight : 0,
      background: palette.common.white,
      color: palette.primary.dark
    },
    logo: {
      paddingLeft: 8,
      paddingRight: 16,
      height: layout.toolbarheight,
      [breakpoints.down('xs')]: {
        display: 'none'
      },
      cursor: 'pointer'
    },
    active: {
      backgroundColor: palette.primary.dark
    },
    toolbar: {
      background: palette.white
    },
    menuButton: {
      marginLeft: 0,
      color: palette.primary.main,
      [breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
);

const tabSelectorId = 'AppBar';
const AppBarTabSelector = props => {
  const { tabs } = useTabs();
  return <TabSelectorToolBar id={tabSelectorId} tabs={tabs} {...props} />;
};

export default function ApplicationBar() {
  const contentPadding = useContentPadding();
  const classes = useStyles({ contentPadding });
  const signedIn = useSignedIn();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [{ prevId }, setState] = useDialogState(HelpDialog.title);
  const { tabs, tabs_s } = useTabs();
  const [, setTabSelector] = useTabSelector(tabSelectorId);

  const onLogout = useLogout();

  const [, setLeftDrawerOpen] = useLeftDrawer();
  const handleOpenLeftDrawer = React.useCallback(() => setLeftDrawerOpen(true), [setLeftDrawerOpen]);

  const handleLogout = React.useCallback(() => {
    onLogout();
    setAnchorEl(null);
  }, [setAnchorEl, onLogout]);

  const changeRoute = useChangeRoute();

  const handleTabChange = React.useCallback(
    value => {
      const { id, route } = JSON.parse(tabs_s).find(t => t.id === value);
      if (id === 'Help') {
        setState(prev => ({ ...prev, open: true })); // Open the dialog, track previous tab
      } else {
        changeRoute(route);
        setState(prev => ({ prevId: id })); // Open the dialog, track previous tab
      }
    },
    [changeRoute, setState, tabs_s]
  );

  const defaultTabId = tabs[0].id;
  const defaultTabRoute = tabs[0].route;

  const handleLogoClick = React.useCallback(() => {
    setTabSelector(defaultTabId);
    changeRoute(defaultTabRoute);
  }, [setTabSelector, changeRoute, defaultTabId, defaultTabRoute]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleHelpClose = React.useCallback(() => {
    setTabSelector({ value: prevId });
  }, [setTabSelector, prevId]);

  const fullScreen = useFullScreen('xs');
  const [, , leftDrawerEnabled] = useLeftDrawer();

  const [, setLayout] = useLayout();
  const resetUserType = React.useCallback(() => {
    setLayout(defaultUserState);
  }, [setLayout]);

  const canChangeUserType = useCanChangeUserType();

  return (
    <AppBar ref={useAppBarHeightRef()} position='fixed' color='inherit' elevation={1} className={fullScreen ? classes.appBarFullScreen : classes.appBar}>
      {renderDialogModule({ ...HelpDialog, onClose: handleHelpClose })}
      <Toolbar className={classes.toolbar} disableGutters={true}>
        {leftDrawerEnabled && (
          <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleOpenLeftDrawer} className={classes.menuButton}>
            <Icons.Menu />
          </IconButton>
        )}
        <Grid container alignItems='center' spacing={0}>
          <Grid item>
            <img className={classes.logo} src={logo} alt='logo' onClick={handleLogoClick} />
          </Grid>
          <Grid item xs style={{ marginLeft: 4, marginRight: 4, minWidth: 0 }}>
            <AppBarTabSelector onChange={handleTabChange} />
          </Grid>
          <Grid item>
            <Grid container justify='flex-end' alignItems='center'>
              <Grid item>
                <IconButton color='inherit' aria-label='account of current user' aria-haspopup='true' onClick={handleMenu}>
                  {signedIn ? <Icons.AccountCircleTwoTone /> : <Icons.AccountCircle />}
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ style: { paddingTop: signedIn ? 0 : undefined } }}
                >
                  {[
                    { label: 'Change User Type', onClick: resetUserType, filter: canChangeUserType },
                    { label: 'Sign Out', onClick: handleLogout, filter: true }
                  ]
                    .filter(({ filter }) => filter)
                    .map(({ label, onClick }) => (
                      <MenuItem key={label} onClick={onClick}>
                        {label}
                      </MenuItem>
                    ))}
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
