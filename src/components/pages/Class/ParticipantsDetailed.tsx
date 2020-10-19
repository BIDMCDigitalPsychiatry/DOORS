import * as React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import ParticipantDetailed from './ParticipantDetailed';

const useStyles = makeStyles(() => ({
  bold: {
    fontWeight: 'bold'
  }
}));

export const ParticipantsDetailed = ({ participants, label, ...other }) => {
  const classes = useStyles();
  return (
    <Grid container justify='flex-start' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' className={classes.bold}>
          {participants.length} {label}
        </Typography>
      </Grid>
      {participants.map((p, i) => (
        <Grid item key={p?.student?.id}>
          <ParticipantDetailed participant={p} mount={i === 0} {...other} />
        </Grid>
      ))}
    </Grid>
  );
};
