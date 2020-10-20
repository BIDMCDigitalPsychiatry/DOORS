import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import DialogButton from '../../GenericDialog/DialogButton';
import * as EditAttendanceDialog from '../../GenericDialog/EditAttendance';
import useClassGroupAttendance from '../../../../database/useClassGroupAttendance';
import useTableRow from '../../../../database/useTableRow';
import { tables } from '../../../../database/dbConfig';
import { Grid, Typography } from '@material-ui/core';

const OpenAttendanceButton = props => {
  const { id, handleRefresh } = props;
  return (
    <DialogButton
      id={`edit-attendance-${id}`}
      onClose={handleRefresh}
      initialValues={props}
      Module={EditAttendanceDialog}
      variant='link'
      linkVariant='subtitle2'
      underline='always'
    >
      Edit
    </DialogButton>
  );
};

const ClassGroupName = ({ groupId, classId }) => {
  const { row: g } = useTableRow({ id: groupId, Model: tables.groups });
  const { row: c } = useTableRow({ id: classId, Model: tables.classes });
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>{c?.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>{g?.name}</Typography>
      </Grid>
    </Grid>
  );
};

export default function AttendanceHistory({ name = 'Attendance History', groupId, classId, ...other }) {
  const { data, loading, handleRefresh } = useClassGroupAttendance({ classId, groupId });

  return (
    <GenericTableContainer
      name={name}
      loading={loading}
      title={`${name}`}
      columns={[
        { name: 'groupId', header: 'Class and Group Name', Cell: ClassGroupName },
        { name: 'dateString', header: 'Date', width: 128 },
        {
          name: 'Attendance',
          header: 'Attendence',
          width: 200,
          Cell: ({ students }) => {
            const length = Object.keys(students ?? {}).length;
            const present = Object.keys(students ?? {}).filter(k => students[k].present === true).length;
            return `${present} of ${length} Student${length === 1 ? '' : 's'} Present`;
          }
        },
        {
          name: 'Edit',
          header: 'Edit',
          width: 95,
          Cell: OpenAttendanceButton
        }
      ]}
      toolbar={true}
      footer={true}
      search={true}
      stacked={true}
      data={data.map(r => ({ ...r, handleRefresh, getValues: () => r }))}
      checkbox={false}
      select={false}
      {...other}
    />
  );
}
