import React from 'react';
import clsx from 'clsx';
import { Box, Card, Typography, makeStyles, Grid } from '@material-ui/core';
import calendar from '../../../images/calendar.png';
import ActionButton from '../../general/ActionButton';

interface SessionProps {
  title?: string;
  subtitle?: string;
  image?: any;
  topics?: string[];
  className?: string;
}

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
  subtitle = 'Session Number Placeholder',
  title = 'Title Place Holder',
  image = calendar,
  topics = ['Topic 1 Placeholder', 'Topic 2 Placeholder'],
  className,
  ...rest
}: SessionProps) {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div className={classes.header}>
        <Typography noWrap gutterBottom variant='subtitle1' color='textSecondary'>
          {subtitle}
        </Typography>
        <Typography noWrap gutterBottom variant='h6' color='textPrimary'>
          {title}
        </Typography>
      </div>
      <div className={classes.imageContainer}>
        <img src={image} alt={title} />
      </div>
      <Grid container className={classes.summary} alignItems='center'>
        <Grid item>
          {topics.map(t => (
            <Typography key={t} component='h6' gutterBottom variant='subtitle1'>
              {t}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Box m={2}textAlign='center'>
        <ActionButton onClick={() => alert('To be implemented.')}>View</ActionButton>
      </Box>
    </Card>
  );
}
