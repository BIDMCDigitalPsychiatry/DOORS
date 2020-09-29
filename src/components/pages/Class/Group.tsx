import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { getDateFromTimestamp } from '../../../helpers';
import DialogButton from '../../application/GenericDialog/DialogButton';
import * as AddStudentDialog from '../../application/GenericDialog/AddStudent';
import useGroupStudents from '../../../database/useGroupStudents';
import { Participants } from './Participants';

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

  const { pendingStudents, activeStudents, handleRefresh } = useGroupStudents({ groupId: id });

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
                { students: pendingStudents, label: 'Pending Invites (Not Accepted)' }
              ]
                .filter(i => i.students.length > 0)
                .map((props, i) => (
                  <Participants key={i} {...props} />
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
                  <StyledButton fullWidth={true} onClick={() => alert('To be completed')}>
                    Mark Attendance
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton variant='secondary' fullWidth={true} onClick={() => alert('To be completed')}>
                    View Attendance History
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton variant='secondary' fullWidth={true} onClick={() => alert('To be completed')}>
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
