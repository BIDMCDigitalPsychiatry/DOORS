import * as React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, CardActions, Grid } from '@material-ui/core';
import StyledButton from './StyledButton';
import { bool } from '../../helpers';
import * as Icons from '@material-ui/icons';
import { useIsAdmin, useIsAdminMode } from '../../hooks';

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
    border: `2px solid ${palette.primary.main}`
  },
  circleText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function ActionCard({
  title = undefined,
  item = {} as any,
  index = undefined,
  description = undefined,
  actionLabel = 'View',
  onClick = undefined,
  className = undefined,
  titleProps = undefined,
  minHeight = undefined,
  disabled = undefined,
  onLock = undefined,
  onRemove = undefined,
  onEdit = undefined,
  isOwner = false,
  children = undefined,
  enableLock = true
}) {
  const isAdmin = useIsAdmin();
  const isAdminMode = useIsAdminMode();
  const classes = useStyles({ minHeight });
  const { name, locked } = item;
  const handleLock = React.useCallback(item => () => onLock && onLock(item), [onLock]);
  const handleRemove = React.useCallback(item => () => onRemove && onRemove(item), [onRemove]);
  const handleEdit = React.useCallback(item => () => onEdit && onEdit(item), [onEdit]);
  const Title = title ? title : name ?? '';

  const canEdit = !bool(locked); // Can edit if the user is an admin or an instructor and the object is not locked
  const canDelete = canEdit;
  return (
    <Card className={clsx(classes.root, className)}>
      <div className={classes.header}>
        {Title && (
          <Grid container spacing={1}>
            {index !== undefined && (
              <Grid item>
                <div className={classes.circle}>
                  <Typography variant='h5' align='center' color='primary'>
                    {index + 1}
                  </Typography>
                </div>
              </Grid>
            )}
            <Grid item xs>
              {Title && (
                <Typography noWrap gutterBottom variant='h5' color='primary' {...titleProps}>
                  {Title}
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
        {description && (
          <Typography gutterBottom variant='subtitle1' color='textPrimary'>
            {description}
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
            {enableLock && ((isAdminMode && isAdmin) || isOwner) && (
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
