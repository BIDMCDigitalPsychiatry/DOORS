import * as React from 'react';
import clsx from 'clsx';
import { Grid, Box, Button, Card, CardContent, makeStyles, Divider } from '@material-ui/core';
import Text from '../../application/DialogField/Text';

const useStyles = makeStyles(({ palette }) => ({
  root: {},
  header: {
    background: palette.primary.main,
    color: palette.common.white
  },
  button: {
    width: 120,
    color: '#192A3E',
    background: '#F1C30A',
    borderRadius: 20,
    '&:hover': {
      opacity: '85%',
      color: '#192A3E',
      background: '#F1C30A'
    }
  }
}));

export default function ProfileSettings({ className = undefined, user, ...rest }) {
  const classes = useStyles();
  const [{ name, email, city, state }, setState] = React.useState(user);
  const handleChange = React.useCallback(
    name => event => {
      setState(prev => ({
        ...prev,
        [name]: event?.target?.value
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
        <Button className={classes.button} variant='contained' onClick={() => alert('To be completed')}>
          Save
        </Button>
      </Box>
    </Card>
  );
}
