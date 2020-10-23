import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, Grid, Tooltip } from '@material-ui/core';
import StyledButton from '../../general/StyledButton';
import { BlockListItem } from '../../general/BlockList';
import { getImage } from './helpers';
import { timeAgo } from '../../../helpers';
import ClassStatusChip, { getClassStatusLabel } from './ClassStatusChip';
import DialogButton from '../../application/GenericDialog/DialogButton';
import useTableRow from '../../../database/useTableRow';
import { tables } from '../../../database/dbConfig';

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
  id,
  Model = tables.classes,
  inProgress = false,
  isAvailable = false,
  buttonLabel = 'View',
  buttonLabel2 = undefined,
  headline = '',
  name = '',
  updated = undefined,
  created = undefined,
  canArchive = false,
  completed,
  deleted,
  showUpdated = false,
  image = 'calendar',
  keySkills = [] as BlockListItem[],
  className = undefined,
  onClick = undefined,
  onClick2 = undefined,
  rankingModel = [] as BlockListItem[],
  surveyQuestions = [] as BlockListItem[],
  classResources = [],
  classPresentations = [],
  showChildClasses = false,
  childClasses = [],
  onRefresh = undefined,
  ...rest
}) {
  const classes = useStyles();
  const filteredKeySkills = keySkills.filter((ks, i) => i < maxKeySkills);
  const moreKeySkills = keySkills.filter((ks, i) => i >= maxKeySkills);

  const { readSetRow } = useTableRow({ id, Model });

  const handleArchive = React.useCallback(() => {
    readSetRow({ values: { deleted: true }, onSuccess: onRefresh });
  }, [readSetRow, onRefresh]);

  const handleRestore = React.useCallback(() => {
    readSetRow({ values: { deleted: false }, onSuccess: onRefresh });
    onRefresh && onRefresh();
  }, [readSetRow, onRefresh]);

  return (
    <Card className={clsx(classes.root, className)}>
      <div className={classes.header}>
        <Grid container justify='space-between'>
          <Grid item zeroMinWidth xs>
            <Typography noWrap gutterBottom variant='subtitle1' color='textSecondary'>
              {headline}
            </Typography>
            <Typography noWrap gutterBottom variant='h6' color='textPrimary'>
              {name}
            </Typography>
          </Grid>
          {deleted ? (
            <Grid item>
              <ClassStatusChip isArchived={true} label={getClassStatusLabel('Archived', 1)} />
            </Grid>
          ) : completed ? (
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
          {deleted ? (
            <Grid item>
              <StyledButton disabled={true}>Archived</StyledButton>
            </Grid>
          ) : (
            <>
              <Grid item>
                <StyledButton onClick={onClick}>{buttonLabel}</StyledButton>
              </Grid>
              {buttonLabel2 && (
                <Grid item>
                  <StyledButton onClick={onClick2}>{buttonLabel2}</StyledButton>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Box>
      <Grid container style={{ paddingLeft: 8, paddingRight: 8 }} alignItems='center' justify='space-between'>
        <Grid item>
          {showUpdated && (
            <Typography noWrap align='right' variant='caption' color='textPrimary'>
              {`Last updated ${timeAgo(updated ?? created)}`}
            </Typography>
          )}
          {completed && !showUpdated && (
            <Typography noWrap align='right' variant='caption' color='textPrimary'>
              {`Completed ${timeAgo(updated ?? created)}`}
            </Typography>
          )}
        </Grid>
        {(showChildClasses || childClasses.length > 0) && (
          <Grid item>
            <Typography variant='caption'>
              {childClasses.length} Instructor{childClasses.length === 1 ? '' : 's'}
            </Typography>
          </Grid>
        )}
        {canArchive && (
          <Grid item>
            <DialogButton onClick={deleted === true ? handleRestore : handleArchive} variant='link' underline='always'>
              {deleted === true ? 'Restore' : 'Archive'}
            </DialogButton>
          </Grid>
        )}
      </Grid>
    </Card>
  );
}
