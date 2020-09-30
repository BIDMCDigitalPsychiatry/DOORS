import * as React from 'react';
import { Grid } from '@material-ui/core';
import Class from './Class';
import Page from '../Page';
import { useHandleChangeRoute } from '../../layout/hooks';
import { useIsAdminMode, useIsStudentMode } from '../../../hooks';
import StyledButton from '../../general/StyledButton';
import useClasses from './useClasses';

const ActionButton = () => {
  const changeRoute = useHandleChangeRoute();
  return <StyledButton onClick={changeRoute('/CreateClass')}>Create New Class</StyledButton>;
};

export default function Classes() {
  const handleChangeRoute = useHandleChangeRoute();
  const isAdminMode = useIsAdminMode();
  const isStudentMode = useIsStudentMode();

  const { data } = useClasses({ table: 'classes', tab: 'all' });

  return (
    <Page title='Available Classes' ActionButton={isAdminMode ? ActionButton : undefined}>
      <Grid container spacing={3}>
        {[
          data.map(s => (
            <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
              <Class {...s} onClick={handleChangeRoute(isStudentMode ? '/Pre-Survey' : '/ClassDashboard', s)} />
            </Grid>
          ))
        ]}
      </Grid>
    </Page>
  );
}
