import * as React from 'react';
import { Grid, Box, Divider } from '@material-ui/core';
import ChildPage from '../ChildPage';
import { useHandleChangeRoute } from '../../layout/hooks';
import StyledButton from '../../general/StyledButton';
import { tables } from '../../../database/dbConfig';
import { useLocationData } from '../../../database/useLocationData';
import { isEmpty } from '../../../helpers';
import useFormState from '../../hooks/useFormState';

const Model = tables.sessions;
const validate = ({ name }) => {
  const newErrors = {};
  if (isEmpty(name)) {
    newErrors['name'] = 'Required';
  }
  return newErrors;
};

const TitleButton = ({ onClick }) => (
  <Grid container style={{ width: 270 }} spacing={1} justify='center'>
    <Grid item xs={12}>
      <StyledButton fullWidth onClick={onClick}>
        Create Group
      </StyledButton>
    </Grid>
    <Grid item xs={12}>
      <StyledButton fullWidth variant='secondary' onClick={onClick}>
        Enter Existing Group ID
      </StyledButton>
    </Grid>
    <Grid item xs={12}>
      <StyledButton fullWidth variant='text' onClick={onClick}>
        View All Groups
      </StyledButton>
    </Grid>
  </Grid>
);

export default function ClassRoster() {
  const { data }: any = useLocationData({ Model });
  const { name, headline } = data;

  const handleChangeRoute = useHandleChangeRoute();

  const { formState, handleUpdate } = useFormState({ Model, validate, onSuccess: handleChangeRoute('/Sessions') });
  const { loading, errors } = formState;

  return (
    <ChildPage
      backLabel='Back to Session'
      onBack={handleChangeRoute('/SessionDashboard', data)}
      title={[headline, name].filter(x => !isEmpty(x)).join(' - ')}
      subtitle='Class Roster'
      TitleButton={props => <TitleButton onClick={handleUpdate(data)} {...props} />}
    >
      <Box mt={2}>
        <Divider />
      </Box>
    </ChildPage>
  );
}
