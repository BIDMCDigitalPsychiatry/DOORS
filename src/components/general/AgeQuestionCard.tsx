import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  header: ({ minHeight = 116 }: any) => ({
    minHeight,
    color: palette.common.black,
    padding: spacing(2)
  }),
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  circle: {
    borderRadius: 50,
    width: 156,
    height: 36,
    color: palette.primary.main,
    border: `2px solid ${palette.primary.main}`,
    cursor: 'pointer',
    '&:hover': {
      color: palette.common.white,
      background: palette.primary.light
    }
  },
  circleSelected: {
    borderRadius: 50,
    width: 156,
    height: 36,
    color: palette.common.white,
    border: `2px solid ${palette.primary.light}`,
    background: palette.primary.main,
    cursor: 'pointer'
  }
}));

export default function AgeQuestionCard({
  title = undefined,
  item = {} as any,
  index = undefined,
  className = undefined,
  titleProps = undefined,
  minHeight = undefined,
  rankingModel = [],
  onChange = undefined,
  children = undefined,
  ...rest
}) {
  const classes = useStyles({ minHeight });
  const { name } = item;
  const Title = title ? title : name ?? '';

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div className={classes.header}>
        {Title && (
          <Grid container spacing={1}>
            <Grid item xs>
              {Title && (
                <Typography noWrap gutterBottom variant='h5' color='primary' {...titleProps}>
                  {Title}
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2}>
          {rankingModel.map(rm => {
            const { id } = rm;
            const { preSurveyAnswer = {} } = item;
            const { id: selectedId } = preSurveyAnswer;
            return (
              <Grid item>
                <div className={id === selectedId ? classes.circleSelected : classes.circle} onClick={onChange({ ...item, preSurveyAnswer: rm })}>
                  <Tooltip title={name}>
                    <Typography variant='h5' align='center' color='inherit'>
                      {id}
                    </Typography>
                  </Tooltip>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Card>
  );
}
