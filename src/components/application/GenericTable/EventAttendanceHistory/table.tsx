import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import DialogButton from '../../GenericDialog/DialogButton';
import * as EditAttendanceDialog from '../../GenericDialog/EditAttendance';
import { Grid, Typography } from '@material-ui/core';
import { useTableFilter } from '../helpers';
import useGroupAttendance from '../../../../database/useGroupAttendance';
import { getDayTimeFromTimestamp, isEmpty } from '../../../../helpers';
import useGroupEvents from '../../../pages/Calendar/useGroupEvents';

const OpenAttendanceButton = props => {
  const { id, handleRefresh } = props;
  return (
    <DialogButton
      id={`edit-attendance-${id}`}
      onClose={handleRefresh}
      initialValues={props}
      Module={EditAttendanceDialog}
      variant='link'
      linkVariant='subtitle2'
      underline='always'
    >
      Edit
    </DialogButton>
  );
};

const EventGroupName = ({ groupName, eventTitle }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='subtitle1'>{eventTitle}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='subtitle2'>{groupName}</Typography>
      </Grid>
    </Grid>
  );
};

const getDateString = val => (isEmpty(val) ? '' : getDayTimeFromTimestamp(Date.parse(val)));

export default function EventAttendanceHistory({ name = 'Event Attendance History', groupName, groupId, ...other }) {
  const { data, loading, handleRefresh: handleRefreshGroupAttendance } = useGroupAttendance({ groupId });
  const { data: events, loading: loadingEvents, handleRefresh: handleRefreshEvents } = useGroupEvents({ groupId });
  var rows = data
    .filter(d => !isEmpty(d.eventId)) // Ensure only event attendance is used
    .map(r => {
      var event = events.find(e => e.id === r.eventId);
      return {
        ...r,
        groupName,
        start: getDateString(event?.start),
        end: getDateString(event?.end),
        eventTitle: event?.title
      };
    });

  const handleRefresh = React.useCallback(() => {
    handleRefreshGroupAttendance();
    handleRefreshEvents();
  }, [handleRefreshGroupAttendance, handleRefreshEvents]);

  return (
    <GenericTableContainer
      name={name}
      data={useTableFilter(rows, name).map(r => ({ ...r, handleRefresh, getValues: () => r }))}
      loading={loading || loadingEvents}
      title={name}
      columns={[
        { name: 'groupId', header: 'Event and Group Name', Cell: EventGroupName },
        { name: 'start', header: 'Start' },
        { name: 'end', header: 'End' },
        {
          name: 'Attendance',
          header: 'Attendence',
          width: 200,
          Cell: ({ students }) => {
            const length = Object.keys(students ?? {}).length;
            const present = Object.keys(students ?? {}).filter(k => students[k].present === true).length;
            return `${present} of ${length} Student${length === 1 ? '' : 's'} Present`;
          }
        },
        {
          name: 'Edit',
          header: 'Edit',
          width: 95,
          Cell: OpenAttendanceButton
        }
      ]}
      toolbar={true}
      footer={true}
      search={true}
      stacked={true}
      checkbox={false}
      select={false}
      {...other}
    />
  );
}
