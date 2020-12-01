import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid, Box, Divider, Tooltip } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { getDateFromTimestamp, getDayMonthYear, isEmpty, sortUdpatedDescending, yyyymmdd } from '../../../helpers';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as AddStudentDialog from '../../application/GenericDialog/AddStudent';
import * as MarkAttendanceDialog from '../../application/GenericDialog/MarkAttendance';
import * as AttendanceHistoryDialog from '../../application/GenericDialog/AttendanceHistory';
import useGroupStudents from '../../../database/useGroupStudents';
import { tables } from '../../../database/dbConfig';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import MarginDivider from '../../application/DialogField/MarginDivider';
import useTableRow from '../../../database/useTableRow';
import useSessions from '../../../database/useSessions';
import { ParticipantsDetailed } from './ParticipantsDetailed';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  summary: {
    padding: spacing(1),
    background: palette.primary.light,
    color: palette.common.white
  },
  summaryDeleted: {
    padding: spacing(1),
    background: red[400],
    color: palette.common.white
  },
  actions: {
    padding: spacing(1),
    display: 'flex',
    alignItems: 'flex-start'
  },
  details: {
    padding: spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },

  bold: {
    fontWeight: 'bold'
  },
  semibold: {
    fontWeight: 500
  },
  light: {
    fontWeight: 550
  },
  createdOn: {
    fontWeight: 500
  }
}));

export const buildParticipants = (students, sessions, includeStatus = true) => {
  var participants = [];
  students.forEach(as => {
    const ss = sessions.filter(s => s.studentId === as.id);
    participants.push({
      student: as,
      sessions: ss,
      completed: includeStatus && ss.filter(c => c.completed === true && !c.deleted).sort(sortUdpatedDescending),
      inProgress: includeStatus && ss.filter(c => c.completed !== true && !c.deleted).sort(sortUdpatedDescending)
    });
  });

  return participants.sort((a, b) => {
    if (a.completed.length > b.completed.length) return 1;
    if (a.completed.length < b.completed.length) return -1;
    if (a.inProgress.length > b.inProgress.length) return 1;
    if (a.inProgress.length < b.inProgress.length) return -1;
    return 0;
  });
};

const Model = tables.groups;
export default function ClassGroup({
  mount = false,
  id = undefined,
  userId = undefined,
  classId = undefined,
  deleted,
  name = 'Group Name',
  location = 'Unknown Location',
  type = 'Unknown Type',
  created = undefined,
  className = undefined,
  handleRefreshGroups
}) {
  const classes = useStyles();

  const { row: instructorProfile } = useTableRow({ Model: tables.profiles, id: userId });
  const { students, pendingStudents, deletedStudents, activeStudents, handleRefresh } = useGroupStudents({ groupId: id });
  const changeRouteLayout = useHandleChangeRouteLayout();

  const { sessions } = useSessions();
  const filtered = sessions.filter(session => (isEmpty(classId) || session?.classId === classId) && students.find(student => student.id === session.studentId)); // TODO Filter by active student id's instead

  const instructorName = instructorProfile?.name;

  const activeParticipants = buildParticipants(activeStudents, filtered, !isEmpty(classId));
  const pendingParticipants = buildParticipants(pendingStudents, filtered, !isEmpty(classId));
  const deletedParticipants = buildParticipants(deletedStudents, filtered, !isEmpty(classId));
  const { readSetRow } = useTableRow({ id, Model });

  const handleArchive = React.useCallback(() => {
    readSetRow({ values: { deleted: true }, onSuccess: handleRefreshGroups });
  }, [readSetRow, handleRefreshGroups]);

  const handleRestore = React.useCallback(() => {
    readSetRow({ values: { deleted: false }, onSuccess: handleRefreshGroups });
    handleRefreshGroups && handleRefreshGroups();
  }, [readSetRow, handleRefreshGroups]);

  return (
    <Card className={clsx(classes.root, className)}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2} className={deleted ? classes.summaryDeleted : classes.summary}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Tooltip
                title={
                  <>
                    <Typography noWrap variant='h6' className={classes.semibold}>
                      Group ID: {id}
                    </Typography>
                    {classId && (
                      <Typography noWrap variant='h6' className={classes.semibold}>
                        Class ID: {classId}
                      </Typography>
                    )}
                    <Typography noWrap variant='h6' className={classes.semibold}>
                      User ID: {userId}
                    </Typography>
                  </>
                }
              >
                <Typography noWrap variant='h6' className={classes.semibold}>
                  {name}
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Divider style={{ background: 'white', marginTop: 8 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography noWrap variant='caption'>
                Instructor: {instructorName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography noWrap variant='caption'>
                Location: {location}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography noWrap variant='caption'>
                Type: {type}
              </Typography>
            </Grid>
            {created && (
              <Grid item xs={12}>
                <Typography variant='caption'>Created on {getDateFromTimestamp(created)}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={10} className={classes.details}>
          <Grid container justify='space-between' spacing={2}>
            <Grid item xs>
              {[
                { participants: activeParticipants, label: activeParticipants.length === 1 ? 'Student' : 'Students' },
                {
                  participants: pendingParticipants,
                  label: pendingParticipants.length === 1 ? 'Pending Invite (Not Accepted)' : 'Pending Invites (Not Accepted)'
                },
                { participants: deletedParticipants, label: deletedParticipants.length === 1 ? 'Archived Student' : 'Archived Students' }
              ]
                .filter(i => i.participants.length > 0)
                .map((props, i) => (
                  <Box key={i} mb={1}>
                    {i !== 0 && <MarginDivider />}
                    <ParticipantsDetailed move={true} onRefreshGroups={handleRefreshGroups} onRefresh={handleRefresh} {...props} />
                  </Box>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={4} xl={3} className={classes.actions}>
              <Grid container spacing={1}>
                {!deleted && (
                  <Grid item xs={12}>
                    <DialogButton
                      id={id}
                      Module={AddStudentDialog}
                      fullWidth={true}
                      onClose={handleRefresh}
                      variant='styled'
                      size='large'
                      tooltip=''
                      initialValues={{
                        group: {
                          id,
                          name,
                          type,
                          location
                        }
                      }}
                    >
                      Add New Student
                    </DialogButton>
                  </Grid>
                )}
                {!isEmpty(classId) && (
                  <>
                    {!deleted && (
                      <Grid item xs={12}>
                        <DialogButton
                          Module={MarkAttendanceDialog}
                          mount={mount}
                          fullWidth={true}
                          onClose={handleRefresh}
                          variant='styled'
                          size='large'
                          tooltip=''
                          initialValues={{
                            groupId: id,
                            classId,
                            date: yyyymmdd(),
                            dateString: getDayMonthYear(),
                            students: activeStudents.reduce((f, c) => {
                              f[c.id] = c;
                              return f;
                            }, {})
                          }}
                        >
                          Mark Attendance
                        </DialogButton>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <DialogButton
                        Module={AttendanceHistoryDialog}
                        mount={mount}
                        fullWidth={true}
                        onClose={handleRefresh}
                        variant='styled'
                        styledVariant='secondary'
                        size='large'
                        tooltip=''
                        initialValues={{
                          classId,
                          groupId: id,
                          date: yyyymmdd(),
                          dateString: getDayMonthYear(),
                          students: activeStudents.reduce((f, c) => {
                            f[c.id] = c;
                            return f;
                          }, {})
                        }}
                      >
                        View Attendance History
                      </DialogButton>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledButton
                        variant='secondary'
                        fullWidth={true}
                        onClick={changeRouteLayout('/ClassReport', {
                          groupId: id,
                          classId,
                          sessions: filtered
                        })}
                      >
                        View Class Report
                      </StyledButton>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <DialogButton
                    fullWidth={true}
                    onClick={deleted === true ? handleRestore : handleArchive}
                    onClose={handleArchive}
                    variant='styled'
                    size='large'
                    tooltip=''
                  >
                    {deleted === true ? 'Restore' : 'Archive'} Group
                  </DialogButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
