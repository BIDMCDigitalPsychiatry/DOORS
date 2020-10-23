import * as React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import * as ClassPresentationDialog from '../application/GenericDialog/ClassPresentation';
import DialogButton from '../application/GenericDialog/DialogButton';
import { bool } from '../../helpers';
import { useDialogState } from '../application/GenericDialog/useDialogState';
import { BlockListItem } from './BlockList';
import ActionCardClassResource from './ActionCardClassResource';

export interface BlockListClassResourceItem extends BlockListItem {
  type: string;
  link: string;
}

export function BlockListClassPresentation({
  title = undefined,
  subtitle = undefined,
  value = [],
  add = undefined,
  edit = undefined,
  remove = undefined,
  DialogModule = ClassPresentationDialog,
  onChange = undefined,
  isOwner,
  enableLock = true
}) {
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
  const onRemove = React.useCallback(
    item => {
      var result = window.confirm('Are you sure you wish to remove this item?');
      if (result) {
        handleReplace(item?.id);
      }
    },
    [handleReplace]
  );
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
            <Grid key={i} item>
              <ActionCardClassResource
                item={item}
                onLock={onLock}
                viewLabel='View Presentation'
                onRemove={remove && onRemove}
                onEdit={edit && onEdit}
                minHeight={112}
                titleProps={{ noWrap: false, variant: 'h6', color: 'textPrimary' }}
                isOwner={isOwner}
                enableLock={enableLock}
              />
            </Grid>
          ))}

          <Grid style={{ display: add ? 'flex' : 'none' }} key={'add'} item lg={4} sm={6} xs={12}>
            <DialogButton Module={{ ...DialogModule, id: title, title }} variant='styled' styledVariant='secondary' onSubmit={handleSubmit}>
              Add New
            </DialogButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
