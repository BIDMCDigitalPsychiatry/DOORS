import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import YourProgress from '../../general/YourProgress';
import StyledButton from '../../general/StyledButton';
import { useHandleChangeRoute } from '../../layout/hooks';
import { useClassData } from '../../../database/useClassData';
import { tables } from '../../../database/dbConfig';
import { BlockListClassResource } from '../../general/BlockListClassResource';

export default function Resources() {
  const handleChangeRoute = useHandleChangeRoute();
  const { data: adminData } = useClassData({ Model: tables.classesAdmin });

  const { classResources = [] } = adminData;

  const { data: studentData, updateData } = useClassData({ Model: tables.classesStudent });
  const { completed } = studentData;

  const handleComplete = React.useCallback(() => {
    updateData({ completed: true }, handleChangeRoute('/Congratulations'));
  }, [updateData, handleChangeRoute]);

  return (
    <Page title='Resources' ActionButton={() => <YourProgress value={100} />}>
      <>
        <Typography>You can visit the following resources to complement your learning and practice your skills.</Typography>
        <BlockListClassResource value={classResources} />
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item>
              <StyledButton width={148} variant='secondary' onClick={handleChangeRoute('/Post-Survey')}>
                Back
              </StyledButton>
            </Grid>

            <Grid item>
              {completed !== true ? (
                <StyledButton width={148} onClick={handleComplete}>
                  End Session
                </StyledButton>
              ) : (
                <StyledButton width={148} onClick={handleChangeRoute('/Classes')}>
                  My Classes
                </StyledButton>
              )}
            </Grid>
          </Grid>
        </Box>
      </>
    </Page>
  );
}
