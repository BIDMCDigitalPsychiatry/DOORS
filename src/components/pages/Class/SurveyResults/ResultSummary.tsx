import * as React from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import StudentSummary from './StudentSummary';

export default function ResultSummary({ answers = [] }) {
  return (
    <Box width={240}>
      <Typography>
        {answers.length} result set{answers.length === 1 ? '' : 's'} provided
      </Typography>
      {answers.length > 0 && <Divider style={{ background: 'white', marginBottom: 8 }} />}
      <Grid container>
        {answers.map(answer => (
          <Grid item xs={12}>
            <StudentSummary session={answer.session} value={answer.value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
