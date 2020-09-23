import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import { useLocation } from 'react-router';
import { useUserType } from '../../../hooks';
import { isEmpty } from '../../../helpers';

const actionCards = [
  { title: 'Class Mode', description: 'View the class materials the way your students will', route: '/Pre-Survey', disabled: false },
  { title: 'Edit Materials', description: 'Review and edit class materials', route: '/SessionMaterials' },
  { title: 'Class Roster', description: 'View current participants and new members', route: '/SessionMembers' }
];

export default function SessionDashboard({ supertitle }) {
  const { state }: any = useLocation();
  const { title, subtitle, keySkills = [] } = state ?? {};
  const userType = useUserType();
  const handleChangeRoute = useHandleChangeRoute();
  return (
    <ChildPage
      backLabel='Back to Sessions'
      onBack={handleChangeRoute('/Sessions')}
      supertitle={title}
      title={subtitle}
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
              <ActionCard {...ac} onClick={handleChangeRoute(ac.route, state)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ChildPage>
  );
}
