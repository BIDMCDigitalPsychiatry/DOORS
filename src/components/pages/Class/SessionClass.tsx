import * as React from 'react';
import { Grid } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import { useLocation } from 'react-router';

export default function SessionClass() {
  const { state } = useLocation();
  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  return (
    <ChildPage backLabel='Back to Session' onBack={handleChangeRouteLayout('/SessionDashboard', { class: state })} title='Session Class Placeholder'>
      <Grid container spacing={3}></Grid>
    </ChildPage>
  );
}
