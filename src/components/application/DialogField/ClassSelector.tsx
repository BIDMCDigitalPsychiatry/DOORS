import { FormControl, FormHelperText } from '@material-ui/core';
import * as React from 'react';
import { sortHeadlineDescending, isEmpty, isError } from '../../../helpers';
import Check from './Check';

const ClassSelector = ({
  label = undefined,
  value = undefined,
  onChange = undefined,
  error = undefined,
  margin = 'dense' as 'dense',
  forceErrorMargin = false,
  variant = undefined,
  ...other
}) => {
  const value_str = JSON.stringify(value);
  const handleChange = React.useCallback(
    id => event => {
      var v = JSON.parse(value_str);
      var imported = event.target.checked === true ? 1 : 0; // Inject checked value to mimic behavior of other input on change events
      v.forEach(c => {
        if (c.id === id) {
          c.imported = imported;
        }
      });
      const e = { target: { value: v } };
      onChange && onChange(e);
    },
    [onChange, value_str]
  );

  return (
    <FormControl variant={variant} error={isError(error)} fullWidth margin={margin}>
      {value?.sort(sortHeadlineDescending).map(c => (
        <Check color='primary' label={[c.headline, c.name].filter(t => !isEmpty(t)).join(': ')} value={c.imported} onChange={handleChange(c.id)} {...other} />
      ))}

      {(forceErrorMargin || error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default ClassSelector;
