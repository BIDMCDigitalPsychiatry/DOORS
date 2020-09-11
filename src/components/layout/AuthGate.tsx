import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import Login from './Login';
import { useUrlParameter } from '../../hooks';
import AcceptInvite from './AcceptInvite';

export default function AuthGate({ children }) {
  const auth = useSelector((state: AppState) => state.layout.auth);
  const invite = useUrlParameter('i');
  return invite ? <AcceptInvite uuid={invite} /> : auth !== undefined && auth !== null ? children : <Login />;
}
