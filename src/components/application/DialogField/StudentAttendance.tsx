import * as React from 'react';
import { Grid } from '@material-ui/core';
import Check from './Check';
import { bool } from '../../../helpers';
import ParticipantDetailed from '../../pages/Class/ParticipantDetailed';

export default function StudentAttendance({
  value = {},
  margin = 'dense',
  variant = 'outlined',
  forceErrorMargin = false,
  error = undefined,
  initialValue = undefined,
  onChange = undefined,
  ...other
}) {
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='space-between' spacing={1}>
          <Grid item xs>
            Student
          </Grid>
          <Grid item style={{ width: 64 }}>
            Present
          </Grid>
        </Grid>
      </Grid>
      {students.map(student => (
        <Grid item xs={12}>
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
