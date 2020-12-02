import * as React from 'react';
import { tables } from '../../../database/dbConfig';
import useTableRow from '../../../database/useTableRow';
import CalendarView from '../../application/Calendar';
import { useUserId } from '../../layout/hooks';
import Page from '../Page';
import { useEventsByUserId } from './useEvents';

export default function InstructorCalendar() {
  const userId = useUserId();
  const { data: events, handleRefresh } = useEventsByUserId({ userId });
  const { readSetRow } = useTableRow({ Model: tables.events });
  return (
    <Page title='Instructor Calendar'>
      <CalendarView create={true} edit={true} events={events.filter(e => !e.deleted)} readSetRow={readSetRow} handleRefresh={handleRefresh} />
    </Page>
  );
}
