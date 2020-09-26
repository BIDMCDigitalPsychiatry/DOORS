import * as React from 'react';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import ActionCard from '../../general/ActionCard';
import * as Icons from '@material-ui/icons';
import StyledButton from '../../general/StyledButton';
import SessionPresentationFile from './SessionPresentationFile';
import { BlockList } from '../../general/BlockList';
import { tables } from '../../../database/dbConfig';
import { useLocationData } from '../../../database/useLocationData';
import { isEmpty } from '../../../helpers';

const Model = tables.sessions;
export default function SessionMaterials() {
  const { data, handleChange }: any = useLocationData({ Model });
  const {
    name,
    header,
    keySkills = [],
    rankingModel = [],
    classResources = [],
    classPresentation = { name: 'Unknown File Name', date: 'Unknown Date' }
  } = data;

  const handleChangeRoute = useHandleChangeRoute();

  return (
    <ChildPage
      backLabel='Back to Session'
      onBack={handleChangeRoute('/SessionDashboard', data)}
      title={[name, header].filter(x => !isEmpty(x)).join(' - ')}
      subtitle='Edit Class Materials'
    >
      <Box mt={2}>
        <Divider />
        <Grid container style={{ marginTop: 16 }} spacing={3}>
          <Grid item xs={12}>
            <BlockList title='Key Skills' value={keySkills} add={true} edit={true} remove={true} onChange={handleChange('keySkills')} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
              Ranking Model
            </Typography>
            <Box mt={3}>
              <Grid container spacing={2}>
                {rankingModel.map(({ name, id }) => (
                  <Grid key={id} item lg={2} sm={6} xs={12}>
                    <ActionCard title={name} minHeight={132} titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
              Survey Questions
            </Typography>
            <Grid container justify='space-between' spacing={2}>
              <Grid item xs>
                <Typography variant='subtitle1' color='textPrimary'>
                  Questions are related to the class materials and will be rated by students from 1 to 5 based on the Ranking Model
                </Typography>
              </Grid>
              <Grid item style={{ display: 'inline-flex', width: 175 }}>
                <Icons.Lock color='primary' />
                <Typography variant='subtitle1' color='primary'>
                  You can't remove any locked items
                </Typography>
              </Grid>
            </Grid>
            <Box mt={1}>
              <Grid container spacing={2}>
                {rankingModel.map(({ name, id }) => (
                  <Grid key={id} item lg={4} sm={6} xs={12}>
                    <ActionCard title={name} minHeight={112} titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }} />
                  </Grid>
                ))}
                <Grid key={'add'} item lg={4} sm={6} xs={12}>
                  <StyledButton>Add New</StyledButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
              Class Resources
            </Typography>
            <Typography variant='subtitle1' color='textPrimary'>
              Add links to resources that are relevant to the lesson
            </Typography>
            <Box mt={1}>
              <Grid container spacing={2}>
                {classResources.map(({ label, description }, i) => (
                  <Grid key={i} item lg={4} sm={6} xs={12}>
                    <ActionCard title={label} description={description} minHeight={112} titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }} />
                  </Grid>
                ))}
                <Grid key={'add'} item lg={4} sm={6} xs={12}>
                  <StyledButton>Add New</StyledButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
              Class Presentation
            </Typography>
            <Typography variant='subtitle1' color='textPrimary'>
              Current class presentation file
            </Typography>
            <SessionPresentationFile {...classPresentation} />
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}
