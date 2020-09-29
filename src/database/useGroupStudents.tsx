import * as React from 'react';
import { tables } from './dbConfig';
import useTable from './useTable';
import { isExpired } from './useInstructor';

export default function useGroupStudents({ groupId }) {
  const { state, handleRequest } = useTable({ TableName: tables.students });

  const handleRefresh = React.useCallback(() => {
    handleRequest({
      FilterExpression: '#groupId = :groupId AND (#deleted = :deleted OR attribute_not_exists(#deleted))',
      ExpressionAttributeNames: {
        '#groupId': 'groupId',
        '#deleted': 'deleted'
      },
      ExpressionAttributeValues: {
        ':groupId': groupId,
        ':deleted': false
      }
    });
    // eslint-disable-next-line
  }, [groupId, handleRequest]);

  React.useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const students = Object.keys(state?.data).map(k => ({ ...state?.data[k] }));
  const activeStudents = students.filter(s => s.accepted);
  const pendingStudents = students.filter(s => !s.accepted && !isExpired(s));
  const expiredStudents = students.filter(s => !s.accepted && isExpired(s));

  return { state, students, activeStudents, pendingStudents, expiredStudents, handleRequest, handleRefresh };
}
