import * as React from 'react';
import { makeStyles, Chip, Tooltip } from '@material-ui/core';
import { deepPurple, green, red } from '@material-ui/core/colors';

const useStyles = makeStyles(({ palette }) => ({
  completed: {
    margin: 2,
    color: palette.common.white,
    background: green[500]
  },
  inProgress: {
    margin: 2,
    color: palette.common.white,
    background: deepPurple[300]
  },
  archived: {
    margin: 2,
    color: palette.common.white,
    background: red[500]
  },
  isAvailable: {
    margin: 2,
    color: palette.common.white,
    background: palette.primary.main
  }
}));

export const getClassStatusLabel = (text, count, check = true) => {
  const classText = count === 1 ? 'Class' : 'Classes';
  return check === false ? ` ${count} ${classText} ${text}` : count > 1 ? text + ` (${count})` : text;
};

export default function ClassStatusChip({ isArchived = false, inProgress = false, isAvailable = false, label, tooltip = '' }) {
  const classes = useStyles({});
  return (
    <Tooltip title={tooltip}>
      <Chip
        className={isArchived ? classes.archived : isAvailable ? classes.isAvailable : inProgress ? classes.inProgress : classes.completed}
        size='small'
        variant='outlined'
        label={label}
      />
    </Tooltip>
  );
}
