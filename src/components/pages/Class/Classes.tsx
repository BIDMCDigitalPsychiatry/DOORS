import * as React from 'react';
import { Grid } from '@material-ui/core';
import Class from './Class';
import Page from '../Page';
import { useHandleChangeRoute, useHandleChangeRouteLayout } from '../../layout/hooks';
import { useIsAdminMode, useIsInstructorMode, useIsStudentMode } from '../../../hooks';
import StyledButton from '../../general/StyledButton';
import useCombinedClasses from './useCombinedClasses';
import StudentClasses from './StudentClasses';

const ActionButton = () => {
  const changeRoute = useHandleChangeRoute();
  return <StyledButton onClick={changeRoute('/CreateClass')}>Create New Class</StyledButton>;
};

export default function Classes() {
  const isAdminMode = useIsAdminMode();
  const isInstructorMode = useIsInstructorMode();
  const isStudentMode = useIsStudentMode();

  // Find all instructors
  const { data } = useCombinedClasses();

  const changeRouteLayout = useHandleChangeRouteLayout();

  return isStudentMode ? (
    <StudentClasses />
  ) : (
    <Page title='Available Classes' ActionButton={isAdminMode || isInstructorMode ? ActionButton : undefined}>
      <Grid container spacing={3}>
        {[
          data.map(c => (
            <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
              <Class
                {...c}
                buttonLabel='View'
                onClick={changeRouteLayout('/ClassDashboard', {
                  class: c
                })}
              />
            </Grid>
          ))
        ]}
      </Grid>
    </Page>
  );
}
