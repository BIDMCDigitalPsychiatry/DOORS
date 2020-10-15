import React from 'react';
import Text from '../../application/DialogField/Text';
import { IconButton, InputAdornment } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { isEmpty } from '../../../helpers';
import { useHandleLink } from '../../../hooks';

const YouTubeAdornment = ({ disabled = undefined, onClick = undefined }) => (
  <InputAdornment position='end'>
    <IconButton disabled={disabled} onClick={onClick} color='primary' aria-label='open link'>
      <Icons.YouTube />
    </IconButton>
  </InputAdornment>
);

export default function ClassPresentationLink({ value, label = 'Class Presenation Link', onChange, ...other }) {
  const handleLink = useHandleLink(value);

  return (
    <Text
      label={label}
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment: <YouTubeAdornment onClick={handleLink} disabled={isEmpty(value)} /> }}
      {...other}
    />
  );
}
