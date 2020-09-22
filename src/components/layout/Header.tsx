import * as React from 'react';
import { makeStyles, createStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    header: {
      color: palette.primary.dark
    }
  } as any)
);

export default function Header({
  superVariant = 'h6',
  titleVariant = 'h4',
  subVariant = 'subtitle1',
  supertitle = undefined,
  title = undefined,
  subtitle = undefined,
  ActionButton = undefined
}) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <Grid container spacing={1}>
          {supertitle && (
            <Grid item xs={12}>
              <Typography color='textSecondary' variant={superVariant as any}>
                {supertitle}
              </Typography>
            </Grid>
          )}
          {title && (
            <Grid item xs={12}>
              <Typography className={classes.header} variant={titleVariant as any}>
                {title}
              </Typography>
            </Grid>
          )}
          {subtitle && (
            <Grid item xs={12}>
              <Typography color='textSecondary' variant={subVariant as any}>
                {subtitle}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {ActionButton && (
        <Grid item>
          <ActionButton />
        </Grid>
      )}
    </Grid>
  );
}
