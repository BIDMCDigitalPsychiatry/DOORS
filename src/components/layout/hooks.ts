import { useFullScreen } from './../../hooks';
import * as React from 'react';
import useComponentSize from '@rehooks/component-size';
import { useHistory, useLocation } from 'react-router';
import { AppState } from '../../store';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { publicUrl, copyToLower, isEmpty } from '../../helpers';
import { Auth } from 'aws-amplify';
import { useTheme } from '@material-ui/core';
import { homepage } from '../../../package.json';

export const useLayoutKey = key => useSelector((state: AppState) => state.layout[key], shallowEqual);
export const useAuth = () => useLayoutKey('auth') || {};
export const useUserEmail = () => {
  const auth = useAuth();
  return auth.signInUserSession?.idToken?.payload?.email ?? 'Username';
};
export const useUserId = ({ userId = undefined } = {}) => {
  const auth = useAuth();
  return userId ? userId : auth.username;
};

export const useDisplayName = () => {
  const email = useUserEmail();
  const [{ profile }] = useLayout();
  return profile?.name ?? email;
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const changeRoute = useChangeRoute();
  return React.useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    changeRoute('/');
  }, [changeRoute, dispatch]);
};

const handleValidation = ({ message }, dialogState) => {
  var errors = copyToLower(dialogState.errors); // start with server generated errors, ensure all keys start with lowercase letter

  if (!isEmpty(message)) {
    if (message.includes('password') || message.includes('Password')) {
      errors['password'] = message;
    } else {
      errors['email'] = message;
    }
  }

  return errors;
};

export const useLogin = ({ state = {}, setState = undefined, onSuccess = undefined }) => {
  const dispatch = useDispatch();
  const stateStr = JSON.stringify(state);
  const handleLogout = useLogout();

  const handleLogin = React.useCallback(
    ({ forgotPassword, enterNewPassword, confirmationCode, newPassword, email: Email = '', password }) => {
      handleLogout(); // Ensure we are logged out of everything prior to logging in
      const email = Email.toLowerCase(); // Ensure email is always lower case
      setState(prev => ({ ...prev, open: false, loading: true, showErrors: false, errors: {} }));
      if (forgotPassword) {
        if (enterNewPassword) {
          Auth.forgotPasswordSubmit(email, confirmationCode, newPassword)
            .then(data => {
              alert('Successfully updated password.');
              Auth.signIn(email, newPassword)
                .then(user => {
                  console.log('Login success!');
                  dispatch({ type: 'LOGIN', auth: user });
                  setState(prev => ({ ...prev, open: false, loading: false, errors: {} }));
                  onSuccess && onSuccess();
                })
                .catch(err => {
                  console.error('Error with Login');
                  console.error(err);
                  const newErrors = handleValidation({ message: err.message }, JSON.parse(stateStr));
                  setState(prev => ({ ...prev, loading: false, showErrors: true, errors: newErrors }));
                });
            })
            .catch(err => {
              console.error('Error resetting password');
              console.error(err);
              const newErrors = handleValidation({ message: err.message }, JSON.parse(stateStr));
              setState(prev => ({ ...prev, loading: false, showErrors: true, errors: newErrors }));
            });
        } else {
          Auth.forgotPassword(email)
            .then(data => {
              alert('An email has been sent with instructions for resetting your password.');
              setState(prev => ({ ...prev, loading: false, enterNewPassword: true }));
            })
            .catch(err => {
              console.error('Error requesting reset');
              const newErrors = handleValidation({ message: err.message }, JSON.parse(stateStr));
              setState(prev => ({ ...prev, loading: false, showErrors: true, errors: newErrors }));
            });
        }
      } else {
        Auth.signIn(email, password)
          .then(user => {
            console.log('Login success!');
            dispatch({ type: 'LOGIN', auth: user });
            onSuccess && onSuccess();
            setState(prev => ({ ...prev, open: false, loading: false, errors: {} }));
          })
          .catch(err => {
            console.error('Error with Login');
            console.error(err);
            const newErrors = handleValidation({ message: err.message }, JSON.parse(stateStr));
            setState(prev => ({ ...prev, loading: false, showErrors: true, errors: newErrors }));
          });
      }
    },
    [dispatch, onSuccess, setState, handleLogout, stateStr]
  );

  return { handleLogin };
};

export const useResizeAppBar = () => {
  const dispatch = useDispatch();
  return React.useCallback(height => dispatch({ type: 'RESIZE_APPBAR', height }), [dispatch]);
};

export const useAppBarHeight = (): number => {
  return useSelector((state: AppState) => state.layout.appBarHeight);
};

export const useResizeViewPort = () => {
  const dispatch = useDispatch();
  return React.useCallback(props => dispatch({ type: 'RESIZE_VIEWPORT', ...props }), [dispatch]);
};

export const useHeight = (): number => {
  return useSelector((state: AppState) => state.layout.height);
};

export const useWidth = (): number => {
  return useSelector((state: AppState) => state.layout.width);
};

export const useDimensions = () => {
  return [useHeight(), useWidth()];
};

export const useAppBarHeightRef = () => {
  let ref = React.useRef(null);
  const { height } = useComponentSize(ref);
  const resizeAppBar = useResizeAppBar();
  React.useEffect(() => {
    resizeAppBar(height);
  }, [resizeAppBar, height]);
  return ref;
};

export const useHandleChangeRoute = () => {
  const changeRoute = useChangeRoute();
  return React.useCallback((route, state = undefined, search = undefined) => event => changeRoute(route, state, search), [changeRoute]);
};

export const useChangeRoute = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  return React.useCallback(
    (route: string, state: any = undefined, search: any = undefined) => {
      if (pathname !== route && history) {
        history.push({ pathname: publicUrl(route), search, state });
      }
    },
    [history, pathname]
  );
};

export const useChangeRouteLayout = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [, setLayout] = useLayout();
  return React.useCallback(
    (route: string, state: any = undefined, search: any = undefined) => {
      if (pathname !== route && history) {
        history.push({ pathname: publicUrl(route), search, state });
      }
      state && setLayout(state);
    },
    [history, pathname, setLayout]
  );
};

export const useHandleChangeRouteLayout = () => {
  const changeRoute = useChangeRouteLayout();
  return React.useCallback((route, state = undefined, search = undefined) => event => changeRoute(route, state, search), [changeRoute]);
};

export const useLayout = (): any[] => {
  const dispatch = useDispatch();
  const layout = useSelector((state: AppState) => state.layout, shallowEqual);
  const setLayout = React.useCallback(
    payload => {
      dispatch({ type: 'UPDATE_LAYOUT', payload });
    },
    [dispatch]
  );
  return [layout, setLayout];
};

export const useLeftDrawer = (): any[] => {
  const { pathname } = useLocation();
  const [{ leftDrawerOpen }, setLayout] = useLayout();
  const { layout }: any = useTheme();
  const fullScreen = useFullScreen();
  const { drawerPaths } = layout;
  const parts = (homepage ?? '').split('/');
  const lastPart = (parts.length > 0 ? parts[parts.length - 1] : '').replace('/', '');
  const leftDrawerEnabled = drawerPaths.find(p => p === pathname || `/${lastPart}/${p}` === pathname) ? true : false;
  const setLeftDrawerOpen = React.useCallback((open = !leftDrawerOpen) => setLayout({ leftDrawerOpen: open }), [setLayout, leftDrawerOpen]);
  return [leftDrawerEnabled && (fullScreen ? leftDrawerOpen : true), setLeftDrawerOpen, leftDrawerEnabled];
};
