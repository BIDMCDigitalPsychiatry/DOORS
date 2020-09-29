import * as React from 'react';
import { useTableRow } from './useTableRow';
import { tables } from './dbConfig';

export function useProfile({ id }) {
  const [state, setState] = React.useState();
  const [row, setRow] = useTableRow({ Model: tables.profiles, id, state, setState });
  return [row, setRow, state, setState];
}
