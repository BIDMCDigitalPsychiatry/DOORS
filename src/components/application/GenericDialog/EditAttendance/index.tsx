import React from 'react';
import GenericDialog from '../GenericDialog';
import MarginDivider from '../../DialogField/MarginDivider';
import { useDialogState } from '../useDialogState';
import { useAttendanceRow } from '../../../../database/useAttendanceRow';
import StudentAttendance from '../../DialogField/StudentAttendance';
import AttendanceFor from '../../DialogField/AttendanceFor';

export const title = 'Edit Attendance';

export default function EditAttendanceDialog({ id: dialogId = title, onClose }) {
  const [{ initialValues, open }, setState] = useDialogState(dialogId);

  const { id } = initialValues;

  const { data, updateData } = useAttendanceRow({ id, active: open }); // Get hook for updating db row

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  const handleSubmit = React.useCallback(
    values => {
      updateData(values, handleClose);
    },
    [updateData, handleClose]
  );

  return (
    <GenericDialog
      id={dialogId}
      title={title}
      submitLabel='Save'
      onSubmit={handleSubmit}
      onClose={onClose}
      initialValues={data}
      fields={[
        {
          id: 'id',
          hidden: true
        },
        {
          id: 'classId',
          hidden: true
        },
        {
          id: 'groupId',
          hidden: true
        },
        {
          id: 'date',
          hidden: true
        },
        {
          id: 'dateString',
          Field: AttendanceFor
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
