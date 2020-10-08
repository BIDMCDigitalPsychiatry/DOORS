import React from 'react';
import { Box, Typography } from '@material-ui/core';
import BorderLinearProgress from './BorderLinearProgress';

export default function ({ value }) {
  return (
    <Box mt={1} mb={1}>
      <Typography>Your Progress</Typography>
      <Box mt={1} mb={1}>
        <BorderLinearProgress value={value} />
      </Box>
    </Box>
  );
}
