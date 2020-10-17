import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { isEmpty } from '../../../../helpers';

export default function KeySkills({ keySkills }) {
  return (
    <>
      <Typography variant='h6' style={{ fontWeight: 'bold' }}>
        Key Skills:
      </Typography>
      <Box mt={1} ml={1} mb={3}>
        {keySkills
          .filter(s => !isEmpty(s))
          .map(({ id, name }, i) => (
            <Typography key={`${name}-${id}`} variant='subtitle1'>
              • {name}
            </Typography>
          ))}
      </Box>
    </>
  );
}
