import * as React from 'react';
import { CircularProgress, createStyles, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles(({ palette, layout }: any) =>
  createStyles({
    progress: {
      color: palette.primary.light,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -(layout.progressSize / 2),
      marginLeft: -(layout.progressSize / 2)
    }
  })
);

export default function LoadingGate({ loading, children }) {
  const classes = useStyles();
  const { layout }: any = useTheme();
  return loading === true ? <CircularProgress size={layout.progressSize} className={classes.progress} /> : children;
}
