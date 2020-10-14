import * as React from 'react';
import { Box, Divider, Grid } from '@material-ui/core';
import Class from './Class';
import Page from '../Page';
import { useChangeRouteLayout, useHandleChangeRouteLayout } from '../../layout/hooks';
import { uuid } from '../../../helpers';
import useCombinedClasses from './useCombinedClasses';
import useSessions from '../../../database/useSessions';
import { tables } from '../../../database/dbConfig';
import useProcessDataState from '../../hooks/useProcessDataState';

const nextRoute = '/Pre-Survey';

export default function StudentClasses() {
  const { data } = useCombinedClasses();
  const { sessions } = useSessions();
  const completed = sessions.filter(c => c.completed === true && !c.deleted);
  const inProgress = sessions.filter(c => c.completed !== true && !c.deleted);

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const changeRouteLayout = useChangeRouteLayout();

  const { handleUpdate } = useProcessDataState({ Model: tables.sessions });

  const handleCreate = React.useCallback(
    c => () => {
      const session = {
        ...c, // Copy class data
        id: uuid(), // Create new session id
        classId: c.id // Link the class id
      };
      handleUpdate({
        Data: session,
        onSuccess: () => {
          changeRouteLayout(nextRoute, { session });
        }
      }); // insert into database and change route on success
    },
    [handleUpdate, changeRouteLayout]
  );

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
            data
              .filter(c => !inProgress.find(s => s.classId === c.id && !s.completed)) // Don't show available class if one is currently in progress
              .map(c => (
                <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
                  <Class {...c} buttonLabel='Start' onClick={handleCreate(c)} />
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
                    <Class {...s} buttonLabel='Resume' onClick={handleResume(s)} />
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
