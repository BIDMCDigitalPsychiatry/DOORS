import * as React from 'react';
import { Typography, makeStyles, Tooltip } from '@material-ui/core';

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

export default function CircleText({ text = undefined, width = 36, tooltip = undefined, placement = 'left' as any, children = undefined, ...rest }) {
  const classes = useStyles({ width });

  const Content = (
    <Typography variant='h5' align='center' color='primary'>
      {text}
    </Typography>
  );

  return (
    <div className={classes.circle} {...rest}>
      {tooltip ? (
        <Tooltip placement={placement} title={tooltip}>
          {Content}
        </Tooltip>
      ) : (
        Content
      )}
    </div>
  );
}
