import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import DialogTableContent from '../DialogTableContent';
import AttendanceHistory from '../../GenericTable/AttendanceHistory/table';

export const title = 'Attendance History';

const Content = props => <DialogTableContent Table={AttendanceHistory} title={title} {...props} />;

export default function AttendanceHistoryDialog({ id = title, onClose }) {
  const [{ initialValues }, setState] = useDialogState(title);

  const { classId, groupId } = initialValues;

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  return (
    <GenericDialog
      id={id}
      maxWidth='md'
      title={null}
      submitLabel={null}
      cancelLabel='Done'
      onClose={handleClose}
      Content={Content}
      ContentProps={{ groupId, classId }}
    />
  );
}
