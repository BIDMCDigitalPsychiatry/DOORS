import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useS3Bucket from '../../../database/useS3Bucket';
import { getFileName, uuid } from '../../../helpers';
import DialogButton from '../GenericDialog/DialogButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hidden: {
      display: 'none'
    }
  })
);

const FileUploadButton = ({
  value = '',
  disabled = undefined,
  label = 'Upload',
  margin = 'dense',
  variant = 'outlined',
  forceErrorMargin = false,
  initialValue = undefined,
  onChange = undefined,
  ...other
}) => {
  const classes = useStyles({});

  const [{ loading, uploading, error }, setState] = React.useState({ loading: false, success: false, uploading: false, error: null });
  const { handleUpload } = useS3Bucket({ setState });

  const onSuccess = React.useCallback(
    filename => {
      onChange && onChange({ target: { value: filename } });
    },
    [onChange]
  );

  const onInput = React.useCallback(
    e => {
      const uploadFiles = e.target.files;
      const arrFiles = Array.from(uploadFiles ?? []);
      var file: any = arrFiles.length > 0 ? arrFiles[0] : undefined;
      if (file) {
        if ((file as any).size > 20 * 1024 * 1024) {
          alert('File exceeds 20 MB upload limit.');
        } else {
          const id = `${getFileName(file)}_${uuid()}`;
          handleUpload({
            id,
            content: file,
            level: 'public', // public or private
            contentType: `${file?.type ?? 'text/plain'}`,
            onStart: () => {
              setState(prev => ({ ...prev, uploading: true }));
            },
            onSuccess: () => {
              setState(prev => ({ ...prev, uploading: false }));
              onSuccess && onSuccess(id);
              // TODO update class with link to newly uploaded file
            },
            onError: () => {
              console.error('Error uploading file');
              setState(prev => ({ ...prev, uploading: false }));
              alert('Error uploading file');
              //onError && onError('');
            }
          });
        }
      } else {
        // Error: No file specified or user hit cancel
      }
    },
    [handleUpload, onSuccess]
  );

  return (
    <>
      <input className={classes.hidden} name='fileselect' type='file' accept='*' id='fileselect' onChange={onInput} />
      <label htmlFor='fileselect'>
        <DialogButton disabled={loading || uploading || disabled} variant='link' underline='always' onClick={onInput} {...other}>
          {label}
        </DialogButton>
      </label>
      {error && <Typography color='error'>{error}</Typography>}
    </>
  );
};

export default FileUploadButton;
