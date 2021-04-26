import * as React from 'react';
import { Box, Container, createStyles, makeStyles } from '@material-ui/core';
import Header from '../layout/Header';
import DialogButton from '../application/GenericDialog/DialogButton';
import LoadingGate from '../layout/LoadingGate';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    container: {
      marginTop: 8,
      marginBottom: 40
    },
    header: {
      color: palette.primary.dark
    }
  } as any)
);

export default function Page({
  title = '',
  subtitle = undefined,
  loading = undefined,
  ActionButton = undefined,
  children = <></>,
  backLabel = 'Back',
  onBack = undefined
}) {
  const classes = useStyles();
  return (
    <>
      {onBack && (
        <Box mt={-2} mb={1}>
          <DialogButton variant='link' linkVariant='body1' onClick={onBack}>
            {`<  ${backLabel}`}
          </DialogButton>
        </Box>
      )}
      <Header title={title} subtitle={subtitle} ActionButton={ActionButton} />
      <Container disableGutters={true} className={classes.container} maxWidth={false}>
        <LoadingGate loading={loading === undefined ? false : loading}>{children}</LoadingGate>
      </Container>
    </>
  );
}
