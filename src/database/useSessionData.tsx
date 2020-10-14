import * as React from 'react';
import { useHandleChangeRouteLayout, useLayoutKey } from '../components/layout/hooks';
import { tables } from './dbConfig';
import useData from './useData';

export const useSessionData = () => {
  const session = useLayoutKey('session');

  // Set active to false to use the session in the layout and prevent reading from the server everytime.
  // There is currently no need to read the session everytime for a single student
  const { data, updateData, setData, ...other } = useData({ active: false, id: session.id, Model: tables.sessions, initialState: { data: session } });

  const handleChangeRouteLayout = useHandleChangeRouteLayout();

  const session_str = JSON.stringify(data);

  const handleSaveSession = React.useCallback(
    nextRoute => () => {
      updateData({ currentRoute: nextRoute }, handleChangeRouteLayout(nextRoute, { session: JSON.parse(session_str) }));
    },
    [updateData, handleChangeRouteLayout, session_str]
  );

  const handleSaveCompleteSession = React.useCallback(
    nextRoute => () => {
      updateData({ completed: true, currentRoute: nextRoute }, handleChangeRouteLayout(nextRoute, { session: JSON.parse(session_str) }));
    },
    [updateData, handleChangeRouteLayout, session_str]
  );

  return { session: data, handleSaveSession, handleSaveCompleteSession, updateData, setData, ...other };
};
