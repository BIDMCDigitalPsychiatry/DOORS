import React from 'react';
import * as Icons from '@material-ui/icons';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DialogButton from '../../GenericDialog/DialogButton';
import { useDeleteInstructors } from './hooks';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      display: 'flex'
    },
    toolbarPaper: {
      backgroundColor: palette.common.white,
      color: palette.common.white,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  })
);

export function MultiUserToolbar({ selected = [] }) {
  const instructors = {};
  selected.forEach(u => {
    instructors[u.id] = u.getValues();
  });

  const classes = useStyles();
  const handleDelete = useDeleteInstructors({ instructors });

  return (
    <div className={classes.root}>
      <Paper className={classes.toolbarPaper} square>
        <DialogButton Icon={Icons.Delete} variant='text' tooltip='Archive' placement='bottom' onClick={handleDelete} />
      </Paper>
    </div>
  );
}
