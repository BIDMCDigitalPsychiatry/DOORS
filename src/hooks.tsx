import { useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { adminUsers } from '../package.json';
import { isEmpty } from './helpers';

export const useFullScreen = (size = 'sm' as any) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(size));
};

export const useSignedIn = () => {
  const isEmpty = useSelector((s: any) => s.layout.user === undefined);
  const isLoaded = useSelector((s: any) => s.layout.user !== undefined);
  return isLoaded && !isEmpty ? true : false;
};

export const useIsAdmin = () => {
  const signedIn = useSignedIn();
  const email = useSelector((s: any) => s.layout.user?.email ?? '');
  const adminEmails = adminUsers.split(',');
  return signedIn && adminEmails.findIndex(ae => ae.trim().toLowerCase() === email.trim().toLowerCase()) > -1 ? true : false;
};

export const useIsInstructor = () => {
  return useSelector((s: any) => isEmpty(s.layout?.user?.isInstructor ?? false));
};
