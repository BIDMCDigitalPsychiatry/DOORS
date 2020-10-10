import React from 'react';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const StyledLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#F1C30A'
    }
  })
)(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function BorderedLinearProgress({ value, ...other }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledLinearProgress variant='determinate' value={value} {...other} />
    </div>
  );
}
