import * as React from 'react';
import { Box, Grid } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import CircleText from '../../general/CircleText';

export default function RankingModel({ rankingModel = [] }) {
  return (
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
  );
}
