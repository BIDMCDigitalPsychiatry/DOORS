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

export default function Page({ title = '', ActionButton = undefined, children = <></> }) {
  const classes = useStyles();
  return (
    <>
      <Header title={title} ActionButton={ActionButton} />
      <Container disableGutters={true} className={classes.container} maxWidth={false}>
        {children}
      </Container>
    </>
  );
}
