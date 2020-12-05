import * as React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import useInstructorGroups from '../../database/useInstructorGroups';
import DialogButton from '../application/GenericDialog/DialogButton';
import * as PreRecDialog from '../application/GenericDialog/PreRec';
import useInstructorClasses from '../pages/Class/useInstructorClasses';

export interface PreRec {
  id: string;
  groupId: string; // associated group if linked to a group
  classId: string; // associated class that must be completed
}

export function PreRecs({ value = {}, label = 'Pre-Requisites', disabled, onChange }) {
  const { data: groups = [] } = useInstructorGroups();
  const { data: instructorClasses } = useInstructorClasses();

  var options = [{ value: 'All Groups', label: 'All Groups' }].concat((groups as any).map(g => ({ value: g.id, label: g.name })));
  var classOptions = instructorClasses.map(ic => ({ value: ic.id, label: `${ic.headline}: ${ic.name}` }));

  const value_str = JSON.stringify(value);
  const handleSubmit = React.useCallback(
    ({ id, groupId, classId }) => {
      const value = JSON.parse(value_str);
      value[id] = { id, groupId, classId };
      onChange && onChange({ target: { value } });
    },
    [onChange, value_str]
  );
  const handleDelete = React.useCallback(
    (values, setState) => {
      const { id } = values;
      const value = JSON.parse(value_str);
      if (value[id]) {
        delete value[id];
      }
      onChange && onChange({ target: { value } });
      setState(prev => ({ ...prev, open: false, loading: false }));
    },
    [onChange, value_str]
  );

  return (
    <>
      <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
        {label}
      </Typography>

      <Box mt={1}>
        <Grid container spacing={2}>
          {Object.keys(value).map(k => {
            const { id, groupId, classId } = value[k];
            const g = groups.find(g => g.id === groupId);
            const c = instructorClasses.find(ic => ic.id === classId);
            const groupName = g?.name ?? groupId;
            const className = `${c?.headline}: ${c?.name}`;
            return (
              <Grid item>
                <DialogButton
                  Module={PreRecDialog}
                  mount={false}
                  type='Edit'
                  initialValues={{
                    id,
                    groupId,
                    classId,
                    options,
                    classOptions
                  }}
                  onDelete={handleDelete}
                  fullWidth={true}
                  variant='styled'
                  styledVariant='secondary'
                  onSubmit={handleSubmit}
                >
                  {`${groupName} must complete ${className}`}
                </DialogButton>
              </Grid>
            );
          })}
          <Grid item>
            <DialogButton
              Module={PreRecDialog}
              initialValues={{
                options,
                classOptions
              }}
              type='Add'
              variant='styled'
              styledVariant='secondary'
              onSubmit={handleSubmit}
              onDelete={handleDelete} // Has to be here as the edit form isn't mounted, call this conditionall based on type == 'Edit'
            >
              Add New
            </DialogButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
