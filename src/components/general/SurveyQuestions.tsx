import * as React from 'react';
import { Grid, Box } from '@material-ui/core';
import { BlockListItem } from './BlockList';
import SurveyQuestionCard from './SurveyQuestionCard';

export interface SurveyQuestionItem extends BlockListItem {
  preSurveyAnswer: string;
  postSurveyAnswer: string;
}

export default function SurveyQuestions({ value = [], rankingModel = [], showIndexBadges = undefined, onChange }) {
  const value_str = JSON.stringify(value);

  const handleChange = React.useCallback(
    item => () => {
      const value = JSON.parse(value_str);
      const index = value.findIndex(v => v.id === item.id);
      if (index >= 0) {
        value[index] = item;
      }
      onChange({ target: { value } });
    },
    [value_str, onChange]
  );

  return (
    <>
      <Box mt={1}>
        <Grid container spacing={2}>
          {value.map((item, i) => (
            <Grid key={i} item lg={4} sm={6} xs={12}>
              <SurveyQuestionCard
                item={item}
                index={showIndexBadges && i}
                minHeight={112}
                titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }}
                rankingModel={rankingModel}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
