import * as React from 'react';
import { tables } from './dbConfig';
import useTable from './useTable';
import { isExpired } from './useInstructor';

export default function useGroupStudents({ groupId, active = true }) {
  const { state, handleRequest } = useTable({ TableName: tables.students });

  const handleRefresh = React.useCallback(() => {
    handleRequest({
      FilterExpression: '#groupId = :groupId',
      ExpressionAttributeNames: {
        '#groupId': 'groupId'
      },
      ExpressionAttributeValues: {
        ':groupId': groupId
      }
    });
    // eslint-disable-next-line
  }, [groupId, handleRequest]);

  React.useEffect(() => {
    active && handleRefresh();
  }, [active, handleRefresh]);

  const students = Object.keys(state?.data).map(k => ({ ...state?.data[k] }));
  const activeStudents = students.filter(s => s.accepted && s.deleted !== true);
  const pendingStudents = students.filter(s => !s.accepted && !isExpired(s) && s.deleted !== true);
  const expiredStudents = students.filter(s => !s.accepted && isExpired(s) && s.deleted !== true);
  const deletedStudents = students.filter(s => s.deleted);

  return { state, students, activeStudents, pendingStudents, expiredStudents, deletedStudents, handleRequest, handleRefresh };
}
