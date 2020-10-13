import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import { useInstructors } from './useInstructors';
import * as Icons from '@material-ui/icons';
import useTabSelector from '../../Selector/useTabSelector';
import DialogButton from '../../GenericDialog/DialogButton';
import * as AddInstructorDialog from '../../GenericDialog/AddInstructor';
import { RowActionsButton } from './buttons';

const tabs = [
  {
    id: 'Active',
    icon: Icons.GroupOutlined,
    filter: data => data.filter(r => r.deleted !== true) // Easier to filter on client end as AWS doesn't appear to support null filtering
  },
  {
    id: 'Archived',
    icon: Icons.Archive,
    requestParams: {
      FilterExpression: '#deleted = :deleted',
      ExpressionAttributeNames: {
        '#deleted': 'deleted'
      },
      ExpressionAttributeValues: {
        ':deleted': true
      }
    }
  }
];

export default function Instructors({ name = 'Instructors', ...other }) {
  const [{ value: tab = 'Active' }] = useTabSelector(name);
  const selectedTab = tabs.find(t => t.id === tab);
  const requestParams = selectedTab?.requestParams;

  const { data, loading, handleRefresh } = useInstructors({ table: name, tab, requestParams });

  return (
    <GenericTableContainer
      name={name}
      loading={loading}
      title={`${tab} ${name}`}
      tabs={tabs}
      columns={[
        { name: 'email', header: 'Email' },
        { name: 'title', header: 'Title' },
        { name: 'institution', header: 'Institution' },
        { name: 'Invite', header: 'Invite Status' },
        {
          name: 'actions',
          header: 'Actions',
          width: 88,
          Cell: props => <RowActionsButton onUpdate={handleRefresh} {...props} />
        }
      ]}
      toolbar={true}
      footer={true}
      search={true}
      stacked={true}
      data={selectedTab?.filter ? selectedTab.filter(data) : data}
      checkbox={false}
      select={false}      
      buttons={[
        <DialogButton Module={AddInstructorDialog} Icon={Icons.Add} onClose={handleRefresh} size='small' margin='dense' variant='styled' tooltip=''>
          Add New
        </DialogButton>
      ]}
      {...other}
    />
  );
}
