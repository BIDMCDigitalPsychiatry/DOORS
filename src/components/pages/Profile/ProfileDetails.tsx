import React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { Avatar, Box, Card, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';
import { useUserType } from '../../../hooks';
import DialogButton from '../../application/GenericDialog/DialogButton';
import Profile from '../../../database/models/Profile';
import { useHandleChangeRoute, useUserEmail } from '../../layout/hooks';

interface ProfileDetailsProps {
  className?: string;
  profile: Profile;
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

const ProfileDetails: FC<ProfileDetailsProps> = ({ className, profile, ...rest }) => {
  const classes = useStyles();
  const userType = useUserType();
  const email = useUserEmail();

  const changeRoute = useHandleChangeRoute();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display='flex' alignItems='center' flexDirection='column' textAlign='center'>
          <Avatar className={classes.avatar} src={profile?.picture} />
          <DialogButton variant='link' underline='always' onClick={() => alert('To be implemented')}>
            UPLOAD PICTURE
          </DialogButton>
          <Box mt={1}>
            <Typography className={classes.name} color='textPrimary' variant='h4'>
              {profile?.name}
            </Typography>
            <Typography color='textPrimary' variant='h6'>
              {userType}
            </Typography>
            <Typography color='textPrimary' variant='caption'>
              {email}
            </Typography>
            <Box mt={1}>
              <Grid container justify='space-between' spacing={1}>
                <Grid item>
                  <DialogButton variant='link' underline='always' onClick={changeRoute('/ForgotPassword')}>
                    CHANGE PASSWORD
                  </DialogButton>
                </Grid>
                <Grid item>
                  <DialogButton variant='link' underline='always' onClick={() => alert('To be implemented')}>
                    CHANGE EMAIL
                  </DialogButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
