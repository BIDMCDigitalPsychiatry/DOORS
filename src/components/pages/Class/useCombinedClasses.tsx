import * as React from 'react';
import { tables } from '../../../database/dbConfig';
import useClasses from './useClasses';

const mergeClass = (instructorData, adminData) => {
  if (instructorData) {
    // TODO add merge logic, for now just return instructorData
    return instructorData;
  } else {
    return adminData;
  }
};

export default function useCombinedClasses({ requestParams = undefined } = {}) {
  const { data: adminData, handleRefresh: handleAdminRefresh, loading, success } = useClasses({ Model: tables.classesAdmin });
  const { data: instructorData, handleRefresh: handleInstructorRefresh, loading: loadingInstructor, success: successInstructor } = useClasses({
    Model: tables.classesInstructor
  });

  console.log({ adminData, instructorData });

  const handleRefresh = React.useCallback(() => {
    handleAdminRefresh();
    handleInstructorRefresh();
  }, [handleAdminRefresh, handleInstructorRefresh]);

  // For each admin class, if an instructor class with matching key exists, then merge in instructor data
  // Else include the admin class
  // If any instructor classes exist that don't have an admin key, include those also

  const data = adminData
    .map(d1 =>
      mergeClass(
        d1,
        instructorData.find(d2 => d2?.id === d1?.id)
      )
    )
    .concat(instructorData.filter(d3 => !adminData.find(d4 => d4?.id === d3?.id)));

  //console.log({ data, adminData, instructorData });

  return {
    data,
    handleRefresh,
    loading: loading || loadingInstructor,
    success: success && successInstructor
  };
}
