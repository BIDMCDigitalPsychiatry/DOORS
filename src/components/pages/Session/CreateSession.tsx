import * as React from 'react';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute, useUserId } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import SessionPresentationFile from './SessionPresentationFile';
import Text from '../../application/DialogField/Text';
import { BlockList } from '../../general/BlockList';
import Session, { defaultRankingModels } from '../../../database/models/Session';
import { isEmpty, uuid } from '../../../helpers';
import { tables } from '../../../database/dbConfig';
import ImageSelector from '../../application/DialogField/ImageSelector';
import useFormState from '../../hooks/useFormState';

const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};
const Model = tables.sessions;
export default function CreateSession() {
  const adminId = useUserId();
  const handleChangeRoute = useHandleChangeRoute();
  const { formState, handleCreate } = useFormState({ Model, validate, onSuccess: handleChangeRoute('/Sessions') });
  const { loading, errors } = formState;

  const [state, setState] = React.useState({
    id: uuid(),
    adminId,
    name: '',
    image: '',
    headline: '',
    keySkills: [],
    surveyQuestions: [],
    rankingModel: defaultRankingModels,
    classResources: [],
    classPresentation: { name: 'Unknown File Name', date: 'Unknown Date' }
  } as Session);

  const { name, headline, image, keySkills, rankingModel, surveyQuestions, classResources, classPresentation } = state;

  const handleChange = React.useCallback(
    key => ({ target }) => {
      const { value } = target;
      setState(prev => ({ ...prev, [`${key}`]: value }));
    },
    [setState]
  );

  return (
    <ChildPage backLabel='Back to Sessions' onBack={handleChangeRoute('/Sessions')} title='Create New Session'>
      <Box mt={2}>
        <Divider />
        <Grid container style={{ marginTop: 16 }} spacing={3}>
          <Grid item xs={12}>
            <Text
              error={errors['headline']}
              autoFocus
              disabled={loading}
              placeholder='Enter Session Headline'
              value={headline}
              onChange={handleChange('headline')}
              label='Session Headline'
              fullWidth={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Text
              error={errors['name']}
              disabled={loading}
              placeholder='Enter Session Name'
              value={name}
              onChange={handleChange('name')}
              label='Session Name'
              fullWidth={false}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageSelector error={errors['image']} disabled={loading} value={image} onChange={handleChange('image')} label='Associated Image' />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='caption' color='textPrimary'>
              Edit Class Materials
            </Typography>
            <BlockList title='Key Skills' value={keySkills} add={true} edit={true} remove={true} onChange={handleChange('keySkills')} />
          </Grid>
          <Grid item xs={12}>
            <BlockList
              title='Survey Questions'
              subtitle='Questions are related to the class materials and will be rated by students from 1 to 5 based on the Ranking Model'
              value={surveyQuestions}
              add={true}
              edit={true}
              remove={true}
              onChange={handleChange('surveyQuestions')}
            />
          </Grid>
          <Grid item xs={12}>
            <BlockList
              title='Ranking Model'
              showIndexBadges={true}
              value={rankingModel}
              add={false}
              edit={true}
              remove={false}
              onChange={handleChange('rankingModel')}
            />
          </Grid>
          <Grid item xs={12}>
            <BlockList
              title='Class Resources'
              subtitle='To be completed - Add links to resources that are relevant to the lesson'
              value={classResources}
              add={true}
              onChange={handleChange('classResources')}
            />
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
          <Grid item xs={12}>
            <StyledButton onClick={handleCreate(state)}>Create New Session</StyledButton>
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}
