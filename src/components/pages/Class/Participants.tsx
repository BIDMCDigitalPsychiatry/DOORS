import * as React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import Participant from './Participant';

const useStyles = makeStyles(({ palette, spacing }) => ({
  bold: {
    fontWeight: 'bold'
  }
}));

export const Participants = ({ students, label }) => {
  const classes = useStyles();
  return (
    <Grid container justify='flex-start' spacing={2}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' className={classes.bold}>
          {students.length} {label}
        </Typography>
      </Grid>
      {students.map((s, i) => (
        <Grid item key={s?.id}>
          <Participant student={s} mount={i === 0} />
        </Grid>
      ))}
    </Grid>
  );
};
