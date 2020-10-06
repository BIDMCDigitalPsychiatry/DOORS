import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';
import { useLocationData } from '../../../database/useLocationData';
import { tables } from '../../../database/dbConfig';
import SurveyQuestions from '../../general/SurveyQuestions';
import useFormState from '../../hooks/useFormState';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import merge from 'deepmerge';

const validate = ({ name }) => {
  const newErrors = {};
  return newErrors;
};

// TODO: Add admin/instructor class data and merge logic for individual array items
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

export default function PreSurvey() {
  const { data /*, handleChange*/ } = useLocationData({ Model: tables.classesAdmin });
  const { data: studentData, handleChange } = useLocationData({ Model: tables.classesStudent });
  const mergeData = merge(data, studentData, { arrayMerge: overwriteMerge }) as any;
  const { rankingModel = [], surveyQuestions = [] } = mergeData;

  const handleChangeRoute = useHandleChangeRoute();

  const { /*formState,*/ handleUpdate } = useFormState({ Model: tables.classesStudent, validate, onSuccess: handleChangeRoute('/Lesson') });
  //const { loading, errors } = formState;

  return (
    <Page title='Pre-Survey'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Typography>Before you start your lesson, please complete the following survey.</Typography>

          <Typography>This will help you keep track of all of the new things you will learn!</Typography>

          <Box mt={4}>
            <SurveyQuestions value={surveyQuestions} rankingModel={rankingModel} onChange={handleChange('surveyQuestions')} />
          </Box>
          <Box mt={4}>
            <StyledButton onClick={handleUpdate(mergeData)}>Continue</StyledButton>
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
