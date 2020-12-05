import * as React from 'react';
import useTableRow from './useTableRow';
import { tables } from './dbConfig';
import { useLayout, useUserId } from '../components/layout/hooks';

export function useProfile({ id: Id = undefined, state: State = undefined, setState: SetState = undefined, active = true, shouldSetLayout = false } = {}) {
  const userId = useUserId();
  const id = Id ? Id : userId;
  const [internalState, setInternalState] = React.useState();
  const state = State ? State : internalState;
  const setState = SetState ? SetState : setInternalState;
  const [, setLayout] = useLayout();

  const handleSuccess = React.useCallback(
    response => {
      shouldSetLayout && setLayout({ profile: response?.Item });
    },
    [shouldSetLayout, setLayout]
  );

  const { row, setRow, handleRefresh, loading, readSetRow } = useTableRow({ Model: tables.profiles, id, state, setState, active, onSuccess: handleSuccess });
  return { profile: row, setProfile: setRow, state, setState, handleRefresh, loading, readSetRow };
}
