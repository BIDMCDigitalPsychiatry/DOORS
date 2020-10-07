import * as React from 'react';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRouteLayout } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import ClassPresentationFile from './ClassPresentationFile';
import { BlockList } from '../../general/BlockList';
import { tables } from '../../../database/dbConfig';
import { getClassTitle, isEmpty } from '../../../helpers';
import useFormState from '../../hooks/useFormState';
import Text from '../../application/DialogField/Text';
import ImageSelector from '../../application/DialogField/ImageSelector';
import { useClassData } from '../../../database/useClassData';

const Model = tables.classesAdmin;
const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

const TitleButton = ({ onClick }) => <StyledButton onClick={onClick}>Save Changes</StyledButton>;

export default function ClassMaterials() {
  const { data, handleChange }: any = useClassData({ Model });
  const {
    name,
    headline,
    image,
    keySkills = [],
    rankingModel = [],
    classResources = [],
    surveyQuestions = [],
    classPresentation = { name: 'Unknown File Name', date: 'Unknown Date' }
  } = data;

  const handleChangeRouteLayout = useHandleChangeRouteLayout();

  const { formState, handleUpdate } = useFormState({ Model, validate, onSuccess: handleChangeRouteLayout('/Classes') });
  const { loading, errors } = formState;

  return (
    <ChildPage
      backLabel='Back to Class'
      onBack={handleChangeRouteLayout('/ClassDashboard', { class: data })}
      title={getClassTitle({ headline, name })}
      subtitle='Edit Class Materials'
      TitleButton={props => <TitleButton onClick={handleUpdate(data)} {...props} />}
    >
      <Box mt={2}>
        <Divider />

        <Grid container style={{ marginTop: 16 }} spacing={3}>
          <Grid item>
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
          <Grid item>
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

          <Grid item xs={12}>
            <BlockList title='Key Skills' value={keySkills} add={true} edit={true} remove={true} onChange={handleChange('keySkills')} />
          </Grid>
          <Grid item xs={12}>
            <BlockList title='Ranking Model' value={rankingModel} add={false} edit={true} remove={false} onChange={handleChange('rankingModel')} />
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
            <ClassPresentationFile {...classPresentation} />
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}

/*
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

*/
