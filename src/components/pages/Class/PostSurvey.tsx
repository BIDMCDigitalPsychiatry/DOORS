import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import SurveyQuestions from '../../general/SurveyQuestions';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import { useFullScreen } from '../../../hooks';
import YourProgress from '../../general/YourProgress';
import RankingModel from './RankingModel';
import { useSessionData } from '../../../database/useSessionData';

const nextRoute = '/Resources';

export default function PostSurvey() {
  const { session, handleChange, handleSaveSession } = useSessionData();
  const { completed, rankingModel = [], surveyQuestions = [] } = session;

  const handleChangeRoute = useHandleChangeRoute();

  const fs = useFullScreen();

  // Only allow continue if all questions have been answered
  const disabled = surveyQuestions.filter(sq => sq.postSurveyAnswer === undefined).length > 0;

  return (
    <Page title='Post-Survey' ActionButton={() => <YourProgress value={90} />}>
      <Grid container spacing={fs ? 2 : 4}>
        <Grid item xs={12} md={9}>
          <Typography>Complete the following survey again and see how you've improved.</Typography>

          <Typography>Don't worry if you don't see a big change, you can always take a lesson again!</Typography>
          <Box mt={4}>
            <SurveyQuestions
              readonly={completed === true}
              answerKey='postSurveyAnswer'
              lastAnswerKey='preSurveyAnswer'
              value={surveyQuestions}
              rankingModel={rankingModel}
              onChange={handleChange('surveyQuestions')}
            />
          </Box>
          <Box mt={4}>
            <Grid container spacing={2}>
              <Grid item>
                <StyledButton width={148} variant='secondary' onClick={handleChangeRoute('/Lessons')}>
                  Back
                </StyledButton>
              </Grid>
              <Grid item>
                {completed === true ? (
                  <StyledButton width={148} onClick={handleChangeRoute(nextRoute)}>
                    Next
                  </StyledButton>
                ) : (
                  <StyledButton disabled={disabled} width={148} onClick={handleSaveSession(nextRoute)}>
                    Continue
                  </StyledButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <RankingModel rankingModel={rankingModel} />
        </Grid>
      </Grid>
    </Page>
  );
}
