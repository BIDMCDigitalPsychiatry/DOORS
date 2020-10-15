import * as React from 'react';
import { TextField } from '@material-ui/core';
import { isEmpty, isError } from '../../../helpers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import * as Icons from '@material-ui/icons';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import useS3Bucket from '../../../database/useS3Bucket';
import { uuid } from '../../../helpers';
import { getObjectUrl } from '../../../aws-exports';

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

export const FileActions = ({ onSuccess = undefined, onError = undefined }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
          const id = `${file?.name ?? 'unknown'}_${uuid()}`;
          handleUpload({
            id,
            content: file,
            level: 'public', // public or private
            contentType: `${file?.type ?? 'text/plain'}`,
            onStart: () => {
              setState(prev => ({ ...prev, uploading: true }));
            },
            onSuccess: () => {
              console.log('success');
              setState(prev => ({ ...prev, uploading: false }));

              onSuccess && onSuccess(id);
              // TODO update class with link to newly uploaded file
            },
            onError: () => {
              console.log('error');
              setState(prev => ({ ...prev, uploading: false }));
              onError && onError('');
            }
          });
        }
      } else {
        // Error: No file specified or user hit cancel
      }
    },
    [handleClose, handleUpload, onSuccess, onError]
  );
  return (
    <div>
      <IconButton size='small' disabled={loading || uploading} aria-label='settings' onClick={handleClick}>
        <Icons.MoreVert />
      </IconButton>
      <Menu id='long-menu' anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <div>
          <input className={classes.hidden} name='fileselect' type='file' accept='*' id='fileselect' onChange={onInput} />
          <label htmlFor='fileselect'>
            <MenuItem key={'replace'} onClick={onInput} component='span'>
              Upload New File
            </MenuItem>
          </label>
        </div>
        {error && <Typography color='error'>{error}</Typography>}
      </Menu>
    </div>
  );
};

const FileUploadLink = ({
  value = '',
  margin = 'dense',
  variant = 'outlined',
  forceErrorMargin = false,
  error = undefined,
  initialValue = undefined,
  onChange = undefined,
  ...other
}) => {
  const onSuccess = React.useCallback(
    filename => {
      onChange && onChange({ target: { value: isEmpty(filename) ? '' : getObjectUrl(filename) } });
    },
    [onChange]
  );
  return (
    <TextField
      value={value}
      onChange={onChange}
      error={isError(error)}
      helperText={forceErrorMargin ? error || ' ' : error} // Forces a constant helper text margin
      margin={margin as any}
      variant={variant as any}
      fullWidth
      InputProps={{ endAdornment: <FileActions onSuccess={onSuccess} onError={onSuccess} /> }}
      InputLabelProps={{
        shrink: true
      }}
      {...other}
    />
  );
};

export default FileUploadLink;
