import * as React from 'react';
import { isEmpty } from '../../helpers';
import { useUrlParameter } from '../../hooks';
import AcceptInvite from './AcceptInvite';

export default function InviteGate({ children }) {
  const id = useUrlParameter('i');
  return !isEmpty(id) ? <AcceptInvite id={id as string} /> : children;
}
