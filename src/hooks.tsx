import * as React from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { adminUsers } from '../package.json';
import { useLayout, useUserEmail } from './components/layout/hooks';
import { useLocation } from 'react-router';

export const useFullScreen = (size = 'sm' as any) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(size));
};

export const useContentPadding = () => {
  const fullScreen = useFullScreen();
  const { layout } = useTheme();
  return fullScreen ? layout.contentpadding_xs : layout.contentpadding;
};

export const useSignedIn = () => {
  const isEmpty = useSelector((s: any) => s.layout.auth === undefined);
  const isLoaded = useSelector((s: any) => s.layout.auth !== undefined);
  return isLoaded && !isEmpty ? true : false;
};

export const useIsAdmin = () => {
  const signedIn = useSignedIn();
  const email = useUserEmail();
  const adminEmails = adminUsers.split(',');
  return signedIn && adminEmails.findIndex(ae => ae.trim().toLowerCase() === email.trim().toLowerCase()) > -1 ? true : false;
};

export const useIsAdminMode = () => {
  const isAdmin = useIsAdmin();
  const [{ admin }] = useLayout();
  return isAdmin === true && admin === true ? true : false;
};

export const useIsInstructorMode = () => {
  const [{ instructor }] = useLayout();
  return instructor !== undefined;
};

export const useIsStudentMode = () => {
  const [{ student }] = useLayout();
  return student !== undefined;
};

export const useIsInstructorImpersonationMode = () => {
  const [{ instructor, impersonateStudent }] = useLayout();
  return instructor !== undefined && impersonateStudent !== undefined;
};

export const useUserType = () => {
  const isAdmin = useIsAdminMode();
  const isInstructor = useIsInstructorMode();
  const isStudent = useIsStudentMode();
  return isAdmin ? 'Admin' : isInstructor ? 'Instructor' : isStudent ? 'Student' : 'Unknown';
};

export const getUrlParamater = paramName => {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === paramName) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return undefined;
};

export const useHandleLink = link => {
  return React.useCallback(() => {
    const win = window.open(link, '_blank');
    win && win.focus();
  }, [link]);
};

export const useCurrentRoute = () => {
  const location = useLocation();
  return location.pathname.substr(location.pathname.lastIndexOf('/'));
};

export const useCanChangeStudentGroup = () => {
  const [{ students }] = useLayout();
  const isStudentMode = useIsStudentMode();
  return isStudentMode && students?.length > 1 ? true : false;
};

export const useCanChangeUserType = () => {
  const isAdmin = useIsAdmin();
  const [{ students, instructors }] = useLayout();
  return students.length > 1 || (isAdmin && (students?.length > 0 || instructors?.length > 0)) || (!isAdmin && students?.length > 0 && instructors?.length > 0);
};

export const useSignedInAsText = () => {
  const userType = useUserType();
  return `Yor are signed in as ${userType === 'Student' ? 'a' : 'an'} ${userType}`;
};
