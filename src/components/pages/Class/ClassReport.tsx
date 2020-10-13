import * as React from 'react';
import { Grid, Box, Divider, Typography } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRouteLayout, useLayout } from '../../layout/hooks';
import { tables } from '../../../database/dbConfig';
import { getClassTitle, getDateFromTimestamp, isEmpty } from '../../../helpers';
import { useFullScreen } from '../../../hooks';
import { useClassData } from '../../../database/useClassData';
import useTableRow from '../../../database/useTableRow';
import useGroupStudents from '../../../database/useGroupStudents';
import RankingModel from './RankingModel';
import { Participants } from './Participants';
import MarginDivider from '../../application/DialogField/MarginDivider';

const Model = tables.classesAdmin;

export default function ClassReport() {
  const [state, setState] = React.useState({ loading: false });
  const [{ groupId }] = useLayout();
  const { row: group } = useTableRow({ Model: tables.groups, id: groupId, state, setState });
  const { activeStudents } = useGroupStudents({ groupId });

  const { data }: any = useClassData({ Model });
  const { rankingModel } = data;
  const { name, headline } = data;

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const fs = useFullScreen();

  return (
    <ChildPage
      backLabel='Back to Class Roster'
      onBack={handleChangeRouteLayout('/ClassRoster', { class: data })}
      title={getClassTitle({ headline, name })}
      subtitle='Class Report'
    >
      <Box mt={2}>
        <Divider />
        <Grid container style={{ padding: !fs ? 24 : 8 }} spacing={fs ? 2 : 4}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>{group?.name}</Typography>
            {!isEmpty(group?.location) && <Typography variant='body2'>Location: {group?.location}</Typography>}
            {!isEmpty(group?.type) && <Typography variant='body2'>Type: {group?.location}</Typography>}
            {!isEmpty(group?.created) && (
              <Box mt={1}>
                <Typography variant='caption'>Created on {getDateFromTimestamp(group?.created)}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <RankingModel rankingModel={rankingModel} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>Average Group Answers</Typography>
            <MarginDivider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>View Individual Answers</Typography>
            <MarginDivider />
            <Box mt={2}>
              <Grid container>
                <Grid item xs>
                  {[{ students: activeStudents, label: 'Class Participants', view: false, viewReport: true, remove: false }]
                    .filter(i => i.students.length > 0)
                    .map((props, i) => (
                      <Participants key={i} {...props} />
                    ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}
