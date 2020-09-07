import * as React from 'react';
import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import Header from '../layout/Header';
import DialogButton from '../application/GenericDialog/DialogButton';

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

export default function ChildPage({
  backLabel = 'Back',
  onBack = undefined,
  supertitle = undefined,
  title = undefined,
  subtitle = undefined,
  children = <></>
}) {
  const classes = useStyles();
  return (
    <>
      {onBack && (
        <DialogButton variant='link' linkVariant='subtitle1' onClick={onBack}>
          {`<  ${backLabel}`}
        </DialogButton>
      )}
      <Box mt={2}>
        <Header supertitle={supertitle} title={title} subtitle={subtitle} />
        <Container disableGutters={true} className={classes.container} maxWidth={false}>
          {children}
        </Container>
      </Box>
    </>
  );
}
