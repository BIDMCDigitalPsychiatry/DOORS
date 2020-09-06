import { useIsAdmin, useIsInstructor } from '../../hooks';
import * as Icons from '@material-ui/icons';
import { beta } from '../../constants';

const allTabs = [
  { id: 'My Classes', icon: Icons.Apps, route: '/Sessions' },
  { id: 'Instructors', icon: Icons.SupervisorAccount, route: '/Instructors' },
  { id: 'My Calendar', icon: Icons.Event, route: '/Calendar' },
  { id: 'My Profile', icon: Icons.AccountBox, route: '/Profile' },
  { id: 'Help', icon: Icons.Help }
];

const adminTabs = allTabs.filter(x => x.id !== 'Help');
const studentTabs = allTabs.filter(x => x.id !== 'Instructors');
const instructorTabs = allTabs.filter(x => x.id !== 'Instructors');

export default function useTabs() {
  const isAdmin = useIsAdmin();
  const isInstructor = useIsInstructor();
  const tabs = beta ? allTabs : isAdmin ? adminTabs : isInstructor ? instructorTabs : studentTabs;
  const tabs_s = JSON.stringify(tabs.map(t => ({ id: t.id, route: t.route })));
  return { tabs, tabs_s };
}
