import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider, TextField, CircularProgress } from '@material-ui/core';
import { createStyles, Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { isEmpty } from '../../helpers';
import { useLogin, useHeight } from './hooks';
import DialogButton from '../application/GenericDialog/DialogButton';
import * as RegisterDialog from '../application/GenericDialog/Register';
import { getUrlParamater } from '../../hooks';
import ForgotPassword from './ForgotPassword';

const useStyles = makeStyles(({ palette, mixins }: any) =>
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

export default function Login() {
  const id = getUrlParamater('i');
  const BannerMsg = isEmpty(id) ? '' : 'You must log in prior to accepting an invite.  If you do not have an account yet, please create a new account.';

  const height = useHeight();
  const classes = useStyles({ height });
  const noAutoComplete = true;
  var buttonRef = React.useRef(null);

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    forgotPassword: false
  });

  const { email, password } = values;

  const [state, setState] = React.useState({ enableKeys: true, loading: false, errors: {}, forgotPassword: false });
  const { enableKeys, loading, errors, forgotPassword } = state;

  const { handleLogin } = useLogin({ state, setState });

  const handleSubmit = React.useCallback(() => {
    handleLogin({ email, password });
  }, [handleLogin, email, password]);

  const handleChange = (name: string) => (event: any) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    setState(prev => ({ ...prev, errors: {} }));
  };

  const handleForgotPassword = React.useCallback(() => {
    setState(prev => ({ ...prev, forgotPassword: true }));
  }, []);

  const handleBack = React.useCallback(() => {
    setState(prev => ({ ...prev, forgotPassword: false }));
  }, []);

  // Per https://stackoverflow.com/questions/50604671/programmatically-disabling-chrome-auto-fill
  // The only way to prevent auto fill is autocomplete=newpassword
  // Note this only prevents the browser from auto populating the fields, it does not prevent chromes new password manager
  return forgotPassword ? (
    <ForgotPassword email={email} onBack={handleBack} />
  ) : (
    <div
      className={classes.root}
      onKeyUp={(e: any) => {
        if (e.keyCode === 13) {
          // Enter key
          enableKeys && buttonRef.current && buttonRef.current.click();
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
                    value={values.email}
                    onChange={handleChange('email')}
                    margin='dense'
                    variant='outlined'
                    error={isEmpty(errors['email']) ? false : true}
                    helperText={errors['email']}
                    autoFocus={true}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    autoComplete={noAutoComplete ? 'new-password' : undefined}
                    id='password'
                    label='Password'
                    disabled={loading}
                    type='password'
                    value={values.password}
                    onChange={handleChange('password')}
                    margin='dense'
                    variant='outlined'
                    error={isEmpty(errors['password']) ? false : true}
                    helperText={errors['password']}
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button ref={buttonRef} fullWidth={true} disabled={loading} variant='contained' className={classes.button} onClick={handleSubmit}>
                      Login
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.wrapper}>
                    <DialogButton
                      Module={RegisterDialog}
                      disabled={loading}
                      size='medium'
                      variant='contained'
                      tooltip=''
                      onClick={() => setState(prev => ({ ...prev, enableKeys: false }))}
                      onClose={() => setState(prev => ({ ...prev, enableKeys: true }))}
                      className={classes.button}
                    >
                      Create New Account
                    </DialogButton>
                  </div>
                </Grid>
                <Grid item>
                  <div style={{ marginTop: 16 }}>
                    <Link style={{ marginLeft: 8, cursor: 'pointer' }} underline='always' color='inherit' onClick={handleForgotPassword}>
                      Forgot Password
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
