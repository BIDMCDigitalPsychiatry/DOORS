import * as React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { isEmpty, isError } from '../../../helpers';
import * as Icons from '@material-ui/icons';
import { useHandleLink } from '../../../hooks';

const TextLink = ({
  value = '',
  margin = 'dense',
  variant = 'outlined',
  forceErrorMargin = false,
  error = undefined,
  initialValue = undefined,
  InputProps = undefined,
  disabled = undefined,
  ...other
}) => {
  const handleMouseDown = event => {
    event.preventDefault();
  };

  const handleLink = useHandleLink(value);

  return (
    <TextField
      value={value}
      error={isError(error)}
      helperText={forceErrorMargin ? error || ' ' : error} // Forces a constant helper text margin
      margin={margin as any}
      variant={variant as any}
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton disabled={disabled || isEmpty(value)} aria-label='open-link' onClick={handleLink} onMouseDown={handleMouseDown} edge='end'>
              <Icons.Link />
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps
      }}
      disabled={disabled}
      {...other}
    />
  );
};

export default TextLink;
