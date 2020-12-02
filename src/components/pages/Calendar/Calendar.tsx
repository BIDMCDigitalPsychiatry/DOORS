import * as React from 'react';
import { useIsAdminMode, useIsStudentMode } from '../../../hooks';
import AdminCalendar from './AdminCalendar';
import StudentCalendar from './StudentCalendar';
import InstructorCalendar from './InstructorCalendar';

export default function Calendar() {
  const isAdminMode = useIsAdminMode();
  const isStudentMode = useIsStudentMode();
  return isStudentMode ? <StudentCalendar /> : isAdminMode ? <AdminCalendar /> : <InstructorCalendar />;
}
