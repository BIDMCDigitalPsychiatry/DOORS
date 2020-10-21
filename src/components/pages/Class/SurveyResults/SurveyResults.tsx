import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionCard from '../../../general/ActionCard';
import CircleText from '../../../general/CircleText';
import ResultSummary from './ResultSummary';

export default function SurveyResults({ title = 'Pre-Survey', valueKey = 'pre', surveyResults = [] }) {
  return (
    <ActionCard title={title} minHeight={40}>
      <Box pl={2} pr={2}>
        <Grid container spacing={1}>
          {surveyResults.length === 0 && (
            <Grid item>
              <Typography>There are no survey results to display yet.</Typography>
            </Grid>
          )}
          {surveyResults.map((sr, i) => {
            const { question } = sr;
            const value = sr[`${valueKey}AnswersAverage`];
            const answers = sr[`${valueKey}Answers`];
            return (
              <Grid item xs={12} key={i}>
                <Grid container spacing={1} alignItems='center'>
                  <Grid item xs>
                    {question}
                  </Grid>
                  <Grid item>
                    <CircleText text={value} width={72} tooltip={<ResultSummary answers={answers} />} />
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ActionCard>
  );
}
