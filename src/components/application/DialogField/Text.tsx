import * as React from 'react';
import { TextField } from '@material-ui/core';
import { isError } from '../../../helpers';

const Text = ({ value = '', margin = 'dense', variant = 'outlined', forceErrorMargin = false, error = undefined, initialValue = undefined, ...other }) => (
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
    {...other}
  />
);

export default Text;
