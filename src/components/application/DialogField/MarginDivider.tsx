import * as React from 'react';
import { Divider } from '@material-ui/core';

const MarginDivider = ({ marginTop = 8, marginBottom = 8, ...other }) => <Divider style={{ marginTop, marginBottom }} {...other} />;

export default MarginDivider;
