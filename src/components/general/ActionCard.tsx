import * as React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles } from '@material-ui/core';
import ActionButton from './ActionButton';

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {},
  header: {
    minHeight: 116,
    color: palette.common.black,
    padding: spacing(2)
  }
}));

export default function ActionCard({ title, description, actionLabel = 'View', onClick, className = undefined, ...rest }) {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div className={classes.header}>
        <Typography noWrap gutterBottom variant='h5' color='primary'>
          {title}
        </Typography>
        <Typography gutterBottom variant='subtitle1' color='textPrimary'>
          {description}
        </Typography>
      </div>
      <Box m={2} textAlign='center'>
        <ActionButton onClick={onClick}>{actionLabel}</ActionButton>
      </Box>
    </Card>
  );
};