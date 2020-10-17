import * as React from 'react';
import { useSignedInAsText } from '../../hooks';
import { useHandleChangeRoute } from '../layout/hooks';
import ChildPage from './ChildPage';

export default function AccessDenied() {
  const changeRoute = useHandleChangeRoute();
  return (
    <ChildPage
      backLabel='Back to Classes'
      onBack={changeRoute('/Classes')}
      title={'Access Denied'}
      subtitle={`You are not authorized to view this page.  ${useSignedInAsText()}`}
    ></ChildPage>
  );
}
