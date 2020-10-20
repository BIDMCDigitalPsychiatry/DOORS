import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, Grid, Tooltip } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { BlockListItem } from '../../general/BlockList';
import { getImage } from './helpers';
import { timeAgo } from '../../../helpers';
import ClassStatusChip, { getClassStatusLabel } from './ClassStatusChip';

const minHeight = 96;
const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    minHeight: 450
  },
  header: {
    color: palette.common.black,
    padding: spacing(2),
    minHeight
  },
  imageContainer: {
    marginTop: spacing(4),
    textAlign: 'center',
    marginBottom: spacing(4)
  },
  summary: {
    minHeight: 124,
    alignItems: 'center',
    color: palette.common.white,
    background: palette.primary.light,
    padding: spacing(1, 2, 1, 2)
  }
}));

const KeySkills = ({ keySkills }) => {
  return keySkills.map(({ id, name }) => (
    <Typography key={id} component='h6' gutterBottom variant='subtitle1'>
      {name}
    </Typography>
  ));
};

const maxKeySkills = 3;

export default function Class({
  inProgress = false,
  isAvailable = false,
  buttonLabel = 'View',
  buttonLabel2 = undefined,
  headline = '',
  name = '',
  updated = undefined,
  created = undefined,
  completed,
  showUpdated = false,
  image = 'calendar',
  keySkills = [] as BlockListItem[],
  className = undefined,
  onClick = undefined,
  onClick2 = undefined,
  rankingModel = [] as BlockListItem[],
  surveyQuestions = [] as BlockListItem[],
  classResources = [],
  classPresentation = undefined,
  showChildClasses = false,
  childClasses = [],
  ...rest
}) {
  const classes = useStyles();
  const filteredKeySkills = keySkills.filter((ks, i) => i < maxKeySkills);
  const moreKeySkills = keySkills.filter((ks, i) => i >= maxKeySkills);

  return (
    <Card className={clsx(classes.root, className)}>
      <div className={classes.header}>
        <Grid container justify='space-between'>
          <Grid item>
            <Typography noWrap gutterBottom variant='subtitle1' color='textSecondary'>
              {headline}
            </Typography>
            <Typography noWrap gutterBottom variant='h6' color='textPrimary'>
              {name}
            </Typography>
          </Grid>
          {completed ? (
            <Grid item>
              <ClassStatusChip label={getClassStatusLabel('Completed', 1)} />
            </Grid>
          ) : inProgress ? (
            <Grid item>
              <ClassStatusChip inProgress={inProgress} label={getClassStatusLabel('In Progress', 1)} />
            </Grid>
          ) : isAvailable ? (
            <Grid item>
              <ClassStatusChip isAvailable={isAvailable} label={getClassStatusLabel('Available', 1)} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </div>
      <div className={classes.imageContainer}>
        <img src={getImage(image)} alt={headline} />
      </div>
      <Grid container className={classes.summary} alignItems='center'>
        <Grid item>
          {keySkills.length <= maxKeySkills + 1 ? (
            <KeySkills keySkills={keySkills} />
          ) : (
            <>
              <KeySkills keySkills={filteredKeySkills} />
              {moreKeySkills.length > 0 && (
                <Tooltip title={<KeySkills keySkills={moreKeySkills} />}>
                  <Typography>
                    {moreKeySkills.length} Additional Key Skill{moreKeySkills.length === 1 ? '' : 's'}
                  </Typography>
                </Tooltip>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Box m={2} textAlign='center'>
        <Grid container justify='center' spacing={2}>
          <Grid item>
            <StyledButton onClick={onClick}>{buttonLabel}</StyledButton>
          </Grid>
          {buttonLabel2 && (
            <Grid item>
              <StyledButton onClick={onClick2}>{buttonLabel2}</StyledButton>
            </Grid>
          )}
        </Grid>
      </Box>
      <Grid container style={{ paddingLeft: 8, paddingRight: 8 }} justify='space-between'>
        <Grid item>
          {showUpdated && (
            <Typography noWrap align='right' variant='caption' color='textPrimary'>
              {`Last updated ${timeAgo(updated ?? created)}`}
            </Typography>
          )}
          {completed && (
            <Typography noWrap align='right' variant='caption' color='textPrimary'>
              {`Completed ${timeAgo(updated ?? created)}`}
            </Typography>
          )}
        </Grid>
        <Grid item>
          {(showChildClasses || childClasses.length > 0) && (
            <Typography variant='caption'>
              {childClasses.length} Instructor{childClasses.length === 1 ? '' : 's'}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
