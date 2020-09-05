import * as React from 'react';
import { makeStyles, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../images/logo.png';
import { useAppBarHeightRef, useHandleChangeRoute, useChangeRoute, useLogout } from './hooks';
import { publicUrl } from '../../helpers';
import { useSignedIn, useFullScreen } from '../../hooks';
import { beta } from '../../constants';
import TabSelectorToolBar from '../general/TabSelector/TabSelectorToolBar';
import * as Icons from '@material-ui/icons';
import { useSetUser } from './hooks';

const useStyles = makeStyles(({ breakpoints, palette, layout }: any) =>
  createStyles({
    appBar: {
      paddingTop: beta ? layout.footerheight : 0,
      color: palette.primary.main,
      background: palette.common.white,
      paddingLeft: layout.contentpadding,
      paddingRight: layout.contentpadding
    },
    appBarFullScreen: {
      paddingTop: beta ? layout.footerheight : 0,
      background: palette.common.white,
      color: palette.primary.dark,
    },
    logo: {
      paddingLeft: 8,
      paddingRight: 16,
      height: layout.toolbarheight - 16,
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
  })
);

const tabs = [
  { id: 'My Classes', icon: Icons.Apps, route: '/Classes' },
  { id: 'My Calendar', icon: Icons.Event, route: '/Calendar' },
  { id: 'My Profile', icon: Icons.AccountBox, route: '/Profile' },
  { id: 'Help', icon: Icons.Help, route: '/Help' },
];

const AppBarTabSelector = props => <TabSelectorToolBar id='AppBar' tabs={tabs} {...props} />;

export default function ApplicationBar() {
  const classes = useStyles();
  const handleChangeRoute = useHandleChangeRoute();
  const signedIn = useSignedIn();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const setUser = useSetUser();
  const onLogout = useLogout();

  const handleLogout = React.useCallback(() => {
    setUser(undefined); // Reset user information
    onLogout();
    setAnchorEl(null);
  }, [setUser, setAnchorEl, onLogout]);

  const changeRoute = useChangeRoute();

  const handleTabChange = React.useCallback(
    value => {
      const { route } = tabs.find(t => t.id === value);
      changeRoute(publicUrl(route));
    },
    [changeRoute]
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fullScreen = useFullScreen('xs');

  return (
    <AppBar ref={useAppBarHeightRef()} position='fixed' color='inherit' elevation={1} className={fullScreen ? classes.appBarFullScreen : classes.appBar}>
      <Toolbar className={classes.toolbar} disableGutters={true}>
        <Grid container alignItems='center' spacing={0}>
          <Grid item>
            <img className={classes.logo} src={logo} alt='logo' onClick={handleChangeRoute(publicUrl('/'))} />
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
                  {
                    [
                      <MenuItem key='signout' onClick={handleLogout}>
                        Sign Out
                      </MenuItem>
                    ]
                  }
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
