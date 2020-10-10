import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ActionCard from '../../general/ActionCard';
import ChildPage from '../ChildPage';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import { useUserType } from '../../../hooks';
import { isEmpty, uuid } from '../../../helpers';
import { tables } from '../../../database/dbConfig';
import { useClassData } from '../../../database/useClassData';

const actionCards = [
  {
    title: 'Class Mode',
    description: 'View the class materials the way your students will',
    route: '/Pre-Survey',
    disabled: false,
    data: data => ({ ...data, deleted: true, id: [data?.id, uuid()].join(':') }) // Generate a new session id to simulate class mode, also default to deleted so it doesn't show up in the class list if the instructor happens to be a student as well
  },
  { title: 'Edit Materials', description: 'Review and edit class materials', route: '/ClassMaterials' },
  { title: 'Class Roster', description: 'View current participants and new members', route: '/ClassRoster' }
];

const Model = tables.classesAdmin;

export default function ClassDashboard() {
  const { data } = useClassData({ Model });
  const { name, headline, keySkills = [] } = data;

  const userType = useUserType();
  const handleChangeRouteLayout = useHandleChangeRouteLayout();

  return (
    <ChildPage
      backLabel='Back to Classes'
      onBack={handleChangeRouteLayout('/Classes')}
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
              <ActionCard {...ac} minHeight={150} onClick={handleChangeRouteLayout(ac.route, { class: ac.data ? ac.data(data) : data })} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ChildPage>
  );
}
