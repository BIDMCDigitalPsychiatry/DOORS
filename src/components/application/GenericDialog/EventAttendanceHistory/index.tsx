import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import DialogTableContent from '../DialogTableContent';
import EventAttendanceHistory from '../../GenericTable/EventAttendanceHistory/table';

export const title = 'Event Attendance History';

const Content = props => <DialogTableContent Table={EventAttendanceHistory} title={title} {...props} />;

export default function EventAttendanceHistoryDialog({ id = title, onClose }) {
  const [{ initialValues }, setState] = useDialogState(title);

  const { groupName, groupId } = initialValues;
  
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
      ContentProps={{ groupName, groupId }}
    />
  );
}
