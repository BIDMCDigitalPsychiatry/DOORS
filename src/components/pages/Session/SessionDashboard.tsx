import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import { useUserType } from '../../../hooks';
import { isEmpty } from '../../../helpers';
import { tables } from '../../../database/dbConfig';
import { useLocationData } from '../../../database/useLocationData';

const actionCards = [
  { title: 'Class Mode', description: 'View the class materials the way your students will', route: '/Pre-Survey', disabled: false },
  { title: 'Edit Materials', description: 'Review and edit class materials', route: '/SessionMaterials' },
  { title: 'Class Roster', description: 'View current participants and new members', route: '/ClassRoster' }
];

const Model = tables.sessions;

export default function SessionDashboard() {
  const { data } = useLocationData({ Model });
  const { name, headline, keySkills = [] } = data;

  const userType = useUserType();
  const handleChangeRoute = useHandleChangeRoute();

  return (
    <ChildPage
      backLabel='Back to Sessions'
      onBack={handleChangeRoute('/Sessions')}
      supertitle={name}
      title={headline}
      subtitle={`Your are signed in as ${userType === 'Student' ? 'a' : 'an'} ${userType}`}
    >
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
          {actionCards.map(ac => (
            <Grid key={ac.title} item lg={4} sm={4} xs={12}>
              <ActionCard {...ac} minHeight={150} onClick={handleChangeRoute(ac.route, data)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ChildPage>
  );
}
