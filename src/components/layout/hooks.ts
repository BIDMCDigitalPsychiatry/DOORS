import * as React from 'react';
import useComponentSize from '@rehooks/component-size';
import { useHistory, useLocation } from 'react-router';
import { AppState } from '../../store';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useIsAdmin } from '../../hooks';

export const useLayoutKey = key => useSelector((state: AppState) => state.layout[key], shallowEqual);
export const useAuth = () => useLayoutKey('auth') || {};

export default function useRequest({ url, setState = undefined, onSuccess = undefined, onError = undefined, method = 'post' as any }) {
    const [error, setError] = React.useState();
    const { access } = useAuth();

    const handleRequest = React.useCallback((values = {}, OnSuccess = undefined, OnError = undefined) => {
        setState && setState(prev => ({ ...prev, success: false, disabled: true, submitting: true, response: undefined }));
        async function submitData() {
            setError(undefined); // Reset any previous errors
            try {
                console.log({ access, method, url })
                //const response = await processRequest(method, url, values, access);
                const response = { data: { success: true, email: 'test@test.com' } }
                console.log('Successful request.');
                console.log({ response, values })
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
    }, [access, url, method, setState, setError, onSuccess, onError]);

    return { handleRequest, error, setError }
}

export const useLogin = ({ setState = undefined, onSuccess = undefined }) => {
    const dispatch = useDispatch();

    const onLogin = React.useCallback(response => {

        dispatch({ type: 'LOGIN', auth: response.data })
        console.log('Successfully logged in.');
        onSuccess && onSuccess();
    }, [dispatch, onSuccess])

    const { handleRequest, error, setError } = useRequest({ url: '/auth/login?debug=true', setState, onSuccess: onLogin });

    return { handleLogin: handleRequest, error, setError };
}

export const useSetUser = () => {
    const dispatch = useDispatch();
    return React.useCallback(user => dispatch({ type: 'SET_USER', user }), [dispatch]);
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
    return React.useCallback((props) => dispatch({ type: 'RESIZE_VIEWPORT', ...props }), [dispatch]);
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

export const useAdminMode = () => {
    const dispatch = useDispatch();
    const isAdmin = useIsAdmin();
    const setAdminMode = React.useCallback(adminMode => dispatch({ type: 'CHANGE_ADMIN_MODE', adminMode }), [dispatch]);
    const adminMode = useSelector((state: AppState) => state.layout.adminMode);
    return [isAdmin && adminMode, setAdminMode];
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
    return React.useCallback(route => event => changeRoute(route), [changeRoute]);
};

export const useChangeRoute = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    return React.useCallback((route: string) => pathname !== route && history && history.push(route), [history, pathname]);
};
