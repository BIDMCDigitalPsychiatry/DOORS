import * as React from 'react';
import { tables } from '../../../database/dbConfig';
import useTableRow from '../../../database/useTableRow';
import CalendarView from '../../application/Calendar';
import { useLayout } from '../../layout/hooks';
import Page from '../Page';
import { useEventsByUserId } from './useEvents';

export default function StudentCalendar() {
  const [{ student }] = useLayout();
  const { parentId } = student;
  const { data: events, handleRefresh } = useEventsByUserId({ userId: parentId });
  const { readSetRow } = useTableRow({ Model: tables.events });
  return (
    <Page title='Student Calendar'>
      <CalendarView create={false} edit={false} events={events.filter(e => !e.deleted)} readSetRow={readSetRow} handleRefresh={handleRefresh} />
    </Page>
  );
}
