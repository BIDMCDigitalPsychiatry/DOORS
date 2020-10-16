import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid, Box } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { getDateFromTimestamp } from '../../../helpers';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as AddStudentDialog from '../../application/GenericDialog/AddStudent';
import * as MarkAttendanceDialog from '../../application/GenericDialog/MarkAttendance';
import useGroupStudents from '../../../database/useGroupStudents';
import { Participants } from './Participants';
import { useClassData } from '../../../database/useLocationData';
import { tables } from '../../../database/dbConfig';
import { createAttendanceKey } from '../../../database/models/Attendance';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import MarginDivider from '../../application/DialogField/MarginDivider';

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
  createdOn: {
    marginTop: 12,
    fontWeight: 500
  }
}));

export default function Group({
  mount = false,
  id = undefined,
  userId = undefined,
  instructorId = undefined,
  sessionId = undefined,
  name = 'Group Name',
  location = 'Unknown Location',
  type = 'Unknown Type',
  created = undefined,
  className = undefined
}) {
  const classes = useStyles();
  const { data } = useClassData({ Model: tables.classesAdmin });

  const { pendingStudents, deletedStudents, activeStudents, handleRefresh } = useGroupStudents({ groupId: id });
  const changeRouteLayout = useHandleChangeRouteLayout();

  return (
    <Card className={clsx(classes.root, className)}>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={2} className={classes.summary}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography variant='h6' className={classes.semibold}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className={classes.semibold}>
                Group Location: {location}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className={classes.semibold}>
                Group Type: {type}
              </Typography>
            </Grid>
            {created && (
              <Grid item xs={12}>
                <Typography variant='body2' className={classes.createdOn}>
                  Created on {getDateFromTimestamp(created)}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={10} className={classes.details}>
          <Grid container justify='space-between' spacing={2}>
            <Grid item xs>
              {[
                { students: activeStudents, label: 'Class Participants' },
                { students: pendingStudents, label: 'Pending Invites (Not Accepted)' },
                { students: deletedStudents, label: 'Archived Students' }
              ]
                .filter(i => i.students.length > 0)
                .map((props, i) => (
                  <Box key={i} mb={1}>
                    {i !== 0 && <MarginDivider />}
                    <Participants onRefresh={handleRefresh} {...props} />
                  </Box>
                ))}
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={4} xl={3} className={classes.actions}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DialogButton
                    Module={AddStudentDialog}
                    mount={mount}
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
                      id: createAttendanceKey(data?.class?.id, id),
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
                      groupId: id
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
