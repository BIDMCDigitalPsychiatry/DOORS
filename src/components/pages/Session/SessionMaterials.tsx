import * as React from 'react';
import { Grid } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import { useLocation } from 'react-router';
 
export default function SessionMaterials() {
  const { state } = useLocation();  
  const handleChangeRoute = useHandleChangeRoute();  
  return (
    <ChildPage backLabel='Back to Session' onBack={handleChangeRoute('/SessionDashboard', state)} title='Session Materials Placeholder'>
      <Grid container spacing={3}></Grid>
    </ChildPage>
  );
}
