import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Check from './Check';
import { bool } from '../../../helpers';
import ParticipantDetailed from '../../pages/Class/ParticipantDetailed';

export default function StudentAttendance({ value = {}, onChange = undefined }) {
  const value_str = JSON.stringify(value);
  const handleCheck = React.useCallback(
    student => event => {
      const newStudents = JSON.parse(value_str);
      newStudents[student.id] = { ...student, present: !bool(student.present) };
      onChange && onChange({ target: { value: newStudents } });
    },
    [value_str, onChange]
  );

  const students = Object.keys(value).map(k => value[k]);
  return students.length === 0 ? (
    <>
      <Typography color='secondary'>There are no active students in group.</Typography>
    </>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='space-between' spacing={1}>
          <Grid item xs>
            <Typography>Student</Typography>
          </Grid>
          <Grid item style={{ width: 64 }}>
            <Typography>Present</Typography>
          </Grid>
        </Grid>
      </Grid>
      {students.map(student => (
        <Grid item key={student.id} xs={12}>
          <Grid container justify='space-between' spacing={1}>
            <Grid item xs>
              <ParticipantDetailed participant={{ student }} view={false} remove={false} viewReport={false} />
            </Grid>
            <Grid item style={{ width: 64 }}>
              <Check value={student.present} color='primary' onChange={handleCheck(student)} />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
