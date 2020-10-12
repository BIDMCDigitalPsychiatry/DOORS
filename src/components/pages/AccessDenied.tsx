import * as React from 'react';
import { useUserType } from '../../hooks';
import { useHandleChangeRoute } from '../layout/hooks';
import ChildPage from './ChildPage';

export default function AccessDenied() {
  const userType = useUserType();
  const changeRoute = useHandleChangeRoute();
  return (
    <ChildPage
      backLabel='Back to Classes'
      onBack={changeRoute('/Classes')}
      title={'Access Denied'}
      subtitle={`You are not authorized to view this page.  Your are signed in as ${userType === 'Student' ? 'a' : 'an'} ${userType}`}
    ></ChildPage>
  );
}
