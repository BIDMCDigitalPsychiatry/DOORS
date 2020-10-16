import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import YourProgress from '../../general/YourProgress';
import StyledButton from '../../general/StyledButton';
import { useHandleChangeRoute } from '../../layout/hooks';
import { BlockListClassResource } from '../../general/BlockListClassResource';
import { useSessionData } from '../../../database/useSessionData';

const nextRoute = '/Congratulations';

export default function Resources() {
  const handleChangeRoute = useHandleChangeRoute();
  const { session, handleSaveCompleteSession } = useSessionData();
  const { classResources, completed } = session;

  return (
    <Page title='Resources' ActionButton={() => <YourProgress value={100} />}>
      <>
        <Typography>You can visit the following resources to complement your learning and practice your skills.</Typography>
        <BlockListClassResource value={classResources} />
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={148} variant='secondary' onClick={handleChangeRoute('/Post-Survey')}>
                Back
              </StyledButton>
            </Grid>

            <Grid item>
              {completed !== true ? (
                <StyledButton width={148} onClick={handleSaveCompleteSession(nextRoute)}>
                  End Session
                </StyledButton>
              ) : (
                <StyledButton width={148} onClick={handleChangeRoute('/Classes')}>
                  My Classes
                </StyledButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </>
    </Page>
  );
}
