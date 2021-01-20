import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Class from '../Class';
import Page from '../../Page';
import { useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import CreateNewClassButton from './CreateNewClassButton';
import useClassesByUserId from '../useClassesByUserId';
import DialogButton from '../../../application/GenericDialog/DialogButton';
import useTableRow from '../../../../database/useTableRow';
import { tables } from '../../../../database/dbConfig';
import { uuid } from '../../../../helpers';
import { useIsAdminMode, useUserType } from '../../../../hooks';
import useAdminClasses from '../useAdminClasses';
import * as ClassImportDialog from '../../../application/GenericDialog/ClassImport';
import * as ClassImportReplaceDialog from '../../../application/GenericDialog/ClassImportReplace';

export default function InstructorClasses() {
  const isAdminMode = useIsAdminMode();
  const [{ back, instructor }] = useLayout();
  const { userId } = instructor;
  const [showArchived, setShowArchived] = React.useState(false);

  const { data: instructorClasses, handleRefresh: refreshInstructor, loading } = useClassesByUserId({ userId });
  const { data: adminClasses, handleRefresh: refreshAdmin, loading: loadingParent } = useAdminClasses();

  const notAddedClasses = adminClasses.filter(ac => !ac.deleted && !instructorClasses.find(ic => ic.parentClassId === ac.id || ic.id === ac.id));
  const notAddedClasses_str = JSON.stringify(notAddedClasses);

  // Determines which classes have newer versions available and sets up the data structures for the import dialog
  var importUpdateClasses = [];
  var archiveClasses = [];

  instructorClasses
    .filter(c => (showArchived && c.deleted) || (!showArchived && !c.deleted))
    .forEach(c => {
      const parentAdminClass = adminClasses.find(ac => (!ac.deleted && ac.id === c.parentClassId) || c.id === ac.id);
      const isNew =
        parentAdminClass &&
        parentAdminClass.updated &&
        (parentAdminClass.updated > c.updated || (c.parentClass && c.parentClass.updated && c.parentClass.updated < parentAdminClass.updated));
      if (isNew) {
        importUpdateClasses.push({ ...parentAdminClass, imported: true }); // Select import by default
        archiveClasses.push({ ...c, imported: true }); // Select import by default
      }
    });

  const handleRefresh = React.useCallback(() => {
    refreshInstructor();
    refreshAdmin();
  }, [refreshInstructor, refreshAdmin]);

  const changeRouteLayout = useHandleChangeRouteLayout();

  const { setRow } = useTableRow({ Model: tables.classes });

  const userType = useUserType();

  const handleAdd = React.useCallback(() => {
    const classes = JSON.parse(notAddedClasses_str);
    classes.forEach((c, i) => {
      const { created, updated, deleted, ...other } = c;
      const id = uuid();
      const now = new Date().getTime();
      setRow({
        id,
        values: { ...other, id, parentUserId: c.userId, parentClassId: c.id, parentClass: c, userId, created: now, updated: now, userType },
        onSuccess: i === classes.length - 1 && handleRefresh
      });
    });
  }, [setRow, handleRefresh, notAddedClasses_str, userId, userType]);

  const Buttons = React.useCallback(() => {
    return (
      <Grid container spacing={3}>
        <Grid item>
          <DialogButton size='large' onClick={() => setShowArchived(!showArchived)} fullWidth variant='styled'>
            {showArchived ? 'Hide Archived' : 'Show Archived'}
          </DialogButton>
        </Grid>
        {!isAdminMode && (
          <Grid item>
            <CreateNewClassButton />
          </Grid>
        )}
      </Grid>
    );
  }, [isAdminMode, showArchived]);

  return (
    <Page
      title='Instructor Classes'
      loading={loading || loadingParent}
      ActionButton={Buttons}
      backLabel={back?.label}
      onBack={back?.route && changeRouteLayout(back.route)}
    >
      <Grid container spacing={3}>
        {!showArchived && (notAddedClasses.length > 0 || importUpdateClasses.length > 0) && (
          <Grid item xs={12}>
            <Box pt={1} pb={1}>
              {notAddedClasses.length > 0 && (
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant='body2' color='error'>
                      {notAddedClasses.length === 1
                        ? `There is ${notAddedClasses.length} admin class which is not included in your available classes.`
                        : `There are ${notAddedClasses.length} admin classes which are not included in your available classes.`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>|</Typography>
                  </Grid>
                  <Grid item>
                    <DialogButton onClick={handleAdd} variant='link' underline='always'>
                      Import All
                    </DialogButton>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>|</Typography>
                  </Grid>
                  <Grid item>
                    <DialogButton
                      Module={ClassImportDialog}
                      initialValues={{ classes: notAddedClasses }}
                      onClose={handleRefresh}
                      variant='link'
                      underline='always'
                    >
                      Manual Import
                    </DialogButton>
                  </Grid>
                </Grid>
              )}
              {importUpdateClasses.length > 0 && (
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant='body2' color='error'>
                      {importUpdateClasses.length === 1
                        ? `There is ${importUpdateClasses.length} admin class which has been updated with newer revisions.`
                        : `There are ${importUpdateClasses.length} admin classes which have been updated with newer revisions.`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='body2'>|</Typography>
                  </Grid>
                  <Grid item>
                    <DialogButton
                      Module={ClassImportReplaceDialog}
                      initialValues={{ classes: importUpdateClasses, archiveClasses }}
                      onClose={handleRefresh}
                      variant='link'
                      underline='always'
                    >
                      Import New Updates
                    </DialogButton>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        )}

        {showArchived && instructorClasses.filter(c => c.deleted).length === 0 && (
          <>
            <Box m={3}>
              <Typography>There are no archived classes at this time.</Typography>
            </Box>
          </>
        )}
        {instructorClasses
          .filter(c => (showArchived && c.deleted) || (!showArchived && !c.deleted))
          .map(c => {
            const parentAdminClass = adminClasses.find(ac => (!ac.deleted && ac.id === c.parentClassId) || c.id === ac.id);
            const isNew =
              parentAdminClass &&
              parentAdminClass.updated &&
              (parentAdminClass.updated > c.updated || (c.parentClass && c.parentClass.updated && c.parentClass.updated < parentAdminClass.updated));

            return (
              <Grid key={[c.id, c.title].join('-')} item lg={3} sm={6} xs={12}>
                <Class
                  {...c}
                  ActionButton={
                    isNew && (
                      <DialogButton
                        Module={ClassImportReplaceDialog}
                        initialValues={{ classes: [{ ...parentAdminClass, imported: 1 }], archiveClasses: [{ ...c, imported: 1 }] }}
                        onClose={handleRefresh}
                        variant='link'
                        underline='always'
                        size='small'
                      >
                        Import New Updates
                      </DialogButton>
                    )
                  }
                  buttonLabel='View'
                  showUpdated={true}
                  onClick={changeRouteLayout('/ClassDashboard', {
                    class: c
                  })}
                  canArchive={true}
                  onRefresh={handleRefresh}
                />
              </Grid>
            );
          })}
      </Grid>
    </Page>
  );
}
