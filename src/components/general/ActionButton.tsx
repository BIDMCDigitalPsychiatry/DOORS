import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  button: ({ width }: any) => ({
    width,
    color: '#192A3E',
    background: '#F1C30A',
    borderRadius: 20,
    '&:hover': {
      opacity: '85%',
      color: '#192A3E',
      background: '#F1C30A'
    }
  })
}));

export default function ActionButton({ width = 120, variant = 'outlined' as any, size = 'large' as any, children, ...other }) {
  const classes = useStyles({ width });
  return (
    <Button variant={variant} size={size} className={classes.button} {...other}>
      {children}
    </Button>
  );
}
