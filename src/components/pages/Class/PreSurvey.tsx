import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import ActionCard from '../../general/ActionCard';
import { defaultRankingModels } from '../../../database/models/Class';
import CircleText from '../../general/CircleText';

export default function PreSurvey() {
  return (
    <Page title='Pre-Survey'>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Typography>Before you start your lesson, please complete the following survey.</Typography>

          <Typography>This will help you keep track of all of the new things you will learn.</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <ActionCard title='Ranking Model' minHeight={0}>
            <Box pl={2} pr={2}>
            <Grid container spacing={1}>
              {defaultRankingModels.map(({ id, name }) => (
                <Grid item xs={12} key={id}>
                  <Grid container spacing={1} alignItems='center'>
                    <Grid item>
                      <CircleText text={Number(id) + 1} />
                    </Grid>
                    <Grid item xs>{name}</Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid></Box>
          </ActionCard>
        </Grid>
      </Grid>
    </Page>
  );
}
