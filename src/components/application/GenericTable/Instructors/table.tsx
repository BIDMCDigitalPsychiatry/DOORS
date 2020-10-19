import * as React from 'react';
import GenericTableContainer from '../GenericTableContainer';
import { useInstructors } from './useInstructors';
import * as Icons from '@material-ui/icons';
import useTabSelector from '../../Selector/useTabSelector';
import DialogButton from '../../GenericDialog/DialogButton';
import * as AddInstructorDialog from '../../GenericDialog/AddInstructor';
import { RowActionsButton } from './buttons';
import { useHandleChangeRouteLayout, useUserId } from '../../../layout/hooks';

const back = {
  label: 'Back to Instructors',
  route: '/Instructors'
};
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

const ViewClassesButton = props => {
  const disabled = props?.Invite !== 'Accepted';
  const userId = useUserId(); // Admin userid

  const changeRoute = useHandleChangeRouteLayout();

  return (
    <DialogButton
      disabled={disabled}
      variant='link'
      linkVariant='subtitle2'
      underline='always'
      onClick={changeRoute('/InstructorClasses', {
        back,
        instructor: { userId: props?.userId, parentId: userId }
      })}
      {...props}
    >
      {disabled ? 'N/A' : 'View Classes'}
    </DialogButton>
  );
};

export default function Instructors({ name = 'Instructors', ...other }) {
  const [{ value: tab = 'Active' }] = useTabSelector(name);
  const selectedTab = tabs.find(t => t.id === tab);
  const requestParams = selectedTab?.requestParams;

  const { data, loading, handleRefresh } = useInstructors({ table: name, tab, requestParams });

  const RowActionsCell = React.useCallback(props => <RowActionsButton onUpdate={handleRefresh} {...props} />, [handleRefresh]);

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
          name: 'Classes',
          header: 'View Classes',
          Cell: ViewClassesButton
        },
        {
          name: 'actions',
          header: 'Actions',
          width: 88,
          Cell: RowActionsCell
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
