import { Reducer } from 'redux';
import { theme } from '../../constants';

export interface State {
  auth?: any;
  height?: number;
  width?: number;
  appBarHeight?: number;
  adminMode?: boolean;
}

const defaultState = {
  auth: undefined,
  width: 0,
  height: 0,
  appBarHeight: (theme as any).layout.toolbarheight,
  adminMode: false
};

export const reducer: Reducer<State> = (state: State | any, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: action.auth,
      };
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