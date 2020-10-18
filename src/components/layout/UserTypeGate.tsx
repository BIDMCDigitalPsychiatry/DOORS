import * as React from 'react';
import { useLayout, useUserId } from './hooks';
import SelectUserType from './SelectUserType';
import { useIsAdmin } from '../../hooks';
import useInstructorsByUserId from '../application/GenericTable/Instructors/useInstructorsByUserId';
import useStudentsByUserId from '../../database/useStudentsByUserId';
import { isEmpty } from '../../helpers';

export default function UserTypeGate({ children }) {
  const isAdmin = useIsAdmin();

  const [{ admin, instructor, student }, setLayout] = useLayout();

  const { instructors, handleRefresh } = useInstructorsByUserId();
  const { students, handleRefresh: handleRefreshStudents } = useStudentsByUserId();

  const userId = useUserId();

  // Refresh on load or whenever the userId or
  React.useEffect(() => {
    if (!isEmpty(userId)) {
      console.log(`Loading user information (${userId})`);
      handleRefresh();
      handleRefreshStudents();
    }
  }, [userId, handleRefresh, handleRefreshStudents]);

  React.useEffect(() => {
    // Auto select user type if user is only associated with one type
    if (instructors && students) {
      // If both instructors and students are loaded from the database, then proceed
      if (isAdmin && instructors.length === 0 && students.length === 0) {
        setLayout({ admin: true, students, instructors, back: undefined }); // Must be an admin user
      } else if (!isAdmin && instructors.length > 0 && students.length === 0) {
        setLayout({ instructor: instructors[0], students, instructors, back: undefined }); // Must be an instructor
      } else if (!isAdmin && instructors.length === 0 && students.length > 0) {
        setLayout({ student: students[0], students, instructors, back: undefined }); // Must be a student
      } else {
        setLayout({ students, instructors, back: undefined }); // Can be one of admin, instructor or studnet, not sure
      }
      console.log('User information loaded');
    }
    // eslint-disable-next-line
  }, [userId, isAdmin, JSON.stringify(instructors), JSON.stringify(students)]);

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
}
