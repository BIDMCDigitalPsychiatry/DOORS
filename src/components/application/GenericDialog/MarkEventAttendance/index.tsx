import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import { useAttendanceRow } from '../../../../database/useAttendanceRow';
import StudentAttendance from '../../DialogField/StudentAttendance';
import deepmerge from 'deepmerge';
import { uuid } from '../../../../helpers';
import useEventGroupAttendance from '../../../../database/useEventGroupAttendance';
import useGroupStudents from '../../../../database/useGroupStudents';

export const title = 'Mark Event Attendance';

export default function MarkEventAttendanceDialog({ id: Id = title, onClose }) {
  const [{ initialValues = {}, open }, setState] = useDialogState(Id);
  const { eventId, groupId } = initialValues;

  // Pull the student information
  const { state, activeStudents } = useGroupStudents({ groupId, active: open });
  initialValues.students = activeStudents.reduce((f, c) => {
    f[c.id] = c;
    return f;
  }, {});

  const { data: rows, loading, success, handleRefresh } = useEventGroupAttendance({ eventId, groupId });

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
      loading={loading || state?.loading}
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
          id: 'eventId',
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
          id: 'students',
          label: 'Students',
          autoFocus: true,
          Field: StudentAttendance
        }
      ]}
    />
  );
}
