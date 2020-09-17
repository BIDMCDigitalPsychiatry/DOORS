import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import Login from './Login';

export default function AuthGate({ children }) {
  const auth = useSelector((state: AppState) => state.layout.auth);
  return auth !== undefined && auth !== null ? children : <Login />;
}
