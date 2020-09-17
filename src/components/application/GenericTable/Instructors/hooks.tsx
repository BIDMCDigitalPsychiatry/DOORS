import * as React from 'react';
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
