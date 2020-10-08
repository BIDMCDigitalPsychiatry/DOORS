import * as React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../Page';
import ReactPlayer from 'react-player';
import { useHandleChangeRoute, useWidth } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import YourProgress from '../../general/YourProgress';

export default function Lesson() {
  const contentPath = 'https://www.youtube.com/watch?v=T8IcC45LRnI';
  const width = useWidth();
  const handleChangeRoute = useHandleChangeRoute();
  return (
    <Page title='Lesson' ActionButton={() => <YourProgress value={75} />}>
      <Grid container justify='center' spacing={3}>
        <Grid item>
          <ReactPlayer url={contentPath} controls={true} width={Math.min(width - 32, 640)} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={128} variant='secondary' onClick={handleChangeRoute('/Pre-Survey')}>
                Back
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton width={128} onClick={handleChangeRoute('/Post-Survey')}>
                Continue
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
