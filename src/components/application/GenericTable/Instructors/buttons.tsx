import * as React from 'react';
import * as Icons from '@material-ui/icons';
import { IconButton, Menu, MenuItem, Popover } from '@material-ui/core';

export function RowActionsButton(props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { deleted } = props;

  return (
    <div>
      <IconButton size='small' color='inherit' aria-describedby={id} onClick={handleClick}>
        <Icons.MoreVert />
      </IconButton>
      <Popover
        id={id}
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
          id='menu-appbar'
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
          <MenuItem onClick={() => alert('To be implemented')}>Send Email</MenuItem>
          <MenuItem onClick={() => alert('To be implemented')}>Allow Permissions</MenuItem>
          <MenuItem onClick={() => alert('To be implemented')}>View Groups</MenuItem>
          {deleted === true ? (
            <MenuItem onClick={() => alert('To be implemented')}>Restore Instructor</MenuItem>
          ) : (
            <MenuItem onClick={() => alert('To be implemented')}>Archive Instructor</MenuItem>
          )}
        </Menu>
      </Popover>
    </div>
  );
}
