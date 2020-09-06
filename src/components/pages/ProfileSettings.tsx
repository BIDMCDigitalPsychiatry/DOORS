import * as React from 'react';
import clsx from 'clsx';
import { Grid, Box, Button, Card, CardContent, makeStyles, Divider, TextField } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
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
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            {<TextField fullWidth label='Name' name='name' value={user.name} variant='outlined' />}
          </Grid>
          <Grid item md={6} xs={12}>
            {<TextField fullWidth label='Email' name='email' value={user.email} variant='outlined' />}
          </Grid>
          <Grid item md={6} xs={12}>
            {<TextField fullWidth label='City' name='city' value={user.city} variant='outlined' />}
          </Grid>
          <Grid item md={6} xs={12}>
            {<TextField fullWidth label='State/Region' name='state' value={user.state} variant='outlined' />}
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
