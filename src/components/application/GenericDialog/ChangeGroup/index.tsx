import React from 'react';
import GenericDialog from '../GenericDialog';
import Label from '../../DialogField/Label';
import { useDialogState } from '../useDialogState';
import useTableRow from '../../../../database/useTableRow';
import { tables } from '../../../../database/dbConfig';
import { useLayout } from '../../../layout/hooks';
import { useGroups } from '../../../../database/useGroups';
import Select from '../../DialogField/Select';

export const title = 'Change Group';

export default function ChangeGroupDialog({ id: Id = title, onClose }) {
  const [state, setState] = useDialogState(Id);
  const { initialValues, open } = state;
  const { id } = initialValues; // Get Student Id
  const [{ instructor }] = useLayout();

  const { data: groups, handleRefresh } = useGroups({
    active: false,
    requestParams: instructor && {
      FilterExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': instructor?.userId
      }
    }
  });

  React.useEffect(() => {
    open && handleRefresh();
  }, [open, handleRefresh]);

  const { row: student, setRow } = useTableRow({ Model: tables.students, id, state, setState });

  const handleClose = React.useCallback(() => {
    setState(prev => ({ ...prev, open: false, loading: false }));
    onClose && onClose();
  }, [onClose, setState]);

  const handleSubmit = React.useCallback(
    values => {
      setRow({ values, onSuccess: handleClose });
    },
    [setRow, handleClose]
  );

  const items = groups.map(g => ({
    label: g.name,
    value: g.id
  }));

  return (
    <GenericDialog
      id={Id}
      title={title}
      submitLabel='Save'
      onSubmit={handleSubmit}
      onClose={onClose}
      initialValues={student}
      fields={[
        {
          label: `Please select desired group:`,
          Field: Label
        },
        {
          id: 'groupId',
          label: 'Group',
          Field: Select,
          fullWidth: true,
          items
        }
      ]}
    />
  );
}
