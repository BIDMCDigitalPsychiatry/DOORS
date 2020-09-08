import * as React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles } from '@material-ui/core';
import ActionButton from './ActionButton';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  header: ({ minHeight = 116 }: any) => ({
    minHeight,
    color: palette.common.black,
    padding: spacing(2)
  })
}));

export default function ActionCard({
  title = undefined,
  description = undefined,
  actionLabel = 'View',
  onClick = undefined,
  className = undefined,
  titleProps = undefined,
  minHeight = undefined,
  ...rest
}) {
  const classes = useStyles({ minHeight });
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div className={classes.header}>
        {title && (
          <Typography noWrap gutterBottom variant='h5' color='primary' {...titleProps}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography gutterBottom variant='subtitle1' color='textPrimary'>
            {description}
          </Typography>
        )}
      </div>
      {onClick && (
        <Box m={2} textAlign='center'>
          <ActionButton onClick={onClick}>{actionLabel}</ActionButton>
        </Box>
      )}
    </Card>
  );
};