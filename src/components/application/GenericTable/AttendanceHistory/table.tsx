import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import DialogButton from '../../GenericDialog/DialogButton';
import * as EditAttendanceDialog from '../../GenericDialog/EditAttendance';
import useClassGroupAttendance from '../../../../database/useClassGroupAttendance';

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
      Edit Attendance
    </DialogButton>
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
        { name: 'id', header: 'id' },
        { name: 'dateString', header: 'Date' },
        {
          name: 'Attendance',
          header: 'Attendence',
          Cell: ({ students }) => {
            const length = Object.keys(students ?? {}).length;
            const present = Object.keys(students ?? {}).filter(k => students[k].present === true).length;
            return `${present} of ${length} Student${length === 1 ? '' : 's'} Present`;
          }
        },
        {
          name: 'Edit Attendance',
          header: 'Edit Attendance',
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
