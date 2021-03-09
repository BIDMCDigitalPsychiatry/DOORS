import * as React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { isError } from '../../../helpers';
import * as Icons from '@material-ui/icons';

const TextPassword = ({
  value = '',
  margin = 'dense',
  variant = 'outlined',
  forceErrorMargin = false,
  error = undefined,
  initialValue = undefined,
  InputProps = undefined,
  type = 'password',
  ...other
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

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
      type={showPassword ? 'text' : type}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
              {showPassword ? <Icons.Visibility /> : <Icons.VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps
      }}
      {...other}
    />
  );
};

export default TextPassword;
