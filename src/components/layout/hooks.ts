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
export const useUserId = () => {
  const auth = useAuth();
  return auth.username;
};

export const useLogout = () => {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch]);
};

export default function useRequest({ url, setState = undefined, onSuccess = undefined, onError = undefined, method = 'post' as any }) {
  const [error, setError] = React.useState();
  const { access } = useAuth();

  const handleRequest = React.useCallback(
    (values = {}, OnSuccess = undefined, OnError = undefined) => {
      setState && setState(prev => ({ ...prev, success: false, disabled: true, submitting: true, response: undefined }));
      async function submitData() {
        setError(undefined); // Reset any previous errors
        try {
          console.log({ access, method, url });
          //const response = await processRequest(method, url, values, access);
          const response = { data: { success: true, email: 'test@test.com' } };
          console.log('Successful request.');
          console.log({ response, values });
          setState && setState(prev => ({ ...prev, success: true, disabled: false, submitting: false, errors: {}, response }));
          onSuccess && onSuccess(response);
          OnSuccess && OnSuccess(response);
        } catch (error) {
          const { response } = error;
          const { error_text = 'Unknown error' } = response?.data ?? {};
          console.error({ error_text, error, values });
          setError(error_text); // Set any new errors
          setState && setState(prev => ({ ...prev, success: false, disabled: false, submitting: false, errors: {}, response }));
          onError && onError(response);
          OnError && OnError(response);
        }
      }
      submitData();
    },
    [access, url, method, setState, setError, onSuccess, onError]
  );

  return { handleRequest, error, setError };
}

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

  const handleLogin = React.useCallback(
    ({ forgotPassword, enterNewPassword, confirmationCode, newPassword, email, password }) => {
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
    [dispatch, onSuccess, setState, stateStr]
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
