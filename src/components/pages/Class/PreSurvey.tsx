import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import { tables } from '../../../database/dbConfig';
import SurveyQuestions from '../../general/SurveyQuestions';
import useFormState from '../../hooks/useFormState';
import { useHandleChangeRoute, useLayoutKey } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import merge from 'deepmerge';
import AgeQuestionCard from '../../general/AgeQuestionCard';
import { defaultAgeRankingModels } from '../../../database/models/Class';
import { useFullScreen } from '../../../hooks';
import { useClassData } from '../../../database/useClassData';
import YourProgress from '../../general/YourProgress';
import RankingModel from './RankingModel';

const validate = () => {
  const newErrors = {};
  return newErrors;
};

// TODO: Add admin/instructor class data and merge logic for individual array items
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const nextRoute = '/Lesson';

export default function PreSurvey() {
  // For the first step, use whichever class data was activated from the dashboard.  The dashboard should handle injection of the session id into the id field
  const data = useLayoutKey('class');
  const { data: studentData, handleChange } = useClassData({ Model: tables.classesStudent }); // A
  const mergeData = merge(data, studentData, { arrayMerge: overwriteMerge }) as any;
  const { ageQuestion = { name: 'Which of the following best describes your age group?' }, rankingModel = [], surveyQuestions = [] } = mergeData;
  const { completed } = studentData; // Set a session id if one does not already exist

  const handleChangeRoute = useHandleChangeRoute();

  const { /*formState,*/ handleUpdate } = useFormState({ Model: tables.classesStudent, validate, onSuccess: handleChangeRoute(nextRoute) });
  //const { loading, errors } = formState;

  const handleAgeChange = React.useCallback(
    value => () => {
      handleChange('ageQuestion')({ target: { value } });
    },
    [handleChange]
  );

  const fs = useFullScreen();

  // Only allow continue if all questions have been answered
  const disabled = [...surveyQuestions, ageQuestion].filter(sq => sq.preSurveyAnswer === undefined).length > 0;

  return (
    <Page title='Pre-Survey' ActionButton={() => <YourProgress value={20} />}>
      <Grid container spacing={fs ? 2 : 4}>
        <Grid item xs={12} md={9}>
          <Typography>Before you start your lesson, please complete the following survey.</Typography>

          <Typography>This will help you keep track of all of the new things you will learn!</Typography>
          <Box mt={4}>
            <AgeQuestionCard
              readonly={completed === true}
              item={ageQuestion}
              minHeight={112}
              titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }}
              rankingModel={defaultAgeRankingModels}
              onChange={handleAgeChange}
            />
          </Box>
          <Box mt={4}>
            <SurveyQuestions
              readonly={completed === true}
              answerKey='preSurveyAnswer'
              value={surveyQuestions}
              rankingModel={rankingModel}
              onChange={handleChange('surveyQuestions')}
            />
          </Box>
          <Box mt={4}>
            {completed === true ? (
              <StyledButton width={148} disabled={disabled} onClick={handleChangeRoute(nextRoute)}>
                Next
              </StyledButton>
            ) : (
              <StyledButton width={148} disabled={disabled} onClick={handleUpdate(mergeData)}>
                Continue
              </StyledButton>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <RankingModel rankingModel={rankingModel} />
        </Grid>
      </Grid>
    </Page>
  );
}
