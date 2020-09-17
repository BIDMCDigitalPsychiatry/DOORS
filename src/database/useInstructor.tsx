import * as React from 'react';
import { tables } from './dbConfig';
import { isEmpty, minutesFrom } from '../helpers';
import useProcessData from './useProcessData';
import { inviteExpiration } from '../../package.json';

export const useInstructor = ({ id, state, setState }) => {
  const processData = useProcessData();
  const instructor = state.response?.Item;
  const instructor_str = JSON.stringify(instructor);
  React.useEffect(() => {
    if (!isEmpty(id)) {
      setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
      processData({
        Model: tables.instructors,
        Action: 'r',
        Data: { id },
        onError: response => setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response })),
        onSuccess: response => setState(prev => ({ ...prev, loading: false, error: undefined, response }))
      });
    }
  }, [id, processData, setState]);

  const setInstructor = React.useCallback(
    (newValues, OnSuccess = undefined, OnError = undefined) => {
      if (!isEmpty(id)) {
        setState(prev => ({ ...prev, loading: true, error: undefined, response: undefined }));
        processData({
          Model: tables.instructors,
          Action: 'u',
          Data: { ...JSON.parse(instructor_str), id, ...newValues },
          onError: response => {
            setState(prev => ({ ...prev, loading: false, error: 'Error reading values', response }));
            OnError && OnError(response);
          },
          onSuccess: response => {
            setState(prev => ({ ...prev, loading: false, error: undefined, response }));
            OnSuccess && OnSuccess(response);
          }
        });
      }
    },
    [id, setState, processData, instructor_str]
  );

  const expired = minutesFrom(instructor?.created) > inviteExpiration;

  return [instructor, setInstructor, expired];
};
