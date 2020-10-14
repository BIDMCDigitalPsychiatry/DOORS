import * as React from 'react';
import { useHandleChangeRoute, useLayoutKey } from '../components/layout/hooks';
import { tables } from './dbConfig';
import useData from './useData';

export const useSessionData = () => {
  const initialState = useLayoutKey('session');

  const { data, updateData, ...other } = useData({ id: initialState.id, Model: tables.sessions, initialState });

  const handleChangeRoute = useHandleChangeRoute();

  const handleSaveSession = React.useCallback(
    nextRoute => () => {
      updateData({ currentRoute: nextRoute }, handleChangeRoute(nextRoute));
    },
    [updateData, handleChangeRoute]
  );

  const handleSaveCompleteSession = React.useCallback(
    nextRoute => () => {
      updateData({ completed: true, currentRoute: nextRoute }, handleChangeRoute(nextRoute));
    },
    [updateData, handleChangeRoute]
  );

  return { session: data, handleSaveSession, handleSaveCompleteSession, updateData, ...other };
};
