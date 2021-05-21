import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import YourProgress from '../../general/YourProgress';
import { isEmpty } from '../../../helpers';
import { useSessionData } from '../../../database/useSessionData';
import { BlockListClassResource } from '../../general/BlockListClassResource';
import Lesson from './Lesson';
import { useIsInstructorImpersonationMode } from '../../../hooks';

const nextRoute = '/Post-Survey';

export default function Lessons() {
  const { session, handleSaveSession, updateData } = useSessionData();
  const { classPresentations = [], viewedPresentations = [], completed } = session;

  const presentations = classPresentations.filter(c => c.deleted !== true); // Ensure we are only showing presentations that are not deleted

  var allViewed = true;
  var isInstrcutorImpersonation = useIsInstructorImpersonationMode();

  if (!isInstrcutorImpersonation) {
    // Only require viewing for students
    presentations.forEach(p => {
      if (!viewedPresentations.find(id => id === p.id)) allViewed = false;
    });
  }

  const [contentId, setContentId] = React.useState();

  const handleChangeRoute = useHandleChangeRoute();

  const viewedPresentations_str = JSON.stringify(viewedPresentations);
  const handleLink = React.useCallback(
    item => () => {
      const { id } = item;
      const viewedPresentations = JSON.parse(viewedPresentations_str);
      if (!viewedPresentations.includes(id)) {
        updateData({ viewedPresentations: [...viewedPresentations, id] }); // If the user hasn't viewed this presentation yet, mark it as viewed and save
      }
      setContentId(id);
    },
    [setContentId, updateData, viewedPresentations_str]
  );

  const presentation = presentations.find(p => p.id === contentId);

  return presentation ? (
    <Lesson presentation={presentations.find(cp => cp.id === contentId)} onBack={() => setContentId(undefined)} />
  ) : (
    <Page title='Lessons' ActionButton={() => <YourProgress value={75} />}>
      <>
        {isEmpty(presentations) ? (
          <Typography>Lessons have not been added. Please contact your administrator or instructor to setup the lessons.</Typography>
        ) : (
          <>
            <Typography>View each of the following lessons prior to continuing:</Typography>
            <BlockListClassResource
              enableLock={false}
              handleLink={handleLink}
              isOwner={false}
              viewLabel='View Lesson'
              value={presentations}
              viewed={viewedPresentations}
            />
          </>
        )}

        <Box mt={3}>
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
                <StyledButton disabled={!allViewed} width={148} onClick={handleSaveSession(nextRoute)}>
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
