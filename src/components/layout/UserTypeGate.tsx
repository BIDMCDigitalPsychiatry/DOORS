import * as React from 'react';
import { useLayout } from './hooks';
import SelectUserType from './SelectUserType';
import { useIsAdmin } from '../../hooks';
import { useUserIdInstructors } from '../application/GenericTable/Instructors/useUserIdInstructors';

export const UserTypeGate = ({ children }) => {
  const isAdmin = useIsAdmin();
  const [{ admin, instructor, student }, setLayout] = useLayout();

  const instructors = useUserIdInstructors();
  const students = []; // TODO: Connect students to backend

  React.useEffect(() => {
    // Auto select user type if user is only associated with one type
    if (instructors) {
      if (isAdmin && instructors.length === 0 && students.length === 0) {
        setLayout({ admin: true, canChangeUserType: false });
      } else if (!isAdmin && instructors.length > 0 && students.length === 0) {
        setLayout({ instructor: instructors[0], canChangeUserType: false });
      } else if (!isAdmin && instructors.length === 0 && students.length > 0) {
        setLayout({ student: students[0], canChangeUserType: false });
      }
    }
    // eslint-disable-next-line
  }, [isAdmin, JSON.stringify(instructors)]);

  // If viewing is not empty, then return children
  // Else if completed == false, then show loading
  // Else if completed and only one user type exists, set viewing automatically
  // Else show the select user type

  return admin || instructor || student ? (
    children
  ) : !instructors ? (
    <div>Loading</div>
  ) : (
    <SelectUserType instructors={instructors} students={students} isAdmin={isAdmin} />
  );
};
