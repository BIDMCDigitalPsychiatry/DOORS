import { tables } from './dbConfig';
import useTableRow from './useTableRow';

export default function useGroupName({ groupId }) {
  const { row } = useTableRow({ id: groupId, Model: tables.groups });
  return row?.name;
}
