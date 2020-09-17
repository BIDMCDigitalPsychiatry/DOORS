import * as React from 'react';
import { isEmpty } from '../../helpers';
import { getUrlParamater } from '../../hooks';
import AcceptInvite from './AcceptInvite';

export default function InviteGate({ children }) {
  const [id, setId] = React.useState(getUrlParamater('i'));

  const handleBack = React.useCallback(() => {
    setId(getUrlParamater('i'));
  }, [setId]);

  return !isEmpty(id) ? <AcceptInvite id={id} onBack={handleBack} /> : children;
}
