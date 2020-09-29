import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import Participant from './Participant';
import { getDateFromTimestamp } from '../../../helpers';

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
  id = undefined,
  userId = undefined,
  instructorId = undefined,
  sessionId = undefined,
  name = 'Group Name',
  location = 'Unknown Location',
  type = 'Unknown Type',
  created = undefined,
  className = undefined,
  ...rest
}) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
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
          <Grid container justify='space-between' spacing={1}>
            <Grid item xs>
              <Grid container justify='flex-start' spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='subtitle1' className={classes.bold}>
                    X Class Participants
                  </Typography>
                </Grid>
                <Grid item>
                  <Participant />
                </Grid>
                <Grid item>
                  <Participant />
                </Grid>
                <Grid item>
                  <Participant />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={4} xl={3} className={classes.actions}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <StyledButton fullWidth={true}>Add New Student</StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton fullWidth={true}>Mark Attendance</StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton variant='secondary' fullWidth={true}>
                    View Attendance History
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton variant='secondary' fullWidth={true}>
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
