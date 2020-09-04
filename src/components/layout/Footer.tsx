import * as React from 'react';
import { makeStyles, createStyles, Toolbar, Link, AppBar, Typography, Grid } from '@material-ui/core';
import { theme, beta } from '../../constants';
import { useFullScreen } from '../../hooks';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(({ palette, zIndex }: any) =>
  createStyles({
    bottomAppBar: {
      top: 'auto',
      bottom: 0,
      zIndex: zIndex.drawer + 1,
      background: palette.primary.dark,
      color: palette.common.white,
    },
    bottomAppBarBeta: {
      top: 0,
      background: palette.primary.main,
      color: palette.common.white,
      zIndex: zIndex.drawer + 1
    },
    bottomToolBar: {
      minHeight: (theme as any).layout.footerheight
    }
  } as any)
);

export default function Footer() {
  const classes = useStyles({});
  const fullScreen = useFullScreen();

  const username = useSelector((s: any) => s.layout.user?.signInUserSession?.idToken?.payload?.email ?? 'Username');

  return (
    <>
      <AppBar position='fixed' color='primary' className={classes.bottomAppBar}>
        <Toolbar className={classes.bottomToolBar}>
          <Grid container justify='flex-start'>
            <Grid item xs={fullScreen ? 5 : 2} zeroMinWidth>
              <Typography noWrap variant='body2' align='left'>
                <Link href='https://www.digitalpsych.org/' target='_blank' variant='body2' color='inherit'>
                  Division of Digital Psychiatry
                </Link>
              </Typography>
            </Grid>
            {!fullScreen && (
              <Grid item xs={7} zeroMinWidth>
                <Typography noWrap variant='body2' align='center'>
                  <Link href='https://www.bidmc.org/' target='_blank' variant='body2' color='inherit'>
                    This website is made possible by support from ...
                  </Link>
                </Typography>
              </Grid>
            )}
            <Grid item xs={fullScreen ? 7 : 3} zeroMinWidth>
              <Typography noWrap variant='body2' align='right'>
                <Link href='https://www.bidmc.org/' target='_blank' variant='body2' color='inherit'>
                  ©2020 Beth Israel Deaconess Medical Center
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {beta && (
        <AppBar position='fixed' color='secondary' className={classes.bottomAppBarBeta}>
          <Toolbar className={classes.bottomToolBar}>
            <Grid container justify='center' spacing={2}>
              <Grid item xs={4}>
                <Typography noWrap variant='body2'>
                  BETA Version
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container justify='flex-end' spacing={1}>
                  <Grid item>
                    <Typography noWrap variant='body2' align='right'>
                      {fullScreen ? username : `Welcome, ${username}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
