import * as React from 'react';
import { useTableFilter } from '../helpers';
import useProcessData from '../../../../database/useProcessData';

export const useDeleteInstructors = ({ instructors, onSuccess: OnSuccess = undefined }) => {
  const processData = useProcessData();

  return React.useCallback(
    event => {
      event.stopPropagation();
      processData({
        Action: 'd',
        Data: {
          Instructors: instructors
        },
        onSuccess: r => OnSuccess && OnSuccess(r)
      });
    },
    [instructors, OnSuccess, processData]
  );
};

export const useInstructors = (table, tab) => {
  const instructors = [
    { id: '1', Name: 'Test Instructor 1', Title: 'Test Title 1', Institution: 'Test Institution 1' },
    { id: '2', Name: 'Test Instructor 2', Title: 'Test Title 2', Institution: 'Test Institution 2' },
    { id: '3', Name: 'Test Instructor 3', Title: 'Test Title 3', Institution: 'Test Institution 3' }
  ];

  return useTableFilter(
    instructors.map(i => ({
      ...i,
      getValues: () => i
    })),
    table
  );
};
