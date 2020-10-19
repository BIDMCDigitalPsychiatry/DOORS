import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Avatar, Typography } from '@material-ui/core';
import DialogButton from '../../application/GenericDialog/DialogButton';
import { getStudentName, isEmpty, minutesFrom, minutesToTimeAgo } from '../../../helpers';
import { useProfile } from '../../../database/useProfile';
import * as ViewReportDialog from '../../application/GenericDialog/ViewReport';
import * as ProfileDialog from '../../application/GenericDialog/Profile';
import { tables } from '../../../database/dbConfig';
import useTableRow from '../../../database/useTableRow';
import { useSnackBar } from '../../application/SnackBar/useSnackBar';
import { green, yellow } from '@material-ui/core/colors';
import ClassStatusChip, { getClassStatusLabel } from './ClassStatusChip';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    width: 148
  },
  completed: {
    margin: 2,
    color: palette.common.white,
    background: green[400]
  },
  inProgress: {
    margin: 2,
    color: palette.common.white,
    background: yellow[700]
  }
}));

export default function ParticipantDetailed({
  participant,
  className = undefined,
  view = true,
  viewReport = false,
  remove = true,
  mount = true,
  onRefresh = undefined,
  ...rest
}) {
  const classes = useStyles();
  const student = participant?.student;
  const { profile } = useProfile({ id: student?.userId });
  const [state, setState] = React.useState();
  const { readSetRow } = useTableRow({ Model: tables.students, id: student?.id, state, setState });
  const [, setSnackbar] = useSnackBar();

  const handleRemove = React.useCallback(
    deleted => () => {
      readSetRow({
        values: { deleted: !deleted },
        onSuccess: () => {
          onRefresh && onRefresh();
          setSnackbar({ open: true, variant: 'success', message: `Successfully ${deleted ? 'restored' : 'deleted'} participant` });
        }
      });
    },
    [readSetRow, setSnackbar, onRefresh]
  );

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container alignItems='center' justify='center' spacing={0}>
        <Grid item>
          <Avatar src='/broken-image.jpg' />
        </Grid>
        <Grid item xs={12}>
          <Typography noWrap align='center' variant='subtitle2'>
            {getStudentName({ student, profile })}
          </Typography>
        </Grid>
        {participant.completed.length > 0 && (
          <ClassStatusChip
            tooltip={getClassStatusLabel('Completed', participant.completed.length, false)}
            label={getClassStatusLabel('Completed', participant.completed.length)}
          />
        )}
        {participant.inProgress.length > 0 && (
          <ClassStatusChip
            inProgress={true}
            tooltip={getClassStatusLabel('In Progress', participant.inProgress.length, false)}
            label={getClassStatusLabel('In Progress', participant.inProgress.length)}
          />
        )}
        {view && !isEmpty(student?.userId) && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <DialogButton
              Module={ProfileDialog}
              mount={mount}
              initialValues={{ id: student?.userId }}
              variant='link'
              underline='always'
              linkVariant='body2'
              fullWidth
            >
              View Profile
            </DialogButton>
          </Grid>
        )}
        {viewReport && !isEmpty(student?.userId) && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <DialogButton
              Module={ViewReportDialog}
              mount={mount}
              initialValues={{ participant }}
              variant='link'
              underline='always'
              linkVariant='body2'
              fullWidth
            >
              View Report
            </DialogButton>
          </Grid>
        )}
        {student.accepted === true
          ? remove && (
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <DialogButton onClick={handleRemove(student?.deleted)} variant='link' underline='always' linkVariant='body2' fullWidth>
                  {student?.deleted ? 'Restore' : 'Remove'}
                </DialogButton>
              </Grid>
            )
          : view && <Typography variant='caption'>Sent {minutesToTimeAgo(minutesFrom(student?.created))}</Typography>}
      </Grid>
    </div>
  );
}
