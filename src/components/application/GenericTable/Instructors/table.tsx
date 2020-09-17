import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import { MultiUserToolbar } from './toolbars';
import { useInstructors } from './useInstructors';
import * as Icons from '@material-ui/icons';
import useTabSelector from '../../Selector/useTabSelector';
import DialogButton from '../../GenericDialog/DialogButton';
import * as AddInstructorDialog from '../../GenericDialog/AddInstructor';

const tabs = [
  { id: 'Active', icon: Icons.GroupOutlined },
  { id: 'Archived', icon: Icons.Archive }
];

export default function Instructors({ name = 'Instructors', ...other }) {
  const [{ value: tab = 'Active' }] = useTabSelector(name);
  const { data, loading, handleRefresh } = useInstructors(`${tab} ${name}`, tab);
  return (
    <GenericTableContainer
      name={name}
      loading={loading}
      title={`${tab} ${name}`}
      tabs={tabs}
      columns={[{ name: 'Name' }, { name: 'Title' }, { name: 'Institution' }, { name: 'Invite', header: 'Invite Status' }]}
      toolbar={true}
      footer={true}
      search={true}
      stacked={true}
      data={data}
      checkbox={true}
      select={true}
      MultiSelectToolbar={props => <MultiUserToolbar tab={tab} {...props} />}
      buttons={[
        <DialogButton Module={AddInstructorDialog} Icon={Icons.Add} onClose={handleRefresh} size='small' margin='dense' variant='styled' tooltip=''>
          Add New
        </DialogButton>
      ]}
      {...other}
    />
  );
}
