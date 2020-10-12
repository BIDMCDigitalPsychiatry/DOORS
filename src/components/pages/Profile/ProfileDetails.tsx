import React from 'react';
import { Avatar, Box, Card, CardContent, Typography, makeStyles, Grid } from '@material-ui/core';
import { useUserType } from '../../../hooks';
import DialogButton from '../../application/GenericDialog/DialogButton';
import { useHandleChangeRoute, useUserEmail } from '../../layout/hooks';
import { useDialogState } from '../../application/GenericDialog/useDialogState';
import FileUploadButton from '../../application/DialogField/FileUploadButton';
import { getObjectUrl } from '../../../aws-exports';

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

const ProfileDetails = ({ profile = {} as any, setProfile, onSuccess, ...rest }) => {
  const classes = useStyles();
  const userType = useUserType();
  const email = useUserEmail();

  const changeRoute = useHandleChangeRoute();

  const [state, setState] = useDialogState('My Profile');
  const { loading, submitting } = state;

  const profile_s = JSON.stringify(profile);
  const handleChange = React.useCallback(
    key => event => {
      const value = event?.target?.value;
      var newProfile = JSON.parse(profile_s);
      newProfile[key] = value;
      setProfile && setProfile(newProfile, onSuccess);
      setState(prev => ({ ...prev }));
    },
    [setState, setProfile, profile_s, onSuccess]
  );

  const disabled = loading || submitting;  

  return (
    <Card {...rest}>
      <CardContent>
        <Box display='flex' alignItems='center' flexDirection='column' textAlign='center'>
          <Avatar className={classes.avatar} src={getObjectUrl(profile?.picture)} />
          <FileUploadButton label='UPLOAD PICTURE' onChange={handleChange('picture')} />
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
                  <DialogButton disabled={disabled} variant='link' underline='always' onClick={changeRoute('/ForgotPassword')}>
                    CHANGE PASSWORD
                  </DialogButton>
                </Grid>
                <Grid item>
                  <DialogButton disabled={disabled} variant='link' underline='always' onClick={() => alert('To be implemented')}>
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
