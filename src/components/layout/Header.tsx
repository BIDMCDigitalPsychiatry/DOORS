import * as React from 'react';
import { makeStyles, createStyles, Typography, Grid } from '@material-ui/core';
import { isEmpty } from '../../helpers';

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
  ActionButton = undefined,
  TitleButton = undefined
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
          {(!isEmpty(title) || !isEmpty(subtitle)) && (
            <Grid item xs={12}>
              <Typography className={classes.header} variant={titleVariant as any}>
                <Grid container spacing={1} justify='space-between'>
                  <Grid item>
                    {title}
                    {subtitle && (
                      <Typography color='textSecondary' variant={subVariant as any}>
                        {subtitle}
                      </Typography>
                    )}
                  </Grid>
                  {TitleButton && (
                    <Grid item>
                      <TitleButton />
                    </Grid>
                  )}
                </Grid>
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
