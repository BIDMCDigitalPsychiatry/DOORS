import * as React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Page from './Page';

export default function TermsAndConditions() {
  return (
    <Container maxWidth='md'>
      <Page title='Terms and Conditions'>
        <Grid container spacing={2}>
          <Grid item>
            <Typography>
              DOORS offers materials for educational purposes. We are not a health care or medical device provider, and our materials should be interpreted as
              medical advice. We make no claims, representations or guarantees that the teaching materials we provide offer physical or therapeutic benefit.
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Materials are intended for general information purposes only. They are not intended to be relied upon and are not a substitute for professional
              medical advice based on an individual’s condition or unique circumstances. Educational materials we offer are not intended to replace medical
              treatment or advice.
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              You assume full responsibility for your decisions and actions. We make no representation or warranties about the accuracy, completeness, or
              suitability for any purpose of the advice, other materials and information published as part of our educational materials.​
            </Typography>
          </Grid>
        </Grid>
      </Page>
    </Container>
  );
}
