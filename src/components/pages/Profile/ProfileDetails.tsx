import React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { Avatar, Box, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { useUserType } from '../../../hooks';
import DialogButton from '../../application/GenericDialog/DialogButton';

interface ProfileDetailsProps {
  className?: string;
  user: any;
}

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 82,
    width: 82
  }
}));

const ProfileDetails: FC<ProfileDetailsProps> = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const userType = useUserType();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display='flex' alignItems='center' flexDirection='column' textAlign='center'>
          <Avatar className={classes.avatar} src={user.avatar} />
          <DialogButton variant='link' underline='always' onClick={() => alert('To be implemented')}>
            UPLOAD PICTURE
          </DialogButton>

          <Box mt={1}>
            <Typography className={classes.name} color='textPrimary' variant='h4'>
              {user.name}
            </Typography>
            <Typography color='textPrimary' variant='h6'>
              {userType}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
