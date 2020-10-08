import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Page from '../Page';
import YourProgress from '../../general/YourProgress';
import { useHandleChangeRoute, useWidth } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import { tables } from '../../../database/dbConfig';
import { useClassData } from '../../../database/useClassData';
import { isEmpty } from '../../../helpers';
import group from '../../../images/group.png';

export default function Congratulations() {
  const changeRoute = useHandleChangeRoute();
  const { data } = useClassData({ Model: tables.classesAdmin });
  const { headline, name } = data;
  const width = useWidth();

  const displayText = [headline, name].filter(x => !isEmpty(x)).join(' - ');

  return (
    <Page title='Congratulations' ActionButton={() => <YourProgress value={100} />}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>{`You completed ${displayText}`}</Typography>
        </Grid>
        <Grid item xs>
          <img src={group} alt='logo' style={{ width: Math.min(width - 32, 400) }} />
        </Grid>
        <Grid item xs={12}>
          <StyledButton onClick={changeRoute('/Classes')}>Go to My Classes</StyledButton>
        </Grid>
      </Grid>
    </Page>
  );
}
