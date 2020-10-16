import { Reducer } from 'redux';
import { theme } from '../../constants';

export interface State {
  auth?: any;
  height?: number;
  width?: number;
  appBarHeight?: number;
  leftDrawerOpen?: boolean;
  admin?: boolean;
  instructor?: any;
  student?: any;
  canChangeUserType?: boolean;
  canChangeCurrentGroup?: boolean;
  groups?: any;
  selectedGroupId?: string;
}

export const defaultGroupState = {
  groups: [],
  selectedGroupId: undefined,
  canChangeCurrentGroup: false
};

export const defaultUserState = {
  admin: false,
  instructor: undefined,
  student: undefined,
  canChangeUserType: false
};

const defaultState = {
  auth: undefined,
  width: 0,
  height: 0,
  appBarHeight: (theme as any).layout.toolbarheight,
  leftDrawerOpen: false,
  ...defaultUserState,
  ...defaultGroupState
};

export const reducer: Reducer<State> = (state: State | any, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: action.auth
      };
    case 'LOGOUT':
      return {
        ...defaultState,
        auth: undefined,
        height: state.height, //keep keight and width, otherwise the page will render incorrectly
        width: state.width
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
    case 'UPDATE_LAYOUT':
      return {
        ...state,
        ...action.payload
      };
    case 'RESIZE_VIEWPORT':
      return {
        ...state,
        height: action.height,
        width: action.width
      };
    default:
  }
  return state || { ...defaultState };
};
