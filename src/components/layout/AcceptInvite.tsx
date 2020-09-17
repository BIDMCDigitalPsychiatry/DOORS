import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { useHeight, useUserId } from './hooks';
import { useInstructor } from '../../database/useInstructor';
import { isEmpty, timeAgo } from '../../helpers';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    root: ({ height }: any) => ({
      background: palette.common.white,
      color: palette.primary.main,
      height,
      overflowY: 'auto'
    }),
    paper: {
      marginTop: 32,
      width: 300
    },
    disclaimer: {
      maxWidth: 650
    },
    summary: {
      marginTop: 8,
      maxWdith: 650
    },
    panelarea: {
      background: '#F5F5F5'
    },
    button: {
      background: palette.primary.main,
      color: palette.common.white,
      '&:hover': {
        background: palette.primary.dark,
        color: palette.common.white
      },
      marginTop: 8
    },
    wrapper: {
      width: 224
    },
    buttonProgress: {
      position: 'absolute',
      top: '25%',
      left: '50%',
      marginTop: -8,
      marginLeft: -12
    }
  })
);

export default function AcceptInvite({ id, onBack = undefined }) {
  const BannerMsg = 'Click below to accept invitation';
  const height = useHeight();
  const classes = useStyles({ height });
  var buttonRef = React.useRef(null);

  const [state, setState] = React.useState({ loading: false, error: undefined, response: undefined, errors: {} });
  const { loading, error, response, errors } = state;

  const [instructor, setInstructor, expired] = useInstructor({ id, state, setState });
  console.log({ instructor, loading, error, response, id, errors });

  const dispatch = useDispatch();
  const userId = useUserId();

  const handleClose = React.useCallback(() => {
    dispatch(push('')); // This clears any query params
    onBack && onBack(); // Force a refresh in parent component
  }, [dispatch]);

  const handleSubmit = React.useCallback(() => {
    setInstructor({ accepted: true, userId }, handleClose);
  }, [setInstructor, handleClose, userId]);

  const isError = !isEmpty(instructor?.userId) || expired || instructor?.deleted || !isEmpty(error);

  return (
    <div
      className={classes.root}
      onKeyUp={(e: any) => {
        if (e.keyCode === 13) {
          // Enter key
          buttonRef.current && buttonRef.current.click();
        }
      }}
    >
      <form autoComplete='off'>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography align='center' className={classes.panelarea}>
                <img src={BrandLogoImage} alt='logo' style={{ height: 124 }} />
              </Typography>
              <Divider />
              <Grid container spacing={1} direction='column' justify='center' alignItems='center' style={{ padding: 16 }}>
                <Grid item>
                  <Typography align='center' className={classes.disclaimer}>
                    {BannerMsg}
                  </Typography>
                </Grid>
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button
                      ref={buttonRef}
                      fullWidth={true}
                      disabled={loading || isError}
                      variant='contained'
                      className={classes.button}
                      onClick={handleSubmit}
                    >
                      Accept Invite
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button ref={buttonRef} fullWidth={true} variant='contained' onClick={handleClose}>
                      Back
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' className={classes.summary}>
                    Invited {timeAgo(instructor?.created)}
                  </Typography>
                  {isError && (
                    <Typography align='center' color='error' className={classes.summary}>
                      {!isEmpty(instructor?.userId)
                        ? 'Invite has already been accepted'
                        : expired || instructor?.deleted
                        ? 'Invite has expired or no longer exists. Please request a new invite.'
                        : error}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
