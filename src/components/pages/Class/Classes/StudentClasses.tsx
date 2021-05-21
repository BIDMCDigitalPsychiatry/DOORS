import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useChangeRouteLayout, useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import { useHandleCreateSession, useSessionsByStudentId } from '../../../../database/useSessions';
import { sortUdpatedDescending } from '../../../../helpers';
import useClassesByUserId from '../useClassesByUserId';
import { tables } from '../../../../database/dbConfig';
import DialogButton from '../../../application/GenericDialog/DialogButton';
import useStudentsByUserId from '../../../../database/useStudentsByUserId';

const nextRoute = '/Pre-Survey';

const preRecsMet = (preRecs = {}, groupIds = [], completedClasses = []) => {
  var pass = true;

  Object.keys(preRecs).forEach(id => {
    const pr = preRecs[id];
    const { classId, groupId } = pr;
    var g = groupIds.find(gId => gId === groupId);
    var c = completedClasses.find(cc => cc.id === classId);
    if ((groupId === 'All Groups' || g) && !c) {
      // If pre req specifies all groups or a user belongs to the specified group and a comleted class can not be found, then the pre-rec does not pass
      pass = false;
    }
  });
  return pass;
};

export default function StudentClasses() {
  const [{ student, impersonateStudent = undefined }] = useLayout();
  const Student = impersonateStudent ?? student;
  const { id: studentId, userId: studentUserId, parentId } = Student;

  // To get associated groups, grab all student entries then obtain the groupId's
  const { students = [], loading: loadingStudents } = useStudentsByUserId({ userId: studentUserId, loadOnMount: true });
  const groupIds = students.map(s => s.groupId); // Gets all active, non deleted group id's related to the student

  const { data: instructorClasses, handleRefresh: handleRefreshClasses, loading } = useClassesByUserId({ userId: parentId });

  const { sessions, handleRefresh: handleRefreshSessions, loading: loadingSessions } = useSessionsByStudentId({ studentId });

  const handleRefresh = React.useCallback(() => {
    handleRefreshClasses();
    handleRefreshSessions();
  }, [handleRefreshClasses, handleRefreshSessions]);

  const deleted = sessions.filter(c => c.deleted).sort(sortUdpatedDescending);
  const completed = sessions.filter(c => c.completed === true && !c.deleted).sort(sortUdpatedDescending);
  const inProgress = sessions.filter(c => c.completed !== true && !c.deleted).sort(sortUdpatedDescending);

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const changeRouteLayout = useChangeRouteLayout();

  const handleCreateSession = useHandleCreateSession({ studentId, studentUserId, nextRoute });

  const handleResume = React.useCallback(
    session => () => {
      // Restore the last route, if applicable
      const route = ['/Pre-Survey', '/Lessons', '/Post-Survey', '/Resources'].find(r => r === session?.currentRoute) ?? nextRoute;
      changeRouteLayout(route, { session });
    },
    [changeRouteLayout]
  );

  const [showArchived, setShowArchived] = React.useState(false);

  const ShowButton = React.useCallback(() => {
    return (
      <DialogButton size='large' onClick={() => setShowArchived(!showArchived)} fullWidth variant='styled'>
        {showArchived ? 'Hide Archived' : 'Show Archived'}
      </DialogButton>
    );
  }, [showArchived]);

  const title = impersonateStudent ? 'Student Classes (Impersonating)' : 'Student Classes';

  return (
    <>
      <Page title={title} ActionButton={ShowButton} loading={loading || loadingSessions || loadingStudents}>
        <Grid container spacing={3}>
          {!showArchived && (
            <>
              {[
                instructorClasses
                  .filter(c => !c.deleted && !completed.find(s => s.classId === c.id) && !inProgress.find(s => s.classId === c.id)) // Don't show available class in progress or completed
                  .map(c => (
                    <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
                      <Class
                        preRecsMet={preRecsMet(c.preRecs, groupIds, completed)}
                        isAvailable={true}
                        showUpdated={true}
                        {...c}
                        buttonLabel='Start'
                        onClick={handleCreateSession(c)}
                      />
                    </Grid>
                  ))
              ]}
              {inProgress.length > 0 && [
                inProgress.map(s => (
                  <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                    <Class
                      canArchive={true}
                      {...s}
                      Model={tables.sessions}
                      inProgress={true}
                      showUpdated={true}
                      buttonLabel='Resume'
                      onClick={handleResume(s)}
                      onRefresh={handleRefresh}
                    />
                  </Grid>
                ))
              ]}
              {completed.length > 0 && [
                completed.map(s => {
                  // Determine if the class can be started again.  Check if another session is already in progress and if the class still exists
                  const isInProgress = inProgress.find(ip => ip.classId === s.classId) ? true : false;
                  const instructorClass = instructorClasses.find(ic => ic.id === s.classId && ic.deleted !== true);
                  const canStartNew = !isInProgress && instructorClass;

                  return (
                    <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                      <Class
                        {...s}
                        canArchive={true}
                        Model={tables.sessions}
                        onRefresh={handleRefresh}
                        buttonLabel='View'
                        buttonLabel2={canStartNew && 'Start'}
                        onClick2={canStartNew && handleCreateSession(instructorClass)} // Start a new class using the latest revision
                        onClick={handleChangeRouteLayout('/Pre-Survey', { session: s })}
                      />
                    </Grid>
                  );
                })
              ]}
            </>
          )}
          {showArchived && deleted.length === 0 && (
            <Box m={3}>
              <Typography>There are no archived classes at this time.</Typography>
            </Box>
          )}
          {showArchived &&
            deleted.length > 0 && [
              deleted.map(s => (
                <Grid key={[s.id, s.title].join('-')} item lg={3} sm={6} xs={12}>
                  <Class
                    {...s}
                    inProgress={s.completed !== true}
                    canArchive={true}
                    Model={tables.sessions}
                    showUpdated={true}
                    buttonLabel='Resume'
                    onClick={handleResume(s)}
                    onRefresh={handleRefresh}
                  />
                </Grid>
              ))
            ]}
        </Grid>
      </Page>
    </>
  );
}
