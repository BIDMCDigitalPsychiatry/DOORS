import * as React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Page from './Page';
import { ViewTermsAndConditions } from '../application/GenericDialog/Register';

export default function ResearchPartAgreement() {
  return (
    <Container maxWidth='md'>
      <Page title='I agree to be part of a research study...'>
        <Grid container spacing={2}>
          <Grid item>
            <Typography>
              By creating an account, I agree that my progress in digital learning can be used for assessing the overall effectiveness of lessons. All data
              collected will not contain personal healthcare information and will be anonymized and de-identified for analysis. I also agree to the
              Terms and Conditions below.
            </Typography>
          </Grid>
          <Grid item>
            <ViewTermsAndConditions />
          </Grid>
        </Grid>
      </Page>
    </Container>
  );
}
