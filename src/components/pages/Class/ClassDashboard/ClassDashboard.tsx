import * as React from 'react';
import { useIsAdminMode, useIsStudentMode } from '../../../../hooks';
import StudentClassDashboard from './StudentClassDashboard';
import AdminClassDashboard from './AdminClassDashboard';
import InstructorClassDashboard from './InstructorClassDashboard';

export default function ClassesDashboard() {
  const isAdminMode = useIsAdminMode();
  const isStudentMode = useIsStudentMode();
  return isStudentMode ? <StudentClassDashboard /> : isAdminMode ? <AdminClassDashboard /> : <InstructorClassDashboard />;
}
