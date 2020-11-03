import React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import DialogButton from '../GenericDialog/DialogButton';

interface HeaderProps {
  className?: string;
  onAddClick?: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  }
}));

const Header: FC<HeaderProps> = ({ className, onAddClick, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid className={clsx(classes.root, className)} container justify='space-between' spacing={3} {...rest}>
      <Grid item>
        <>
          <DialogButton onClick={onAddClick} fullWidth variant='styled' Icon={Icons.Add}>
            New Event
          </DialogButton>
        </>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onAddClick: PropTypes.func
};

Header.defaultProps = {
  onAddClick: () => {}
};

export default Header;