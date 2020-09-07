import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import { MultiUserToolbar } from './toolbars';
import { useInstructors } from './hooks';
import * as Icons from '@material-ui/icons';
import useTabSelector from '../../Selector/useTabSelector';

const tabs = [
  { id: 'Active', icon: Icons.GroupOutlined },
  { id: 'Archived', icon: Icons.Archive }
];

export default function Instructors({ name = 'Instructors', ...other }) {
  const [{ value: tab = 'Active' }] = useTabSelector(name);
  return (
    <GenericTableContainer
      name={name}
      title={`${tab} ${name}`}
      tabs={tabs}
      columns={[{ name: 'Name' }, { name: 'Title' }, { name: 'Institution' }]}
      toolbar={true}
      footer={true}
      search={true}
      stacked={true}
      data={useInstructors(`${tab} ${name}`, tab)}
      checkbox={true}
      select={true}
      MultiSelectToolbar={props => <MultiUserToolbar tab={tab} {...props} />}
      {...other}
    />
  );
}
