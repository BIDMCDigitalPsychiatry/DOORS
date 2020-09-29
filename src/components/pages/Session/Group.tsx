import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  summary: {
    width: 151,
    padding: spacing(1),
    background: palette.primary.light,
    color: palette.common.white
  },
  actions: {
    width: 270,
    padding: spacing(1),
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
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
  }
}));

export default function Group({
  id = undefined,
  userId = undefined,
  instructorId = undefined,
  sessionId = undefined,
  name = 'Group Name',
  location = undefined,
  type = undefined,

  //actionLabel = 'View',
  //onClick = undefined,
  className = undefined,
  //titleProps = undefined,
  //minHeight = undefined,
  //disabled = undefined,
  //onLock = undefined,
  //onRemove = undefined,
  //onEdit = undefined,
  ...rest
}) {
  const classes = useStyles();
  //const handleLock = React.useCallback(item => () => onLock && onLock(item), [onLock]);
  //const handleRemove = React.useCallback(item => () => onRemove && onRemove(item), [onRemove]);
  //const handleEdit = React.useCallback(item => () => onEdit && onEdit(item), [onEdit]);
  //const isAdminMode = useIsAdminMode();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Grid container>
        <Grid item className={classes.summary}>
          <Typography variant='h6' className={classes.semibold}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs className={classes.details}>
          <Grid container justify='space-between' spacing={1}>
            <Grid item xs>
              <Typography variant='subtitle1' className={classes.bold}>
                X Class Participants
              </Typography>
            </Grid>
            <Grid item className={classes.actions}>
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
