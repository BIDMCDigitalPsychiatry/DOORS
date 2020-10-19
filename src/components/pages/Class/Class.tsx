import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, Grid, Divider } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { BlockListItem } from '../../general/BlockList';
import { getImage } from './helpers';
import { timeAgo } from '../../../helpers';
import DialogButton from '../../application/GenericDialog/DialogButton';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import { useProfile } from '../../../database/useProfile';
import ClassStatusChip, { getClassStatusLabel } from './ClassStatusChip';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    minHeight: 450
  },
  header: {
    color: palette.common.black,
    padding: spacing(2),
    minHeight: 96
  },
  imageContainer: {
    marginTop: spacing(4),
    textAlign: 'center',
    marginBottom: spacing(4)
  },
  summary: {
    minHeight: 100,
    alignItems: 'center',
    color: palette.common.white,
    background: palette.primary.light,
    padding: spacing(1, 2, 1, 2)
  }
}));

const ViewInstructorClassButton = ({ cc }) => {
  const { profile } = useProfile({ id: cc.userId });
  const changeRoute = useHandleChangeRouteLayout();
  return (
    <Grid container justify='space-between' alignItems='center' wrap='nowrap' spacing={2}>
      <Grid item xs zeroMinWidth>
        <Typography noWrap>{profile?.name}</Typography>
      </Grid>
      <Grid item>
        <DialogButton
          onClick={changeRoute('/ClassDashboard', { instructor: { userId: cc.userId }, class: cc })}
          variant='link'
          linkVariant='body1'
          underline='always'
        >
          {`View Class`}
        </DialogButton>
      </Grid>
    </Grid>
  );
};

export default function Class({
  inProgress = false,
  isAvailable = false,
  buttonLabel = 'View',
  buttonLabel2 = undefined,
  headline = '',
  name = '',
  updated = undefined,
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
  childClasses = [],
  ...rest
}) {
  const classes = useStyles();
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
          {keySkills.map(({ id, name }) => (
            <Typography key={id} component='h6' gutterBottom variant='subtitle1'>
              {name}
            </Typography>
          ))}
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
      {childClasses.length > 0 && (
        <Box m={2}>
          <Typography>Instructors:</Typography>
          <Divider />
          <Grid container style={{ marginTop: 8 }}>
            {childClasses.map(cc => (
              <Grid item xs key={cc.id}>
                <ViewInstructorClassButton cc={cc} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {showUpdated && (
        <Box pl={1} pr={1}>
          <Typography noWrap align='right' variant='caption' color='textPrimary'>
            {`Last updated ${timeAgo(updated)}`}
          </Typography>
        </Box>
      )}
      {completed && (
        <Box pl={1} pr={1}>
          <Typography noWrap align='right' variant='caption' color='textPrimary'>
            {`Completed ${timeAgo(updated)}`}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
