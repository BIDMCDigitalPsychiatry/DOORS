import * as React from 'react';
import clsx from 'clsx';
import { Grid, Box, Card, CardContent, makeStyles, Divider } from '@material-ui/core';
import Text from '../../application/DialogField/Text';
import ActionButton from '../../general/ActionButton';

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  header: {
    background: palette.primary.main,
    color: palette.common.white
  }
}));

export default function ProfileSettings({ className = undefined, user, ...rest }) {
  const classes = useStyles();
  const [{ name, email, city, state }, setState] = React.useState(user);
  const handleChange = React.useCallback(
    name => event => {
      const value = event?.target?.value; // Must be const out side of setState because of event pooling
      setState(prev => ({
        ...prev,
        [name]: value
      }));
    },
    [setState]
  );
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            {<Text onChange={handleChange('name')} margin='normal' label='Name' name='name' value={name} />}
          </Grid>
          <Grid item md={6} xs={12}>
            {<Text onChange={handleChange('email')} margin='normal' label='Email' name='email' value={email} />}
          </Grid>
          <Grid item md={6} xs={12}>
            {<Text onChange={handleChange('city')} margin='normal' label='City' name='city' value={city} />}
          </Grid>
          <Grid item md={6} xs={12}>
            {<Text onChange={handleChange('state')} margin='normal' label='State/Region' name='state' value={state} />}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box p={2} display='flex' justifyContent='flex-end'>
        <ActionButton onClick={() => alert('To be completed')}>Save</ActionButton>
      </Box>
    </Card>
  );
}
