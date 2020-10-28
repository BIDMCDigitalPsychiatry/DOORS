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

const LabelRight = ({ label, disabled }) => (
  <Typography align='right' className={useStyles({ disabled }).root}>
    {label}
  </Typography>
);

export default LabelRight;
