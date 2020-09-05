import * as React from 'react';
import { Reducer } from 'redux';
import { AppState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../../constants';
import { useIsAdmin } from '../../hooks';

export interface State {
  height?: number;
  width?: number;
  appBarHeight?: number;
  adminMode?: boolean;
}

const defaultState = {
  width: 0,
  height: 0,
  appBarHeight: (theme as any).layout.toolbarheight,
  adminMode: false
};

const setUser = user => ({ type: 'SET_USER', user });
const resizeAppBar = (height: number | undefined) => ({ type: 'RESIZE_APPBAR', height });
const changeAdminMode = (adminMode: boolean) => ({ type: 'CHANGE_ADMIN_MODE', adminMode });

export const reducer: Reducer<State> = (state: State | any, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'RESIZE_APPBAR':
      return {
        ...state,
        appBarHeight: action.height
      };
    case 'RESIZE_VIEWPORT':
      return {
        ...state,
        height: action.height,
        width: action.width
      };
    case 'CHANGE_ADMIN_MODE':
      return {
        ...state,
        adminMode: action.adminMode
      };
    default:
  }
  return state || { ...defaultState };
};

export const useSetUser = () => {
  const dispatch = useDispatch();
  return React.useCallback(user => dispatch(setUser(user)), [dispatch]);
};

export const useResizeAppBar = () => {
  const dispatch = useDispatch();
  return React.useCallback(height => dispatch(resizeAppBar(height)), [dispatch]);
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
  const setAdminMode = React.useCallback(adminMode => dispatch(changeAdminMode(adminMode)), [dispatch]);
  const adminMode = useSelector((state: AppState) => state.layout.adminMode);
  return [isAdmin && adminMode, setAdminMode];
};
