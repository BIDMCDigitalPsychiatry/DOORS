import React from 'react';
import Text from '../../application/DialogField/Text';
import { IconButton, InputAdornment } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { isEmpty } from '../../../helpers';

const YouTubeAdornment = ({ disabled = undefined, onClick = undefined }) => (
  <InputAdornment position='end'>
    <IconButton disabled={disabled} onClick={onClick} color='primary' aria-label='open link'>
      <Icons.YouTube />
    </IconButton>
  </InputAdornment>
);

export default function ClassPresentationLink({ value, onChange }) {
  const handleLink = React.useCallback(() => {
    var win = window.open(value, '_blank');
    win.focus();
  }, [value]);

  return (
    <Text
      style={{ maxWidth: 600 }}
      label='Current Class Presenation Link'
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment: <YouTubeAdornment onClick={handleLink} disabled={isEmpty(value)} /> }}
    />
  );
}
