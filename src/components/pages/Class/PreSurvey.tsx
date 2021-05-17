import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import SurveyQuestions from '../../general/SurveyQuestions';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import AgeQuestionCard from '../../general/AgeQuestionCard';
import { defaultAgeRankingModels } from '../../../database/models/Class';
import { useFullScreen } from '../../../hooks';
import YourProgress from '../../general/YourProgress';
import RankingModel from './RankingModel';
import { ageQuestionLabel } from '../../../constants';
import { useSessionData } from '../../../database/useSessionData';

const nextRoute = '/Lessons';

export default function PreSurvey() {
  const { session, handleChange, handleSaveSession } = useSessionData();
  const { ageQuestion = { name: ageQuestionLabel }, rankingModel = [], surveyQuestions = [] } = session;
  const readonly = session?.completed === true;

  const handleChangeRoute = useHandleChangeRoute();

  const handleAgeChange = React.useCallback(value => () => handleChange('ageQuestion')({ target: { value } }), [handleChange]);

  const fs = useFullScreen();

  // Only allow continue if all questions have been answered
  const disabled = [...surveyQuestions, ageQuestion].filter(sq => sq.preSurveyAnswer === undefined).length > 0;

  return (
    <Page title='Pre-Survey' ActionButton={() => <YourProgress value={20} />}>
      <Grid container spacing={fs ? 2 : 4}>
        {fs && (
          <Grid item xs={12} md={3}>
            <RankingModel rankingModel={rankingModel} />
          </Grid>
        )}
        <Grid item xs={12} md={9}>
          <Typography>Before you start your lesson, please complete the following survey.</Typography>

          <Typography>This will help you keep track of all of the new things you will learn!</Typography>
          <Box mt={4}>
            <AgeQuestionCard
              readonly={readonly}
              item={ageQuestion}
              minHeight={112}
              titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }}
              rankingModel={defaultAgeRankingModels}
              onChange={handleAgeChange}
            />
          </Box>
          <Box mt={4}>
            <SurveyQuestions
              readonly={readonly}
              answerKey='preSurveyAnswer'
              value={surveyQuestions}
              rankingModel={rankingModel}
              onChange={handleChange('surveyQuestions')}
            />
          </Box>
          <Box mt={4}>
            {readonly ? (
              <StyledButton width={148} disabled={disabled} onClick={handleChangeRoute(nextRoute)}>
                Next
              </StyledButton>
            ) : (
              <StyledButton width={148} disabled={disabled} onClick={handleSaveSession(nextRoute)}>
                Continue
              </StyledButton>
            )}
          </Box>
        </Grid>
        {!fs && (
          <Grid item xs={12} md={3}>
            <RankingModel rankingModel={rankingModel} />
          </Grid>
        )}
      </Grid>
    </Page>
  );
}
