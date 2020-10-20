import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid, Box, Divider, Tooltip } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { getDateFromTimestamp, getDayMonthYear, sortUdpatedDescending, yyyymmdd } from '../../../helpers';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as AddStudentDialog from '../../application/GenericDialog/AddStudent';
import * as MarkAttendanceDialog from '../../application/GenericDialog/MarkAttendance';
import * as AttendanceHistoryDialog from '../../application/GenericDialog/AttendanceHistory';
import useGroupStudents from '../../../database/useGroupStudents';
import { tables } from '../../../database/dbConfig';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import MarginDivider from '../../application/DialogField/MarginDivider';
import useTableRow from '../../../database/useTableRow';
import { useSessionsByGroupId } from '../../../database/useSessions';
import { ParticipantsDetailed } from './ParticipantsDetailed';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  summary: {
    padding: spacing(1),
    background: palette.primary.light,
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

export const buildParticipants = (students, sessions) => {
  var participants = [];
  students.forEach(as => {
    const ss = sessions.filter(s => s.studentId === as.id);
    participants.push({
      student: as,
      sessions: ss,
      completed: ss.filter(c => c.completed === true && !c.deleted).sort(sortUdpatedDescending),
      inProgress: ss.filter(c => c.completed !== true && !c.deleted).sort(sortUdpatedDescending)
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

export default function ClassGroup({
  mount = false,
  id = undefined,
  userId = undefined,
  classId = undefined,
  name = 'Group Name',
  location = 'Unknown Location',
  type = 'Unknown Type',
  created = undefined,
  className = undefined
}) {
  const classes = useStyles();

  const { row: instructorProfile } = useTableRow({ Model: tables.profiles, id: userId });
  const { pendingStudents, deletedStudents, activeStudents, handleRefresh } = useGroupStudents({ groupId: id });
  const changeRouteLayout = useHandleChangeRouteLayout();

  const { sessions } = useSessionsByGroupId({ groupId: id, classId });
  const instructorName = instructorProfile?.name;

  const activeParticipants = buildParticipants(activeStudents, sessions);
  const pendingParticipants = buildParticipants(pendingStudents, sessions);
  const deletedParticipants = buildParticipants(deletedStudents, sessions);

  return (
    <Card className={clsx(classes.root, className)}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2} className={classes.summary}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Tooltip
                title={
                  <>
                    <Typography noWrap variant='h6' className={classes.semibold}>
                      Group ID: {id}
                    </Typography>
                    <Typography noWrap variant='h6' className={classes.semibold}>
                      Class ID: {classId}
                    </Typography>
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
                    <ParticipantsDetailed onRefresh={handleRefresh} {...props} />
                  </Box>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={4} xl={3} className={classes.actions}>
              <Grid container spacing={1}>
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
                <Grid item xs={12}>
                  <StyledButton variant='secondary' fullWidth={true} onClick={() => alert('To be completed')}>
                    View Attendance History
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton
                    variant='secondary'
                    fullWidth={true}
                    onClick={changeRouteLayout('/ClassReport', {
                      groupId: id,
                      classId
                    })}
                  >
                    View Class Report
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
