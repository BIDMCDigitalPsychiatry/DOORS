import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { useHeight, useUserId } from './hooks';
import { isEmpty, timeAgo } from '../../helpers';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { tables } from '../../database/dbConfig';
import { useTableRow } from '../../database/useTableRow';

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

export default function AcceptInvite({ id, type, onBack = undefined }) {
  const BannerMsg = 'Click below to accept invitation';
  const height = useHeight();
  const classes = useStyles({ height });
  var buttonRef = React.useRef(null);

  const [state, setState] = React.useState({ loading: false, error: undefined, response: undefined, errors: {} });
  const { loading, error } = state;

  const [row, setRow, expired] = useTableRow({
    Model: type === 's' ? tables.students : tables.instructors,
    id,
    state,
    setState
  });

  const dispatch = useDispatch();
  const userId = useUserId();

  const handleClose = React.useCallback(() => {
    dispatch(push('')); // This clears any query params
    onBack && onBack(); // Force a refresh in parent component
  }, [onBack, dispatch]);

  const handleSubmit = React.useCallback(() => {
    setRow({ accepted: true, userId }, handleClose);
  }, [setRow, handleClose, userId]);

  const isError = !isEmpty(row?.userId) || expired || row?.deleted || !isEmpty(error);

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
                    Invited {timeAgo(row?.created)}
                  </Typography>
                  {isError && (
                    <Typography align='center' color='error' className={classes.summary}>
                      {!isEmpty(row?.userId)
                        ? 'Invite has already been accepted'
                        : expired || row?.deleted
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
