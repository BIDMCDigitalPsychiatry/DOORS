import * as React from 'react';
import { Grid, Box, Divider, Typography } from '@material-ui/core';
import { useLayout } from '../layout/hooks';
import DialogButton from '../application/GenericDialog/DialogButton';
import * as CreateGroupDialog from '../application/GenericDialog/CreateGroup';
import { useFullScreen, useIsAdminMode, useSignedInAsText } from '../../hooks';
import { useGroups } from '../../database/useGroups';
import ClassGroup from './Class/ClassGroup';
import Page from './Page';

const width = 200;

const CreateGroupButton = ({ initialValues = undefined, onClose, disabled }) => (
  <Grid container style={{ width }} spacing={1} justify='center'>
    <Grid item xs={12}>
      <DialogButton
        Module={CreateGroupDialog}
        onClose={onClose}
        fullWidth={true}
        variant='styled'
        size='large'
        disabled={disabled}
        initialValues={initialValues}
      >
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

  const [showArchived, setShowArchived] = React.useState(false);

  const Buttons = React.useCallback(() => {
    return (
      <Grid container spacing={3}>
        <Grid item xs>
          <Grid container style={{ width }} spacing={1} justify='center'>
            <Grid item xs={12}>
              <DialogButton size='large' onClick={() => setShowArchived(!showArchived)} fullWidth variant='styled'>
                {showArchived ? 'Hide Archived' : 'Show Archived'}
              </DialogButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs>
          <CreateGroupButton onClose={handleRefresh} disabled={loading} initialValues={{ userId }} />
        </Grid>
      </Grid>
    );
  }, [handleRefresh, loading, userId, showArchived]);

  return (
    <Page loading={loading} title={isAdminMode ? `Instructor Groups` : 'My Groups'} subtitle={useSignedInAsText()} ActionButton={Buttons}>
      <>
        <Box mt={2}>
          <Divider />
          <Grid container style={{ padding: !fullScreen ? 24 : 8 }} spacing={3}>
            {groups
              .filter(c => showArchived || !c.deleted)
              .map((g, i) => (
                <Grid item key={g?.id} xs={12}>
                  <ClassGroup {...g} handleRefreshGroups={handleRefresh} mount={i === 0} />
                </Grid>
              ))}
          </Grid>
          {showArchived && groups.filter(c => c.deleted).length === 0 && (
            <>
              <Box m={3}>
                <Typography color='error'>There are no archived groups at this time.</Typography>
              </Box>
            </>
          )}
        </Box>
      </>
    </Page>
  );
}
