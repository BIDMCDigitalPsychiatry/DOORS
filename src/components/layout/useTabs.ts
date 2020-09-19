import { useUserType } from './../../hooks';
import * as Icons from '@material-ui/icons';

const allTabs = [
  { id: 'My Classes', icon: Icons.Apps, route: '/Sessions' },
  { id: 'Instructors', icon: Icons.SupervisorAccount, route: '/Instructors', userTypes: ['Admin'] },
  { id: 'My Calendar', icon: Icons.Event, route: '/Calendar' },
  { id: 'My Profile', icon: Icons.AccountBox, route: '/Profile' },
  { id: 'Help', icon: Icons.Help, userTypes: ['Instructor', 'Student'] }
];

export default function useTabs() {
  const userType = useUserType();
  const tabs = allTabs.filter(t => t.userTypes === undefined || t.userTypes.find(ut => ut === userType));
  const tabs_s = JSON.stringify(tabs.map(t => ({ id: t.id, route: t.route })));
  return { tabs, tabs_s };
}
