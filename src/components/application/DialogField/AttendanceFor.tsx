import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    root: ({ disabled }: any) => ({
      color: disabled ? palette.text.disabled : 'inherit'
    })
  })
);

export default function AttendanceFor({ value, disabled }) {
  const classes = useStyles({ disabled });
  return <>{value && <Typography className={classes.root}>Attendance for {value}</Typography>}</>;
}
