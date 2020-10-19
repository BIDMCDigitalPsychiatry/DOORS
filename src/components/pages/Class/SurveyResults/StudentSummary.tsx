import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useProfile } from '../../../../database/useProfile';

export default function StudentSummary({ session, value }) {
  const { profile = {} } = useProfile({ id: session?.studentUserId });
  const { name } = profile;

  return (
    <Grid container justify='space-between' spacing={2}>
      <Grid item xs zeroMinWidth>
        <Typography noWrap>{name ?? 'Unknown student'}</Typography>
      </Grid>
      <Grid item>
        <Typography>{value}</Typography>
      </Grid>
    </Grid>
  );
}
