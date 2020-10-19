import * as React from 'react';
import * as Icons from '@material-ui/icons';
import { IconButton, Menu, MenuItem, Popover } from '@material-ui/core';
import useTableRow from '../../../../database/useTableRow';
import { tables } from '../../../../database/dbConfig';
import * as InstructorAlertDialog from '../../GenericDialog/InstructorAlert';
import DialogButton from '../../GenericDialog/DialogButton';

export function RowActionsButton({ id, deleted, onUpdate, email }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    event?.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [state, setState] = React.useState({ loading: false, open: false }); // Set to false to prevent automatic data request on load
  const { loading } = state;
  const { readSetRow } = useTableRow({ Model: tables.instructors, id, state, setState });

  const handleUpdate = React.useCallback(
    values => () => {
      setAnchorEl(null);
      readSetRow({ values, onSuccess: onUpdate });
    },
    [readSetRow, onUpdate, setAnchorEl]
  );

  return (
    <div>
      <IconButton size='small' color='inherit' onClick={handleClick}>
        <Icons.MoreVert />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={handleClose}
        >
          <DialogButton id={id} initialValues={{ email }} variant='menuitem' onClose={handleClose} Module={InstructorAlertDialog}>
            Send Email Alert
          </DialogButton>
          {deleted === true ? (
            <MenuItem disabled={loading} onClick={handleUpdate({ deleted: false })}>
              Restore Instructor
            </MenuItem>
          ) : (
            <MenuItem disabled={loading} onClick={handleUpdate({ deleted: true })}>
              Archive Instructor
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </div>
  );
}