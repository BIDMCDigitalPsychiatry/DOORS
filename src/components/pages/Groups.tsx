import * as React from 'react';
import { Grid, Box, Divider } from '@material-ui/core';
import { useLayout } from '../layout/hooks';
import DialogButton from '../application/GenericDialog/DialogButton';
import * as CreateGroupDialog from '../application/GenericDialog/CreateGroup';
import { useFullScreen, useIsAdminMode, useSignedInAsText } from '../../hooks';
import { useGroups } from '../../database/useGroups';
import ClassGroup from './Class/ClassGroup';
import Page from './Page';

const CreateGroupButton = ({ initialValues = undefined, onClose, disabled }) => (
  <Grid container style={{ width: 270 }} spacing={1} justify='center'>
    <Grid item xs={12}>
      <DialogButton Module={CreateGroupDialog} onClose={onClose} variant='styled' size='large' fullWidth disabled={disabled} initialValues={initialValues}>
        Create Group
      </DialogButton>
    </Grid>
  </Grid>
);

export default function Groups() {
  const isAdminMode = useIsAdminMode();
  const [{ instructor }] = useLayout();
  const userId = instructor?.userId;
  const fullScreen = useFullScreen();

  const { data: groups, handleRefresh, loading } = useGroups({
    requestParams: instructor && {
      // If instructor mode, then filter groups by instructor's userId
      FilterExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': instructor?.userId
      }
    }
  });

  return (
    <Page
      loading={loading}
      title={isAdminMode ? `Instructor Groups` : 'My Groups'}
      subtitle={useSignedInAsText()}
      ActionButton={() => <CreateGroupButton onClose={handleRefresh} disabled={loading} initialValues={{ userId }} />}
    >
      <>
        <Box mt={2}>
          <Divider />
          <Grid container style={{ padding: !fullScreen ? 24 : 8 }} spacing={3}>
            {groups.map((g, i) => (
              <Grid item key={g?.id} xs={12}>
                <ClassGroup {...g} mount={i === 0} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    </Page>
  );
}
