import * as React from 'react';
import { Container, Grid } from '@material-ui/core';
import Page from './Page';
import StyledButton from '../general/StyledButton';
import DialogButton from '../application/GenericDialog/DialogButton';
import * as AddStudentDialog from '../application/GenericDialog/AddStudent';
import * as Icons from '@material-ui/icons';

export default function StyleGuide() {
  return (
    <Container maxWidth='md'>
      <Page title='Style Guide'>
        <Grid container spacing={2}>
          <Grid item>
            <StyledButton variant='primary'>Primary</StyledButton>
            <StyledButton variant='primary' pressed={true}>
              Primary Pressed
            </StyledButton>
            <StyledButton variant='primary' disabled={true}>
              Primary Disabled
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton variant='secondary'>Secondary</StyledButton>
            <StyledButton variant='secondary' pressed={true}>
              Secondary Pressed
            </StyledButton>
            <StyledButton variant='secondary' disabled={true}>
              Secondary Disabled
            </StyledButton>
          </Grid>
          <Grid>
            <StyledButton variant='text'>Text</StyledButton>
            <StyledButton variant='text' pressed={true}>
              Text Pressed
            </StyledButton>
            <StyledButton variant='text' disabled={true}>
              Text Disabled
            </StyledButton>
          </Grid>
          <Grid item xs={12}>
            <DialogButton maxWidth='xl' fullWidth Module={AddStudentDialog} Icon={Icons.Add} size='large' variant='styled' tooltip=''>
              Add Student
            </DialogButton>
          </Grid>
        </Grid>
      </Page>
    </Container>
  );
}
