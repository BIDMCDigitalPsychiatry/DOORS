import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import * as Icons from '@material-ui/icons';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import useS3Bucket from '../../../database/useS3Bucket';
import { uuid } from '../../../helpers';
import { useSnackBar } from '../../application/SnackBar/useSnackBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345
    },
    avatar: {
      backgroundColor: blue[500]
    },
    hidden: {
      display: 'none'
    }
  })
);

export const FileActions = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [, setSnackbar] = useSnackBar();

  const [{ loading, uploading, error }, setState] = React.useState({ loading: false, success: false, uploading: false, error: null });

  const { handleUpload } = useS3Bucket({ setState });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const onInput = React.useCallback(
    e => {
      handleClose();
      const uploadFiles = e.target.files;
      const arrFiles = Array.from(uploadFiles ?? []);
      var file: any = arrFiles.length > 0 ? arrFiles[0] : undefined;
      if (file) {
        if ((file as any).size > 20 * 1024 * 1024) {
          alert('File exceeds 20 MB upload limit.');
        } else {
          handleUpload({
            id: `${file?.name ?? 'unknown'}_${uuid()}`,
            content: file,
            level: 'public', // public or private
            contentType: `${file?.type ?? 'text/plain'}`,
            onStart: () => {
              setState(prev => ({ ...prev, uploading: true }));
            },
            onSuccess: () => {
              setState(prev => ({ ...prev, uploading: false }));
              setSnackbar({ open: true, variant: 'success', message: 'Successfully uploaded file' });
              // TODO update session with link to newly uploaded file
            },
            onError: () => {
              setState(prev => ({ ...prev, uploading: false }));
              setSnackbar({ open: true, variant: 'success', message: 'Error uploading file' });
            }
          });
        }
      } else {
        // Error: No file specified or user hit cancel
      }
    },
    [handleClose, handleUpload, setSnackbar]
  );
  return (
    <div>
      <IconButton disabled={loading || uploading} aria-label='settings' onClick={handleClick}>
        <Icons.MoreVert />
      </IconButton>
      <Menu id='long-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <div>
          <input className={classes.hidden} name='fileselect' type='file' accept='*' id='fileselect' onChange={onInput} />
          <label htmlFor='fileselect'>
            <MenuItem key={'replace'} onClick={onInput} component='span'>
              Replace file
            </MenuItem>
          </label>
        </div>
        <MenuItem key={'re-assign'} onClick={handleClose}>
          Re-assign default class presentation
        </MenuItem>
        {error && <Typography color='error'>{error}</Typography>}
      </Menu>
    </div>
  );
};

export default function SessionPresentationFile({ name = 'Unknown File Name', date = 'Unknown Date' }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='file' className={classes.avatar}>
            <Icons.FileCopy />
          </Avatar>
        }
        action={<FileActions />}
        title={name}
        subheader={`Uploaded on ${date}`}
      />
    </Card>
  );
}
