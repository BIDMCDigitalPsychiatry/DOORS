import * as React from 'react';
import { Grid, Box, Typography, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useChangeRoute, useHandleChangeRoute, useUserId } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import SessionPresentationFile from './SessionPresentationFile';
import Text from '../../application/DialogField/Text';
import { BlockList } from '../../general/BlockList';
import Session, { defaultRankingModels } from '../../../database/models/Session';
import { isEmpty, uuid } from '../../../helpers';
import useProcessData from '../../../database/useProcessData';
import { tables } from '../../../database/dbConfig';
import { useSnackBar } from '../../application/SnackBar/useSnackBar';

const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

export default function CreateSession() {
  const adminId = useUserId();
  const [formState, setFormState] = React.useState({
    loading: false,
    error: undefined,
    errors: {}
  });

  const { loading, error, errors } = formState;
  console.log({ loading, error, errors });

  const [state, setState] = React.useState({
    id: uuid(),
    adminId,
    name: '',
    keySkills: [],
    surveyQuestions: [],
    rankingModel: defaultRankingModels,
    classResources: [],
    classPresentation: { name: 'Unknown File Name', date: 'Unknown Date' }
  } as Session);

  const { name, keySkills, rankingModel, surveyQuestions, classResources, classPresentation } = state;

  const handleChangeRoute = useHandleChangeRoute();
  const changeRoute = useChangeRoute();
  const handleChange = React.useCallback(
    key => ({ target }) => {
      const { value } = target;
      setState(prev => ({ ...prev, [`${key}`]: value }));
    },
    [setState]
  );

  const processData = useProcessData();
  const [, setSnackbar] = useSnackBar();

  const handleSubmit = Data => () => {
    setFormState(prev => ({ ...prev, loading: true, error: undefined, errors: {} }));
    const errors = validate(Data);
    console.log({ errors, length: Object.keys(errors).length });
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, loading: false, errors }));
      setSnackbar({ open: true, variant: 'error', message: 'Input validation error' });
    } else {
      processData({
        Model: tables.sessions,
        Action: 'c',
        Data,
        onError: () => {
          setFormState(prev => ({ ...prev, loading: false, error: 'Error creating session' }));
          setSnackbar({ open: true, variant: 'error', message: 'Error Creating Session' });
        },
        onSuccess: () => {
          setFormState(prev => ({ ...prev, loading: false, error: undefined }));
          setSnackbar({ open: true, variant: 'success', message: 'Created Session' });
          changeRoute('/Sessions');
        }
      });
    }
  };

  return (
    <ChildPage backLabel='Back to Sessions' onBack={handleChangeRoute('/Sessions')} title='Create New Session'>
      <Box mt={2}>
        <Divider />
        <Grid container style={{ marginTop: 16 }} spacing={3}>
          <Grid item xs={12}>
            <Text
              error={errors['name']}
              autoFocus
              disabled={loading}
              placeholder='Enter Session Name'
              value={name}
              onChange={handleChange('name')}
              label='Session Name'
              fullWidth={false}
            />
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
            <StyledButton onClick={handleSubmit(state)}>Create New Session</StyledButton>
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}
