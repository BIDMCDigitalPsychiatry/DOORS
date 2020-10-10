import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';
import { useClassData } from '../../../database/useClassData';
import { tables } from '../../../database/dbConfig';
import SurveyQuestions from '../../general/SurveyQuestions';
import useFormState from '../../hooks/useFormState';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import merge from 'deepmerge';
import { useFullScreen } from '../../../hooks';
import YourProgress from '../../general/YourProgress';

const validate = ({ name }) => {
  const newErrors = {};
  return newErrors;
};

// TODO: Add admin/instructor class data and merge logic for individual array items
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

const nextRoute = '/Resources';

export default function PostSurvey() {
  const { data /*, handleChange*/ } = useClassData({ Model: tables.classesAdmin });
  const { data: studentData, handleChange } = useClassData({ Model: tables.classesStudent });
  const mergeData = merge(data, studentData, { arrayMerge: overwriteMerge }) as any;
  const { rankingModel = [], surveyQuestions = [] } = mergeData;

  const { completed } = studentData;

  const handleChangeRoute = useHandleChangeRoute();

  const { /*formState,*/ handleUpdate } = useFormState({ Model: tables.classesStudent, validate, onSuccess: handleChangeRoute(nextRoute) });
  //const { loading, errors } = formState;

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
                <StyledButton width={148} variant='secondary' onClick={handleChangeRoute('/Lesson')}>
                  Back
                </StyledButton>
              </Grid>
              <Grid item>
                {completed === true ? (
                  <StyledButton width={148} onClick={handleChangeRoute(nextRoute)}>
                    Next
                  </StyledButton>
                ) : (
                  <StyledButton disabled={disabled} width={148} onClick={handleUpdate(mergeData)}>
                    Continue
                  </StyledButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
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
