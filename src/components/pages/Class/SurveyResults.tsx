import * as React from 'react';
import { Box, Grid } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';

export default function SurveyResults({ title = 'Pre-Survey', surveyResults = [] }) {
  return (
    <ActionCard title={title} minHeight={0}>
      <Box pl={2} pr={2}>
        <Grid container spacing={1}>
          {surveyResults.map(({ question, value }, i) => (
            <Grid item xs={12} key={i}>
              <Grid container spacing={1} alignItems='center'>
                <Grid item xs>
                  {question}
                </Grid>
                <Grid item>
                  <CircleText text={value} width={64} />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ActionCard>
  );
}
