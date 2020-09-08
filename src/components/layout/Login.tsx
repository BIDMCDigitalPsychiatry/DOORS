import * as React from 'react';
import { makeStyles, Grid, Paper, Typography, Divider, TextField, CircularProgress } from '@material-ui/core';
import { createStyles, Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import BrandLogoImage from '../../images/logo.svg';
import { isEmpty } from '../../helpers';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { useLogin, useHeight } from './hooks';
import DialogButton from '../application/GenericDialog/DialogButton';
import * as RegisterDialog from '../application/GenericDialog/Register';

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
      maxWidth: 650
    },
    panelarea: {
      background: '#F5F5F5'
    },
    message: {
      color: 'green'
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
    toolbar: mixins.toolbar,
    wrapper: {
      width: 224
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -8,
      marginLeft: -12
    },
    container: {
      overflowY: 'auto'
    }
  })
);

export default function Login() {
  const BannerMsg = '';
  const height = useHeight();
  const classes = useStyles({ height });
  const noAutoComplete = true;
  var buttonRef = React.useRef(null);

  const [values, setValues] = React.useState({
    email: '',
    password: ''
  });

  const { email, password } = values;

  const [state, setState] = React.useState({ disabled: false, errors: {} });
  const { disabled, errors } = state;
  
  const dispatch = useDispatch();
  const { handleLogin } = useLogin({ state, setState });

  const handleSubmit = React.useCallback(() => {
    dispatch(push('')); // This clears any query params    
    handleLogin({ email, password });
  }, [handleLogin, email, password, dispatch]);

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
    setState(prev => ({ ...prev, errors: {} }));
  };

  const handleForgotPassword = React.useCallback(() => {
    alert('To be completed');
  }, []);

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
            <Typography align='center' className={classes.disclaimer}>
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    <Button ref={buttonRef} fullWidth={true} disabled={disabled} variant='contained' className={classes.button} onClick={handleSubmit}>
                      Login
                    </Button>
                    {disabled && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </Grid>
                <Grid item>
                  <div className={classes.wrapper}>
                    <DialogButton Module={RegisterDialog} size='medium' variant='contained' tooltip='' className={classes.button}>
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

