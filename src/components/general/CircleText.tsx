import * as React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  circle: ({ width }: any) => ({
    borderRadius: 50,
    width,
    height: 36,
    border: `2px solid ${palette.primary.main}`
  }),
  circleText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function CircleText({ text = undefined, width = 36, children = undefined, ...rest }) {
  const classes = useStyles({ width });

  return (
    <div className={classes.circle} {...rest}>
      <Typography variant='h5' align='center' color='primary'>
        {text}
      </Typography>
    </div>
  );
}
