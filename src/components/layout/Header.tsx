import * as React from 'react';
import { makeStyles, createStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    header: {
      color: palette.primary.dark
    }
  } as any)
);

export default function Header({ supertitle = undefined, title = undefined, subtitle = undefined }) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      {supertitle && (
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='h6'>
            {supertitle}
          </Typography>
        </Grid>
      )}
      {title && (
        <Grid item xs={12}>
          <Typography className={classes.header} variant='h4'>
            {title}
          </Typography>
        </Grid>
      )}
      {subtitle && (
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='subtitle1'>
            {subtitle}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
