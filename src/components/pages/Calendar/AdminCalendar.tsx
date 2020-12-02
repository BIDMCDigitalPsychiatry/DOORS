import * as React from 'react';
import { tables } from '../../../database/dbConfig';
import useTableRow from '../../../database/useTableRow';
import CalendarView from '../../application/Calendar';
import Page from '../Page';
import useEvents from './useEvents';

export default function AdminCalendar() {
  const { data: events, handleRefresh } = useEvents();
  const { readSetRow } = useTableRow({ Model: tables.events });
  return (
    <Page title='Admin Calendar'>
      <CalendarView create={false} edit={true} events={events.filter(e => !e.deleted)} readSetRow={readSetRow} handleRefresh={handleRefresh} />
    </Page>
  );
}
