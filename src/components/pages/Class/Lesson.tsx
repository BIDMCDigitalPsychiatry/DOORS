import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import ReactPlayer from 'react-player';
import { useHandleChangeRoute, useWidth } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import YourProgress from '../../general/YourProgress';
import { useClassData } from '../../../database/useClassData';
import { tables } from '../../../database/dbConfig';
import { isEmpty } from '../../../helpers';

export default function Lesson() {
  const { data } = useClassData({ Model: tables.classesAdmin });
  const contentPath = data?.classPresentation;
  const width = useWidth();
  const handleChangeRoute = useHandleChangeRoute();
  return (
    <Page title='Lesson' ActionButton={() => <YourProgress value={75} />}>
      <Grid container justify='center' spacing={3}>
        <Grid item>
          {isEmpty(contentPath) ? (
            <Typography>Lesson has not been added. Please contact your administrator or instructor to setup the lesson.</Typography>
          ) : (
            <ReactPlayer url={contentPath} controls={true} width={Math.min(width - 32, 640)} />
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={128} variant='secondary' onClick={handleChangeRoute('/Pre-Survey')}>
                Back
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton width={128} onClick={handleChangeRoute('/Post-Survey')}>
                Continue
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
