import * as React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import ActionCard from '../general/ActionCard';
import * as BlockListDialog from '../application/GenericDialog/BlockList';
import DialogButton from '../application/GenericDialog/DialogButton';
import { bool } from '../../helpers';
import { useDialogState } from '../application/GenericDialog/useDialogState';

export interface BlockListItem {
  id: string;
  name: string;
  canEdit?: boolean;
  canLocklock?: boolean;
  canDelete?: boolean;
  locked?: boolean;
  deleted?: boolean;
}

export function BlockList({ title = undefined, subtitle = undefined, value = [], add = undefined, onChange }) {
  const value_str = JSON.stringify(value);

  // Replace or remove (set item to undefined when removing)
  const handleReplace = React.useCallback(
    (id: string, item: BlockListItem = undefined) => {
      var value = JSON.parse(value_str);
      if (item === undefined) {
        value = value.filter(i => i.id !== id); // Remove item without replacement
      } else {
        const index = value.findIndex(i => i?.id === id);
        if (index >= 0) {
          value[index] = item; // Found item in array, update with new value
        } else {
          value.push(item); // Item does not exist, so add it to the end
        }
      }
      onChange && onChange({ target: { value } });
    },
    [onChange, value_str]
  );
  const [, setDialogState] = useDialogState(title);

  const handleSubmit = React.useCallback(
    ({ values: item, type }) => {
      type === 'Add' && onChange({ target: { value: [...JSON.parse(value_str), item] } });
      type === 'Edit' && handleReplace(item?.id, item);
    },
    [onChange, handleReplace, value_str]
  );
  const onLock = React.useCallback(item => handleReplace(item?.id, { ...item, locked: !bool(item?.locked) }), [handleReplace]);
  const onRemove = React.useCallback(item => handleReplace(item?.id), [handleReplace]);
  const onEdit = React.useCallback(
    item => {
      setDialogState({
        type: 'Edit',
        open: true,
        initialValues: item
      });
    },
    [setDialogState]
  );

  return (
    <>
      {title && (
        <Typography variant='h5' color='textPrimary' style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant='subtitle1' color='textPrimary'>
          {subtitle}
        </Typography>
      )}
      <Box mt={1}>
        <Grid container spacing={2}>
          {value.map((item, i) => (
            <Grid key={i} item lg={4} sm={6} xs={12}>
              <ActionCard
                item={item}
                onLock={onLock}
                onRemove={onRemove}
                onEdit={onEdit}
                minHeight={112}
                titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }}
              />
            </Grid>
          ))}
          {add && (
            <Grid key={'add'} item lg={4} sm={6} xs={12}>
              <DialogButton Module={{ ...BlockListDialog, id: title, title }} variant='styled' styledVariant='secondary' onSubmit={handleSubmit}>
                Add New
              </DialogButton>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
