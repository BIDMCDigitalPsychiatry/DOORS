import * as React from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    header: {
      color: palette.primary.dark
    }
  } as any)
);

export default function Header({ title = '' }) {
  const classes = useStyles();
  return (
    <Typography className={classes.header} variant='h4'>
      {title}
    </Typography>
  );
}
