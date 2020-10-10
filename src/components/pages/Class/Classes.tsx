import * as React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import Class from './Class';
import Page from '../Page';
import { useHandleChangeRoute, useHandleChangeRouteLayout } from '../../layout/hooks';
import { useIsAdminMode, useIsStudentMode } from '../../../hooks';
import StyledButton from '../../general/StyledButton';
import useClasses from './useClasses';
import { tables } from '../../../database/dbConfig';

const ActionButton = () => {
  const changeRoute = useHandleChangeRoute();
  return <StyledButton onClick={changeRoute('/CreateClass')}>Create New Class</StyledButton>;
};

export default function Classes() {
  const isAdminMode = useIsAdminMode();
  const isStudentMode = useIsStudentMode();

  const { data } = useClasses({ Model: tables.classesAdmin });
  const { data: studentData } = useClasses({ Model: tables.classesStudent });

  const changeRouteLayout = useHandleChangeRouteLayout();

  return (
    <>
      <Page title='Available Classes' ActionButton={isAdminMode ? ActionButton : undefined}>
        <Grid container spacing={3}>
          {[
            data.map(s => (
              <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                <Class {...s} onClick={changeRouteLayout(isStudentMode ? '/Pre-Survey' : '/ClassDashboard', { class: s })} />
              </Grid>
            ))
          ]}
        </Grid>
      </Page>
      {isStudentMode && (
        <>
          <Box mt={3} mb={3}>
            <Divider />
          </Box>
          <Page title='In Progress Classes'>
            <Grid container spacing={3}>
              {[
                studentData
                  .filter(c => c.completed !== true)
                  .map(s => (
                    <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                      <Class {...s} onClick={changeRouteLayout('/Pre-Survey', { class: s })} />
                    </Grid>
                  ))
              ]}
            </Grid>
          </Page>
          <Box mt={3} mb={3}>
            <Divider />
          </Box>
          <Page title='Completed Classes'>
            <Grid container spacing={3}>
              {[
                studentData
                  .filter(c => c.completed === true)
                  .map(s => (
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
  );
}
