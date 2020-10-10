import * as React from 'react';
import { Link } from '@material-ui/core';
import { useHandleLink } from '../../../hooks';

const NewWindowLink = ({ url, label }) => {
  const handleLink = useHandleLink(url);
  return (
    <Link underline='always' onClick={handleLink} style={{ cursor: 'pointer' }}>
      {label}
    </Link>
  );
};

export default NewWindowLink;
