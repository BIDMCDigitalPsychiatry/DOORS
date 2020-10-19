import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import YourProgress from '../../general/YourProgress';
import { isEmpty } from '../../../helpers';
import { useSessionData } from '../../../database/useSessionData';
import { BlockListClassResource } from '../../general/BlockListClassResource';

const nextRoute = '/Post-Survey';

// {/*<ReactPlayer url={contentPath} controls={true} width={Math.min(width - 32, 640)} />*/}

export default function Lesson() {
  const { session, handleSaveSession } = useSessionData();
  const { classPresentations, completed } = session;

  const handleChangeRoute = useHandleChangeRoute();
  return (
    <Page title='Lessons' ActionButton={() => <YourProgress value={75} />}>
      <>
        {isEmpty(classPresentations) ? (
          <Typography>Lessons have not been added. Please contact your administrator or instructor to setup the lessons.</Typography>
        ) : (
          <>
            <Typography>View each of the following lessons prior to continuing:</Typography>
            <BlockListClassResource isOwner={false} viewLabel='View Lesson' value={classPresentations} />
          </>
        )}

        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={148} variant='secondary' onClick={handleChangeRoute('/Pre-Survey')}>
                Back
              </StyledButton>
            </Grid>
            <Grid item>
              {completed ? (
                <StyledButton width={148} onClick={handleChangeRoute(nextRoute)}>
                  Next
                </StyledButton>
              ) : (
                <StyledButton width={148} onClick={handleSaveSession(nextRoute)}>
                  Continue
                </StyledButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </>
    </Page>
  );
}
