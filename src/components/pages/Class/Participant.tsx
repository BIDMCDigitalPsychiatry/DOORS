import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
import DialogButton from '../../application/GenericDialog/DialogButton';
import { getStudentName, isEmpty, minutesFrom, minutesToTimeAgo } from '../../../helpers';
import { useProfile } from '../../../database/useProfile';

const useStyles = makeStyles(({}) => ({
  root: {
    display: 'flex',
    width: 128
  }
}));

export default function Participant({ student, className = undefined, ...rest }) {
  const classes = useStyles();
  const [profile] = useProfile({ id: student?.userId });

  console.log({ student, profile });

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
        {!isEmpty(student?.userId) && (
          <Grid item>
            <DialogButton variant='link' underline='always' linkVariant='body2' fullWidth>
              View Profile
            </DialogButton>
          </Grid>
        )}
        {student.accepted === true ? (
          <Grid item>
            <DialogButton variant='link' underline='always' linkVariant='body2' fullWidth>
              Remove
            </DialogButton>
          </Grid>
        ) : (
          <Typography variant='caption'>Sent {minutesToTimeAgo(minutesFrom(student?.created))}</Typography>
        )}
      </Grid>
    </div>
  );
}
