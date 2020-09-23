import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, Grid } from '@material-ui/core';
import calendar from '../../../images/calendar.png';
import StyledButton from '../../general/StyledButton';
import { BlockListItem } from '../../general/BlockList';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  header: {
    color: palette.common.black,
    padding: spacing(2)
  },
  imageContainer: {
    marginTop: spacing(4),
    marginBottom: spacing(4),
    textAlign: 'center'
  },
  summary: {
    minHeight: 100,
    alignItems: 'center',
    color: palette.common.white,
    background: palette.primary.light,
    padding: spacing(1, 2, 1, 2)
  }
}));

export default function Session({
  name = 'Session Name Placeholder',
  title = 'Title Place Holder',
  image = calendar,
  keySkills = [] as BlockListItem[],
  className = undefined,
  onClick = undefined,
  rankingModel = [] as BlockListItem[],
  surveyQuestions = [] as BlockListItem[],
  classResources = [],
  classPresentation = undefined,
  ...rest
}) {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div className={classes.header}>
        <Typography noWrap gutterBottom variant='subtitle1' color='textSecondary'>
          {title}
        </Typography>
        <Typography noWrap gutterBottom variant='h6' color='textPrimary'>
          {name}
        </Typography>
      </div>
      <div className={classes.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <Grid container className={classes.summary} alignItems='center'>
        <Grid item>
          {keySkills.map(({ id, name }) => (
            <Typography key={id} component='h6' gutterBottom variant='subtitle1'>
              {name}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Box m={2} textAlign='center'>
        <StyledButton onClick={onClick}>View</StyledButton>
      </Box>
    </Card>
  );
}
