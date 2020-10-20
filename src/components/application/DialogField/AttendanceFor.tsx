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
  return <Typography className={useStyles({ disabled }).root}>Attendance for {value}</Typography>;
}
