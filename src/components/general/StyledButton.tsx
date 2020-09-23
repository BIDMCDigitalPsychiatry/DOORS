import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  primaryRoot: ({ width }: any) => ({
    width,
    color: palette.secondary.dark,
    background: '#F1C30A',
    borderRadius: 20,
    borderColor: '#F1C30A',
    '&:hover': {
      opacity: '85%',
      color: palette.secondary.dark,
      background: '#F1C30A',
      borderColor: '#F1C30A'
    },
    '&:disabled': {
      opacity: '85%',
      color: palette.common.white,
      borderColor: palette.secondary.main,
      background: palette.secondary.main
    }
  }),
  primaryPressed: ({ width }: any) => ({
    width,
    color: palette.common.white,
    background: palette.secondary.dark,
    borderColor: palette.secondary.dark,
    borderRadius: 20,
    '&:hover': {
      opacity: '85%',
      color: palette.common.white,
      borderColor: palette.secondary.dark,
      background: palette.secondary.dark
    }
  }),
  secondaryRoot: ({ width }: any) => ({
    width,
    color: palette.primary.main,
    background: palette.common.white,
    borderColor: palette.primary.main,
    borderRadius: 20,
    '&:hover': {
      opacity: '85%',
      borderColor: palette.primary.light,
      color: palette.primary.light,
      background: palette.common.white
    },
    '&:disabled': {
      opacity: '85%',
      color: palette.secondary.main,
      background: palette.common.white
    }
  }),
  secondaryPressed: ({ width }: any) => ({
    width,
    color: palette.secondary.dark,
    background: palette.common.white,
    borderColor: palette.secondary.dark,
    borderRadius: 20,
    '&:hover': {
      opacity: '85%',
      color: palette.secondary.dark,
      borderColor: palette.secondary.dark,
      background: palette.common.white
    }
  }),
  textRoot: ({ width }: any) => ({
    width,
    color: palette.primary.main,
    '&:hover': {
      opacity: '85%',
      color: palette.primary.light
    },
    '&:disabled': {
      opacity: '85%',
      color: palette.secondary.main
    }
  }),
  textPressed: ({ width }: any) => ({
    width
  }),
  text: {},
  pressed: {},
  disabled: {
    color: palette.common.white,
    background: palette.common.white
  }
}));

export type StyledButtonVariant = 'primary' | 'secondary' | 'text';

export default function StyledButton({
  disabled = undefined,
  pressed = undefined,
  width = undefined,
  variant = 'primary' as StyledButtonVariant,
  size = 'large' as any,
  Icon = undefined,
  children,
  ...other
}) {
  const classes = useStyles({ width });
  const rootClass = classes[`${variant}Root`];
  const pressedClass = classes[`${variant}Pressed`];

  const className = pressed ? pressedClass : rootClass;
  return (
    <Button disabled={disabled} color='default' variant={variant === 'text' ? variant : 'contained'} size={size} className={className} {...other}>
      {Icon && <Icon />}
      {variant === 'text' ? <u>{children}</u> : children}
    </Button>
  );
}
