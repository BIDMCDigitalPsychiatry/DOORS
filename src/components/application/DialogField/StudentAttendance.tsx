import * as React from 'react';
import { Grid } from '@material-ui/core';
import Participant from '../../pages/Class/Participant';
import Check from './Check';
import { bool } from '../../../helpers';

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
      {Object.keys(value).map((k, i) => {
        const student = value[k];
        return (
          <Grid item xs={12}>
            <Grid container justify='space-between' spacing={1}>
              <Grid item xs>
                <Participant student={student} mount={false} view={false} remove={false} />
              </Grid>
              <Grid item style={{ width: 64 }}>
                <Check value={student.present} color='primary' onChange={handleCheck(student)} />
              </Grid>
            </Grid>
            {/*<TextField
            value={value}
            error={isError(error)}
            helperText={forceErrorMargin ? error || ' ' : error} // Forces a constant helper text margin
            margin={margin as any}
            variant={variant as any}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            {...other}
          />
        */}
          </Grid>
        );
      })}
    </Grid>
  );
}
