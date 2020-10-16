import * as React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, CardActions, Grid } from '@material-ui/core';
import StyledButton from './StyledButton';
import { bool } from '../../helpers';
import * as Icons from '@material-ui/icons';
import { useHandleLink, useIsAdminMode } from '../../hooks';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  header: {
    color: palette.common.black,
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2)
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  circle: {
    borderRadius: 50,
    width: 36,
    height: 36,
    border: `2px solid ${palette.primary.main}`
  },
  circleText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 128,
    height: 128
  },
  iconContainer: {
    background: palette.primary.light,
    color: palette.common.white,
    cursor: 'pointer'
  }
}));

export default function ActionCardClassResource({
  title = undefined,
  item,
  viewLabel = 'View Resource',
  actionLabel = 'View',
  onClick = undefined,
  className = undefined,
  disabled = undefined,
  onLock = undefined,
  onRemove = undefined,
  onEdit = undefined,
  children = undefined,
  ...rest
}) {
  const classes = useStyles();
  const { name, type, link, locked, canLock } = item;
  const handleLock = React.useCallback(item => () => onLock && onLock(item), [onLock]);
  const handleRemove = React.useCallback(item => () => onRemove && onRemove(item), [onRemove]);
  const handleEdit = React.useCallback(item => () => onEdit && onEdit(item), [onEdit]);

  const isAdminMode = useIsAdminMode();
  const canEdit = !bool(canLock) || (bool(canLock) && bool(!locked)); // Can edit if the user is an admin or an instructor and the object is not locked
  const canDelete = canEdit;

  const Icon = type === 'PDF' ? Icons.PictureAsPdf : type === 'Video' ? Icons.YouTube : Icons.Http;

  const handleLink = useHandleLink(link);

  return (
    <Card className={clsx(classes.root, className)}>
      <Box textAlign='center' pt={1} className={classes.iconContainer} onClick={handleLink}>
        <Grid container>
          <Grid item xs={12}>
            <Icon className={classes.icon} />
          </Grid>
          <Grid item xs={12}>
            <StyledButton color='inherit' variant='whiteText' onClick={handleLink}>
              {viewLabel}
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
      <div className={classes.header}>
        <Grid container spacing={1}>
          <Grid item xs>
            {name && (
              <Typography noWrap gutterBottom variant='h5'>
                {name}
              </Typography>
            )}
          </Grid>
        </Grid>

        {type && (
          <Typography gutterBottom variant='subtitle1' color='textPrimary'>
            {type}
          </Typography>
        )}
      </div>
      {children}

      {onClick && (
        <Box m={2} textAlign='center'>
          <StyledButton disabled={disabled} onClick={onClick}>
            {actionLabel}
          </StyledButton>
        </Box>
      )}
      <CardActions className={classes.actions}>
        {onEdit && bool(canEdit) && (
          <StyledButton variant='text' onClick={handleEdit(item)}>
            Edit
          </StyledButton>
        )}
        <div>
          <Grid container justify='flex-end' alignItems='flex-end'>
            {onRemove && bool(canDelete) && (
              <Grid item>
                <StyledButton variant='text' onClick={handleRemove(item)}>
                  Remove
                </StyledButton>
              </Grid>
            )}
            {isAdminMode && bool(canLock) && (
              <Grid item>
                <StyledButton Icon={bool(locked) ? Icons.Lock : Icons.LockOpen} variant='text' width={140} onClick={handleLock(item)}>
                  {bool(locked) ? 'Locked' : 'Un-locked'}
                </StyledButton>
              </Grid>
            )}
          </Grid>
        </div>
      </CardActions>
    </Card>
  );
}
