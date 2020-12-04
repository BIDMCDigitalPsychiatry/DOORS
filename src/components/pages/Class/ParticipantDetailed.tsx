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
import { getObjectUrl } from '../../../aws-exports';
import * as ChangeGroupDialog from '../../application/GenericDialog/ChangeGroup';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    display: 'flex',
    width: 164
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
  },
  avatar: {
    height: 82,
    width: 82
  }
}));

export default function ParticipantDetailed({
  participant,
  className = undefined,
  view = true,
  viewReport = false,
  remove = true,
  move = false,
  onRefresh = undefined,
  onRefreshGroups = undefined,
  ...rest
}) {
  const classes = useStyles();
  const student = participant?.student;
  const active = !isEmpty(student?.userId);
  const { profile } = useProfile({ id: student?.userId, active }); // only pull profile if student has a userId
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
          <Avatar className={classes.avatar} src={getObjectUrl(profile?.picture)} />
        </Grid>
        <Grid item xs={12}>
          <Typography noWrap align='center' variant='subtitle2'>
            {getStudentName({ student, profile })}
          </Typography>
        </Grid>
        {participant.completed?.length > 0 && (
          <ClassStatusChip
            tooltip={getClassStatusLabel('Completed', participant.completed.length, false)}
            label={getClassStatusLabel('Completed', participant.completed.length)}
          />
        )}
        {participant.inProgress?.length > 0 && (
          <ClassStatusChip
            inProgress={true}
            tooltip={getClassStatusLabel('In Progress', participant.inProgress.length, false)}
            label={getClassStatusLabel('In Progress', participant.inProgress.length)}
          />
        )}
        {view && !isEmpty(student?.userId) && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <DialogButton
              id={`view-profile-${student?.id}`}
              Module={ProfileDialog}
              mount={true}
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
              id={`view-report-${student?.id}`}
              Module={ViewReportDialog}
              mount={true}
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
        {move && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <DialogButton
              id={['change-group', student?.id].join('-')}
              onClose={onRefreshGroups}
              Module={ChangeGroupDialog}
              initialValues={{ id: student?.id }}
              variant='link'
              underline='always'
              linkVariant='body2'
              fullWidth
            >
              Change Group
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
