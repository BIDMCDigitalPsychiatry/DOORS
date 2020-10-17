import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionCard from '../../../general/ActionCard';
import ChildPage from '../../ChildPage';
import { useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import { useSignedInAsText } from '../../../../hooks';
import { isEmpty } from '../../../../helpers';
import { useHandleCreateSession } from '../../../../database/useSessions';

const actionCards = [
  {
    title: 'Class Mode',
    description: 'View the class materials the way your students will',
    disabled: false,
    createSession: true
  },
  { title: 'Edit Materials', description: 'Review and edit class materials', route: '/ClassMaterials' },
  { title: 'Class Roster', description: 'View current participants and new members', route: '/ClassRoster' }
];

export default function AdminClassDashboard() {
  const [{ class: classData }] = useLayout();

  const { name, headline, keySkills = [] } = classData;

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const handleCreateSession = useHandleCreateSession({ studentId: undefined, studentUserId: undefined, groupId: undefined }); // Don't specify student or group id's when viewing as student

  const cards = actionCards;

  return (
    <ChildPage backLabel='Back to Classes' onBack={handleChangeRouteLayout('/Classes')} supertitle={name} title={headline} subtitle={useSignedInAsText()}>
      <Box mt={2}>
        <Typography variant='h6' style={{ fontWeight: 'bold' }}>
          Key Skills:
        </Typography>
        <Box mt={1} ml={1} mb={3}>
          {keySkills
            .filter(s => !isEmpty(s))
            .map(({ id, name }, i) => (
              <Typography key={`${name}-${id}`} variant='subtitle1'>
                • {name}
              </Typography>
            ))}
        </Box>
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
      </Box>
    </ChildPage>
  );
}
