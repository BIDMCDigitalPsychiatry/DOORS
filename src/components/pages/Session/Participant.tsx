import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
import DialogButton from '../../application/GenericDialog/DialogButton';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    display: 'flex',
    width: 128
  }
}));

export default function Participant({
  id = undefined, // Profile id
  userId = undefined, // User id
  picture = undefined, // profile picture
  name = 'Student Name', // full name of user
  className = undefined,
  ...rest
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container alignItems='center' justify='center' spacing={0}>
        <Grid item>
          <Avatar src='/broken-image.jpg' />
        </Grid>
        <Grid item xs={12}>
          <Typography align='center' variant='subtitle2'>
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <DialogButton variant='link' underline='always' linkVariant='body2' fullWidth>
            View Profile
          </DialogButton>
        </Grid>
        <Grid item>
          <DialogButton variant='link' underline='always' linkVariant='body2' fullWidth>
            Remove
          </DialogButton>
        </Grid>
      </Grid>
    </div>
  );
}
