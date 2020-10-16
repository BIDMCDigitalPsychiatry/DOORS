import * as React from 'react';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';

const ResultSummary = ({ answers = [] }) => {
  return (
    <>
      <Typography>
        {answers.length} answer{answers.length === 1 ? '' : 's'} provided
      </Typography>
      {answers.length > 0 && <Divider style={{ background: 'white', marginBottom: 8 }} />}
      <Grid container>
        {answers.map(answer => (
          <Grid item xs={12}>
            <Grid container justify='space-between'>
              <Grid item>{answer.studentId ?? 'Unknown student'}</Grid>
              <Grid item>{answer.value}</Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default function SurveyResults({ title = 'Pre-Survey', valueKey = 'pre', surveyResults = [] }) {
  return (
    <ActionCard title={title} minHeight={0}>
      <Box pl={2} pr={2}>
        <Grid container spacing={1}>
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
