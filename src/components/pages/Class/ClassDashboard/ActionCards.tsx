import * as React from 'react';
import { Grid } from '@material-ui/core';
import ActionCard from '../../../general/ActionCard';
import { useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import { useHandleCreateSession } from '../../../../database/useSessions';

export default function ActionCards({ cards }) {
  const [{ class: classData }] = useLayout();

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const handleCreateSession = useHandleCreateSession({ studentId: undefined, studentUserId: undefined, groupId: undefined }); // Don't specify student or group id's when viewing as student

  return (
    <Grid container spacing={3}>
      {cards.map(ac => (
        <Grid key={ac.title} item lg={4} sm={4} xs={12}>
          <ActionCard
            {...ac}
            minHeight={150}
            onClick={ac.createSession ? handleCreateSession({ ...classData, deleted: true }) : handleChangeRouteLayout(ac.route)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
