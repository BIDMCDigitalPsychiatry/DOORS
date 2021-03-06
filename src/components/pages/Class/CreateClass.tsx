import * as React from 'react';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute, useUserId } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import Text from '../../application/DialogField/Text';
import { BlockList } from '../../general/BlockList';
import { isEmpty, uuid } from '../../../helpers';
import { tables } from '../../../database/dbConfig';
import ImageSelector from '../../application/DialogField/ImageSelector';
import useFormState from '../../hooks/useFormState';
import Class, { defaultRankingModels } from '../../../database/models/Class';
import { BlockListClassResource } from '../../general/BlockListClassResource';
import { BlockListClassPresentation } from '../../general/BlockListClassPresentation';
import { useIsInstructorMode, useUserType } from '../../../hooks';
import { PreRecs } from '../../general/PreRecs';

const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

export default function CreateClass() {
  const userId = useUserId();
  const Model = tables.classes;

  const handleChangeRoute = useHandleChangeRoute();
  const { formState, handleCreate } = useFormState({ Model, validate, onSuccess: handleChangeRoute('/Classes') });
  const { loading, errors } = formState;

  const userType = useUserType();

  const [state, setState] = React.useState({
    id: uuid(),
    userId,
    userType,
    name: '',
    image: 'wifi',
    headline: '',
    preRecs: {},
    keySkills: [],
    surveyQuestions: [],
    rankingModel: defaultRankingModels,
    classResources: [],
    classPresentations: []
  } as Class);

  const { name, preRecs, headline, image, keySkills, rankingModel, surveyQuestions, classResources, classPresentations } = state;

  const isInstructorMode = useIsInstructorMode();

  const handleChange = React.useCallback(
    key => ({ target }) => {
      const { value } = target;
      setState(prev => ({ ...prev, [`${key}`]: value }));
    },
    [setState]
  );

  const isOwner = true;

  return (
    <ChildPage backLabel='Back to Classes' onBack={handleChangeRoute('/Classes')} title='Create New Class'>
      <Box mt={2}>
        <Divider />
        <Grid container style={{ marginTop: 16 }} spacing={3}>
          <Grid item xs={12}>
            <Text
              error={errors['headline']}
              autoFocus
              disabled={loading}
              placeholder='Enter Class Headline'
              value={headline}
              onChange={handleChange('headline')}
              label='Class Headline'
              fullWidth={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Text
              error={errors['name']}
              disabled={loading}
              placeholder='Enter Class Name'
              value={name}
              onChange={handleChange('name')}
              label='Class Name'
              fullWidth={false}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageSelector error={errors['image']} disabled={loading} value={image} onChange={handleChange('image')} label='Associated Image' />
          </Grid>
          {isInstructorMode && (
            <Grid item xs={12}>
              <PreRecs disabled={loading} value={preRecs} onChange={handleChange('preRecs')} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant='caption' color='textPrimary'>
              Edit Class Materials
            </Typography>
            <BlockList title='Key Skills' isOwner={isOwner} value={keySkills} add={true} edit={true} remove={true} onChange={handleChange('keySkills')} />
          </Grid>
          <Grid item xs={12}>
            <BlockList
              title='Survey Questions'
              subtitle='Questions are related to the class materials and will be rated by students from 1 to 5 based on the Ranking Model'
              isOwner={isOwner}
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
              isOwner={isOwner}
              value={rankingModel}
              add={false}
              edit={true}
              remove={false}
              onChange={handleChange('rankingModel')}
            />
          </Grid>
          <Grid item xs={12}>
            <BlockListClassPresentation
              title='Class Presentation Videos'
              subtitle='Add links to the class presentation videos that are relevant to the lesson'
              isOwner={isOwner}
              value={classPresentations}
              add={true}
              edit={true}
              onChange={handleChange('classPresentations')}
            />
          </Grid>
          <Grid item xs={12}>
            <BlockListClassResource
              title='Class Resources'
              subtitle='Add links to resources that are relevant to the lesson'
              value={classResources}
              isOwner={isOwner}
              add={true}
              onChange={handleChange('classResources')}
              enableLock={true}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton onClick={handleCreate(state)}>Create New Class</StyledButton>
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}
