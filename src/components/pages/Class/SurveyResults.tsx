import * as React from 'react';
import { Box, Grid } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';

export default function SurveyResults({ title = 'Pre-Survey', surveyQuestions = [] }) {
  return (
    <ActionCard title={title} minHeight={0}>
      <Box pl={2} pr={2}>
        <Grid container spacing={1}>
          {surveyQuestions.map(({ id, name }) => (
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
  );
}
