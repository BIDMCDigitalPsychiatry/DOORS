import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import YourProgress from '../../general/YourProgress';
import StyledButton from '../../general/StyledButton';
import { useChangeRoute, useHandleChangeRoute } from '../../layout/hooks';
import { useClassData } from '../../../database/useClassData';
import { tables } from '../../../database/dbConfig';

export default function Resources() {
  const handleChangeRoute = useHandleChangeRoute();
  const changeRoute = useChangeRoute();
  const { data: adminData } = useClassData({ Model: tables.classesAdmin });

  const { resources = [] } = adminData;
  console.log({ resources });

  const { data: studentData, handleChange } = useClassData({ Model: tables.classesStudent });
  const { completed } = studentData;

  const handleComplete = React.useCallback(() => {
    handleChange('completed')({ target: { value: true } });
    changeRoute('/Congratulations');
  }, [handleChange, changeRoute]);

  return (
    <Page title='Resources' ActionButton={() => <YourProgress value={100} />}>
      <>
        <Typography>You can visit the following resources to complement your learning and practice your skills.</Typography>
        <Grid container spacing={3}></Grid>
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={148} variant='secondary' onClick={handleChangeRoute('/Post-Survey')}>
                Back
              </StyledButton>
            </Grid>
            {completed !== 111 && (
              <Grid item>
                <StyledButton width={148} onClick={handleComplete}>
                  End Session
                </StyledButton>
              </Grid>
            )}
          </Grid>
        </Box>
      </>
    </Page>
  );
}
