import * as React from 'react';
import useTableRow from './useTableRow';
import { tables } from './dbConfig';
import { useLayout, useUserId } from '../components/layout/hooks';
import { isEmpty } from '../helpers';
import useInvite from './useInvite';

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

  const { id: rowId, email } = row ?? {};
  const loadOnMount = isEmpty(email) && !isEmpty(rowId) && loading === false; // Only get email from invite, if it is not in the profile
  const { invite } = useInvite({ userId: rowId, loadOnMount }); // Only load if the email is empty and the first query has completed

  const { email: inviteEmail } = invite ?? {};
  const mergedEmail = email ? email : inviteEmail;

  return { profile: { ...row, email: mergedEmail }, setProfile: setRow, state, setState, handleRefresh, loading, readSetRow };
}
