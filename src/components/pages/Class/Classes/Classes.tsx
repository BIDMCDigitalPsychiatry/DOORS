import * as React from 'react';
import { useIsAdminMode, useIsStudentMode } from '../../../../hooks';
import StudentClasses from './StudentClasses';
import AdminClasses from './AdminClasses';
import InstructorClasses from './InstructorClasses';

export default function Classes() {
  const isAdminMode = useIsAdminMode();
  const isStudentMode = useIsStudentMode();
  return isStudentMode ? <StudentClasses /> : isAdminMode ? <AdminClasses /> : <InstructorClasses />;
}
