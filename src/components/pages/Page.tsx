import * as React from 'react';
import { Container, createStyles, makeStyles } from '@material-ui/core';
import Header from '../layout/Header';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    container: {
      marginTop: 8,
      marginBottom: 8
    },
    header: {
      color: palette.primary.dark
    }
  } as any)
);

export default function Page({ title = '', children = undefined }) {
  const classes = useStyles();
  return (
    <>
      <Header title={title} />
      <Container disableGutters={true} className={classes.container} maxWidth={false}>
        {children}
      </Container>
    </>
  );
}
