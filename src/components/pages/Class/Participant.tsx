import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
import DialogButton from '../../application/GenericDialog/DialogButton';
import { getStudentName, isEmpty, minutesFrom, minutesToTimeAgo } from '../../../helpers';
import { useProfile } from '../../../database/useProfile';
import * as ProfileDialog from '../../application/GenericDialog/Profile';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: 148
  }
}));

export default function Participant({ student, className = undefined, view = true, remove = true, mount = true, ...rest }) {
  const classes = useStyles();
  const { profile } = useProfile({ id: student?.userId });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container alignItems='center' justify='center' spacing={0}>
        <Grid item>
          <Avatar src='/broken-image.jpg' />
        </Grid>
        <Grid item xs={12}>
          <Typography noWrap align='center' variant='subtitle2'>
            {getStudentName({ student, profile })}
          </Typography>
        </Grid>
        {view && !isEmpty(student?.userId) && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <DialogButton
              Module={ProfileDialog}
              mount={mount}
              initialValues={{ id: student?.userId }}
              variant='link'
              underline='always'
              linkVariant='body2'
              fullWidth
            >
              View Profile
            </DialogButton>
          </Grid>
        )}
        {student.accepted === true
          ? remove && (
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <DialogButton onClick={() => alert('To be implemented')} variant='link' underline='always' linkVariant='body2' fullWidth>
                  Remove
                </DialogButton>
              </Grid>
            )
          : view && <Typography variant='caption'>Sent {minutesToTimeAgo(minutesFrom(student?.created))}</Typography>}
      </Grid>
    </div>
  );
}
