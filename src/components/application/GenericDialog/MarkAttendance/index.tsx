import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { useDialogState } from '../useDialogState';
import { getAttendanceKeys } from '../../../../database/models/Attendance';
import { useAttendanceRow } from '../../../../database/useAttendanceRow';
import StudentAttendance from '../../DialogField/StudentAttendance';
import deepmerge from 'deepmerge';

export const title = 'Mark Attendance';

export default function MarkAttendanceDialog({ onClose }) {
  const [{ initialValues, open }, setState] = useDialogState(title);
  // initialValues should contain
  // id: attendeance row id
  // students: object array of students participating in the class

  const { id } = initialValues;
  const { data: attendanceData, updateData, loading /* index, error, setData, handleChange, saveData, updateData*/ } = useAttendanceRow({ id, active: open });
  const data = deepmerge(initialValues, attendanceData); // Ensure any new students are merged with existing attendance data

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  console.log({ data, loading, initialValues, attendanceData });

  const handleSubmit = React.useCallback(values => updateData(values, handleClose), [updateData, handleClose]);

  return (
    <GenericDialog
      id={title}
      title={title}
      submitLabel='Save'
      onSubmit={handleSubmit}
      onClose={onClose}
      initialValues={data}
      fields={[
        {
          id,
          hidden: true
        },
        {
          label: `Today is ${getAttendanceKeys(id).date}`,
          Field: Label
        },
        {
          Field: MarginDivider
        },
        {
          id: 'students',
          label: 'Students',
          autoFocus: true,
          Field: StudentAttendance
        }
      ]}
    />
  );
}
