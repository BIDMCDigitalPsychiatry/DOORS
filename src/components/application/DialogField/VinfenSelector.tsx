import * as React from 'react';
import { FormControl, FormHelperText, Grid, Typography, ButtonGroup, Button } from '@material-ui/core';
import { isError } from '../../../helpers';
import * as Icons from '@material-ui/icons';
import LightTooltip from '../../general/LightTooltip/LightTooltip';

export default function VinfenSelector({
  label = '',
  variant = undefined,
  size = 'small' as 'small',
  color = 'primary' as 'primary',
  error = undefined,
  value = undefined,
  tooltip = undefined,
  margin = 'dense' as 'dense',
  labelPlacement = 'start',
  onChange = undefined,
  forceErrorMargin = false,
  type = undefined, // Don't pass an undefined type to Checkbox.  This filters the prop out
  initialValue = undefined,
  ...other
}) {
  const handleChange = React.useCallback(value => () => onChange && onChange({ target: { value } }), [onChange]);

  const Label = (
    <Grid item>
      <Typography>{label}</Typography>
    </Grid>
  );

  return (
    <FormControl variant={variant} error={isError(error)} fullWidth margin={margin}>
      <Grid container justify='space-between' alignItems='center' spacing={3}>
        {labelPlacement === 'start' && Label}
        <Grid item>
          <Grid container justify='flex-end' alignItems='center' spacing={1}>
            {tooltip && (
              <Grid item>
                <LightTooltip title={tooltip}>
                  <Icons.HelpOutlined fontSize='small' color='primary' />
                </LightTooltip>
              </Grid>
            )}
            <Grid item>
              <ButtonGroup size={size} color={color} aria-label={`${label}-button-group`} {...other}>
                <Button variant={value === 'Clinician' ? 'contained' : undefined} onClick={handleChange('Clinician')}>
                  Clinician
                </Button>
                <Button variant={value === 'Person Served by Vinfen' ? 'contained' : undefined} onClick={handleChange('Person Served by Vinfen')}>
                  Person Served by Vinfen
                </Button>
                <Button variant={value === 'Other' ? 'contained' : undefined} onClick={handleChange('Other')}>
                  Other
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        {labelPlacement === 'end' && Label}
      </Grid>
      {(forceErrorMargin || error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
