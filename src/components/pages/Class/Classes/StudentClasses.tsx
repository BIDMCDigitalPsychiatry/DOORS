import * as React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useChangeRouteLayout, useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import { useHandleCreateSession, useSessionsByGroupId } from '../../../../database/useSessions';
import { sortUdpatedDescending } from '../../../../helpers';
import useClassesByUserId from '../useClassesByUserId';

const nextRoute = '/Pre-Survey';

export default function StudentClasses() {
  const [{ student }] = useLayout();
  const { id: studentId, userId: studentUserId, groupId, parentId } = student;

  const { data: instructorClasses } = useClassesByUserId({ userId: parentId });

  const { sessions } = useSessionsByGroupId({ groupId });

  const completed = sessions.filter(c => c.completed === true && !c.deleted).sort(sortUdpatedDescending);
  const inProgress = sessions.filter(c => c.completed !== true && !c.deleted).sort(sortUdpatedDescending);

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const changeRouteLayout = useChangeRouteLayout();

  const handleCreateSession = useHandleCreateSession({ studentId, studentUserId, groupId, nextRoute });

  const handleResume = React.useCallback(
    session => () => {
      // Restore the last route, if applicable
      const route = ['/Pre-Survey', '/Lesson', '/Post-Survey', '/Resources'].find(r => r === session?.currentRoute) ?? nextRoute;
      changeRouteLayout(route, { session });
    },
    [changeRouteLayout]
  );

  return (
    <>
      <Page title='Available Classes'>
        <Grid container spacing={3}>
          {[
            instructorClasses
              .filter(c => !inProgress.find(s => s.classId === c.id && !s.completed)) // Don't show available class if one is currently in progress
              .map(c => (
                <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
                  <Class {...c} buttonLabel='Start' onClick={handleCreateSession(c)} />
                </Grid>
              ))
          ]}
        </Grid>
      </Page>

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
                    <Class {...s} showUpdated={true} buttonLabel='Resume' onClick={handleResume(s)} />
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
                    <Class {...s} onClick={handleChangeRouteLayout('/Pre-Survey', { session: s })} />
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
