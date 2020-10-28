import * as React from 'react';
import useTableRow from './useTableRow';
import { tables } from './dbConfig';

export function useProfile({ id, state: State = undefined, setState: SetState = undefined }) {
  const [internalState, setInternalState] = React.useState();
  const state = State ? State : internalState;
  const setState = SetState ? SetState : setInternalState;

  const { row, setRow, handleRefresh, loading, readSetRow } = useTableRow({ Model: tables.profiles, id, state, setState });
  return { profile: row, setProfile: setRow, state, setState, handleRefresh, loading, readSetRow };
}
