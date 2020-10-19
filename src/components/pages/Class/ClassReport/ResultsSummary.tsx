import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import MarginDivider from '../../../application/DialogField/MarginDivider';
import AgeChart from '../AgeChart';
import SurveyResults from '../SurveyResults/SurveyResults';

export default function ResultsSummary({ title = 'Average Group Answers', results, ageQuestionData }) {
  return (
    <>
      <Typography variant='h6'>{title}</Typography>
      <MarginDivider />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AgeChart data={ageQuestionData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SurveyResults title='Pre-Survey (Averages)' surveyResults={results} valueKey='pre' />
        </Grid>
        <Grid item xs={12} md={4}>
          <SurveyResults title='Post-Survey (Averages)' surveyResults={results} valueKey='post' />
        </Grid>
      </Grid>
    </>
  );
}
