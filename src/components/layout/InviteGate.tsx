import * as React from 'react';
import { isEmpty } from '../../helpers';
import { getUrlParamater } from '../../hooks';
import AcceptInvite from './AcceptInvite';

export default function InviteGate({ children }) {
  const [id, setId] = React.useState(getUrlParamater('i'));
  const [type, setType] = React.useState(getUrlParamater('t'));

  const handleBack = React.useCallback(() => {
    setId(getUrlParamater('i'));
    setType(getUrlParamater('t'));
  }, [setId]);

  return !isEmpty(id) ? <AcceptInvite id={id} type={type} onBack={handleBack} /> : children;
}
