import * as React from 'react';
import { Box, Grid } from '@material-ui/core';
import Page from '../Page';
import { useWidth } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import YourProgress from '../../general/YourProgress';
import ReactPlayer from 'react-player';

export default function Lesson({ presentation, onBack }) {
  const { name, link } = presentation;
  const width = useWidth();

  return (
    <Page title={name} ActionButton={() => <YourProgress value={75} />}>
      <>
        <ReactPlayer url={link} controls={true} width={Math.min(width - 32, 640)} />
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={148} onClick={onBack}>
                Done
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </>
    </Page>
  );
}
