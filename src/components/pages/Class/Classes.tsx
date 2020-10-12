import * as React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import Class from './Class';
import Page from '../Page';
import { useHandleChangeRoute, useHandleChangeRouteLayout } from '../../layout/hooks';
import { useIsAdminMode, useIsInstructorMode, useIsStudentMode } from '../../../hooks';
import StyledButton from '../../general/StyledButton';
import useClasses from './useClasses';
import { tables } from '../../../database/dbConfig';
import { uuid } from '../../../helpers';
import useCombinedClasses from './useCombinedClasses';

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
  const { data: studentData } = useClasses({ Model: tables.classesStudent });
  const completed = studentData.filter(c => c.completed === true && !c.deleted);
  const inProgress = studentData.filter(c => c.completed !== true && !c.deleted);

  const changeRouteLayout = useHandleChangeRouteLayout();

  return (
    <>
      <Page title='Available Classes' ActionButton={isAdminMode || isInstructorMode ? ActionButton : undefined}>
        <Grid container spacing={3}>
          {[
            data.map(s => (
              <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                <Class
                  {...s}
                  buttonLabel={isStudentMode ? 'Start' : 'View'}
                  onClick={changeRouteLayout(isStudentMode ? '/Pre-Survey' : '/ClassDashboard', {
                    class: {
                      ...s,
                      id: isStudentMode ? [s.id, uuid()].join(':') : s.id // If a student is starting a new class, then append the session id to the class id
                    }
                  })}
                />
              </Grid>
            ))
          ]}
        </Grid>
      </Page>
      {isStudentMode && (
        <>
          {inProgress.length > 0 && (
            <>
              <Box mt={3} mb={3}>
                <Divider />
              </Box>
              <Page title='In Progress'>
                <Grid container spacing={3}>
                  {[
                    inProgress.map(s => (
                      <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                        <Class {...s} buttonLabel='Resume' onClick={changeRouteLayout('/Pre-Survey', { class: s })} />
                      </Grid>
                    ))
                  ]}
                </Grid>
              </Page>
            </>
          )}
          {completed.length > 0 && (
            <>
              <Box mt={3} mb={3}>
                <Divider />
              </Box>
              <Page title='Completed'>
                <Grid container spacing={3}>
                  {[
                    completed.map(s => (
                      <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                        <Class {...s} onClick={changeRouteLayout('/Pre-Survey', { class: s })} />
                      </Grid>
                    ))
                  ]}
                </Grid>
              </Page>
            </>
          )}
        </>
      )}
    </>
  );
}
