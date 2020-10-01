import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider, TextField, CircularProgress, Link } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { isEmpty } from '../../helpers';
import { useLogin, useHeight } from './hooks';
import { getUrlParamater } from '../../hooks';

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
      marginTop: 32,
      paddingLeft: 16,
      paddingRight: 16,
      maxWidth: 650
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
      }
    },
    wrapper: {
      marginTop: 8,
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

export default function ForgotPassword({ email: Email = '', onBack, onSuccess = undefined }) {
  const id = getUrlParamater('i');
  const BannerMsg = isEmpty(id) ? '' : 'You must log in prior to accepting an invite.  If you do not have an account yet, please create a new account.';

  const height = useHeight();
  const classes = useStyles({ height });
  const noAutoComplete = true;
  var buttonRef = React.useRef(null);

  const [state, setState] = React.useState({
    loading: false,
    errors: {},
    forgotPassword: true,
    email: Email,
    newPassword: '',
    confirmNewPassword: '',
    confirmationCode: '',
    enterNewPassword: false
  });

  const { loading, errors, forgotPassword, email, newPassword, enterNewPassword, confirmNewPassword, confirmationCode } = state;

  const { handleLogin } = useLogin({ state, setState, onSuccess });

  const handleReset = React.useCallback(() => {
    handleLogin({ forgotPassword, email, enterNewPassword, confirmationCode, newPassword });
  }, [forgotPassword, confirmationCode, handleLogin, email, enterNewPassword, newPassword]);

  const handleChange = React.useCallback(
    (name: string) => (event: any) => {
      const value = event.target.value;
      setState(prev => ({ ...prev, errors: {}, [name]: value }));
    },
    [setState]
  );

  const handleEnterReset = React.useCallback(() => {
    setState(prev => ({ ...prev, enterNewPassword: true }));
  }, [setState]);

  const handleBack = React.useCallback(() => {
    if (enterNewPassword) {
      setState(prev => ({ ...prev, enterNewPassword: false }));
    } else {
      onBack && onBack();
    }
  }, [enterNewPassword, onBack]);

  // Per https://stackoverflow.com/questions/50604671/programmatically-disabling-chrome-auto-fill
  // The only way to prevent auto fill is autocomplete=newpassword
  // Note this only prevents the browser from auto populating the fields, it does not prevent chromes new password manager
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
          <Grid item>
            <Typography color='error' align='center' className={classes.disclaimer}>
              {BannerMsg}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography align='center' className={classes.panelarea}>
                <img src={BrandLogoImage} alt='logo' style={{ height: 124 }} />
              </Typography>
              <Divider />
              <Grid container spacing={1} direction='column' justify='center' alignItems='center' style={{ padding: 16 }}>
                <Grid item>
                  <TextField
                    autoComplete={noAutoComplete ? 'new-password' : undefined}
                    id='email'
                    label='Email'
                    disabled={loading}
                    value={email}
                    onChange={handleChange('email')}
                    margin='dense'
                    variant='outlined'
                    error={isEmpty(errors['email']) ? false : true}
                    helperText={errors['email']}
                    autoFocus={!enterNewPassword || isEmpty(Email) ? true : false}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                {enterNewPassword && (
                  <>
                    <Grid item>
                      <TextField
                        id='confirmationCode'
                        label='Confirmation Code'
                        disabled={loading}
                        value={confirmationCode}
                        onChange={handleChange('confirmationCode')}
                        margin='dense'
                        variant='outlined'
                        autoFocus={isEmpty(Email) ? false : true}
                        error={isEmpty(errors['confirmationCode']) ? false : true}
                        helperText={errors['confirmationCode']}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        autoComplete={noAutoComplete ? 'new-password' : undefined}
                        id='newPassword'
                        type='password'
                        label='New Password'
                        disabled={loading}
                        value={newPassword}
                        onChange={handleChange('newPassword')}
                        margin='dense'
                        variant='outlined'
                        error={isEmpty(errors['newPassword']) ? false : true}
                        helperText={errors['newPassword']}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        autoComplete={noAutoComplete ? 'new-password' : undefined}
                        id='confirmNewPassword'
                        type='password'
                        label='Confirm New Password'
                        disabled={loading}
                        value={confirmNewPassword}
                        onChange={handleChange('confirmNewPassword')}
                        margin='dense'
                        variant='outlined'
                        error={isEmpty(errors['confirmNewPassword']) ? false : true}
                        helperText={errors['confirmNewPassword']}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                  </>
                )}
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button ref={buttonRef} fullWidth={true} disabled={loading} variant='contained' className={classes.button} onClick={handleReset}>
                      Reset Password
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button ref={buttonRef} fullWidth={true} disabled={loading} variant='contained' onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                </Grid>
                {!enterNewPassword && (
                  <Grid item>
                    <div style={{ marginTop: 16 }}>
                      <Link style={{ marginLeft: 8, cursor: 'pointer' }} underline='always' color='inherit' onClick={handleEnterReset}>
                        Enter Reset Confirmation Code
                      </Link>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
