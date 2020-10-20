import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import MarginDivider from '../../DialogField/MarginDivider';
import { useDialogState } from '../useDialogState';
import { useAttendanceRow } from '../../../../database/useAttendanceRow';
import StudentAttendance from '../../DialogField/StudentAttendance';
import deepmerge from 'deepmerge';
import { getDayMonthYear, uuid } from '../../../../helpers';
import useClassGroupAttendance from '../../../../database/useClassGroupAttendance';

export const title = 'Mark Attendance';

export default function MarkAttendanceDialog({ id: Id = title, onClose }) {
  const [{ initialValues, open }, setState] = useDialogState(Id);

  const { classId, groupId, date } = initialValues;

  const { data: rows, loading, success, handleRefresh } = useClassGroupAttendance({ classId, groupId, date });

  React.useEffect(() => {
    open && handleRefresh();
  }, [open, handleRefresh]);

  const row = rows ? rows[0] : undefined;
  const rowStr = row && JSON.stringify(row);

  const [id, setId] = React.useState();

  // Sets the id to match an existing database row if it exists, otherwise set a new id
  React.useEffect(() => {
    const row = rowStr && JSON.parse(rowStr);
    if (open && loading === false && success === true) {
      if (row) {
        setId(row?.id);
      } else {
        setId(uuid());
      }
    }
  }, [open, loading, success, rowStr]);

  const { updateData } = useAttendanceRow({ id, active: false }); // Get hook for updating db row

  const merged = deepmerge(initialValues ?? {}, row ?? {});
  const iv = { id, ...(merged as any) };

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
      id={Id}
      title={title}
      submitLabel='Save'
      onSubmit={handleSubmit}
      onClose={onClose}
      initialValues={iv}
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
          hidden: true
        },
        {
          label: `Today is ${getDayMonthYear()}`,
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
