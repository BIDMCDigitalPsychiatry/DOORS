import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';
import { tables } from '../../../database/dbConfig';
import SurveyQuestions from '../../general/SurveyQuestions';
import useFormState from '../../hooks/useFormState';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import merge from 'deepmerge';
import AgeQuestionCard from '../../general/AgeQuestionCard';
import { defaultAgeRankingModels } from '../../../database/models/Class';
import { useFullScreen } from '../../../hooks';
import { useClassData } from '../../../database/useClassData';
import YourProgress from '../../general/YourProgress';

const validate = ({ name }) => {
  const newErrors = {};
  return newErrors;
};

// TODO: Add admin/instructor class data and merge logic for individual array items
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

export default function PreSurvey() {
  const { data /*, handleChange*/ } = useClassData({ Model: tables.classesAdmin });
  const { data: studentData, handleChange } = useClassData({ Model: tables.classesStudent });
  const mergeData = merge(data, studentData, { arrayMerge: overwriteMerge }) as any;
  const { ageQuestion = { name: 'Which of the following best describes your age group?' }, rankingModel = [], surveyQuestions = [] } = mergeData;

  const handleChangeRoute = useHandleChangeRoute();

  const { /*formState,*/ handleUpdate } = useFormState({ Model: tables.classesStudent, validate, onSuccess: handleChangeRoute('/Lesson') });
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
    <Page title='Pre-Survey'>
      <Grid container spacing={fs ? 2 : 4}>
        <Grid item xs={12} md={9}>
          <Typography>Before you start your lesson, please complete the following survey.</Typography>

          <Typography>This will help you keep track of all of the new things you will learn!</Typography>
          <Box mt={4}>
            <AgeQuestionCard
              item={ageQuestion}
              minHeight={112}
              titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }}
              rankingModel={defaultAgeRankingModels}
              onChange={handleAgeChange}
            />
          </Box>
          <Box mt={4}>
            <SurveyQuestions answerKey='preSurveyAnswer' value={surveyQuestions} rankingModel={rankingModel} onChange={handleChange('surveyQuestions')} />
          </Box>
          <Box mt={4}>
            <StyledButton disabled={disabled} onClick={handleUpdate(mergeData)}>
              Continue
            </StyledButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <YourProgress value={25} />
          <ActionCard title='Ranking Model' minHeight={0}>
            <Box pl={2} pr={2}>
              <Grid container spacing={1}>
                {rankingModel.map(({ id, name }) => (
                  <Grid item xs={12} key={id}>
                    <Grid container spacing={1} alignItems='center'>
                      <Grid item>
                        <CircleText text={Number(id) + 1} />
                      </Grid>
                      <Grid item xs>
                        {name}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </ActionCard>
        </Grid>
      </Grid>
    </Page>
  );
}
