import * as React from 'react';
import clsx from 'clsx';
import { Card, Typography, makeStyles, Grid, Tooltip } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

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
    width: 36,
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
    width: 36,
    height: 36,
    color: palette.common.white,
    border: `2px solid ${palette.primary.light}`,
    background: palette.primary.main,
    cursor: 'pointer'
  },
  circleLast: {
    borderRadius: 50,
    width: 36,
    height: 36,
    color: grey[600],
    border: `2px solid ${grey[600]}`,
    cursor: 'pointer',
    '&:hover': {
      color: palette.common.white,
      background: palette.primary.light
    }
  },
  circleLastSelected: {
    borderRadius: 50,
    width: 36,
    height: 36,
    color: palette.common.white,
    border: `2px solid ${grey[600]}`,
    background: palette.primary.main,
    cursor: 'pointer'
  }
}));

export default function SurveyQuestionCard({
  title = undefined,
  item = {} as any,
  index = undefined,
  className = undefined,
  titleProps = undefined,
  minHeight = undefined,
  rankingModel = [],
  onChange = undefined,
  answerKey,
  lastAnswerKey = undefined,
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

            const answer = item[answerKey] ?? {};
            const { id: selectedId } = answer;

            const lastAnswer = selectedId ? item[lastAnswerKey] ?? {} : {}; // Only show last answer if answer is selected
            const { id: lastSelectedId } = lastAnswer;

            return (
              <Grid item key={id}>
                <>
                  <div
                    className={
                      id === selectedId && id === lastSelectedId
                        ? classes.circleLastSelected
                        : id === selectedId && id !== lastSelectedId
                        ? classes.circleSelected
                        : id !== selectedId && id === lastSelectedId
                        ? classes.circleLast
                        : classes.circle
                    }
                    onClick={onChange && onChange({ ...item, [`${answerKey}`]: rm })}
                  >
                    <Tooltip open={lastSelectedId === id} title={'Last Answer'}>
                      <Typography variant='h5' align='center' color='inherit'>
                        {Number(id) + 1}
                      </Typography>
                    </Tooltip>
                  </div>
                </>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Card>
  );
}
