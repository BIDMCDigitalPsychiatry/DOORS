import { useLayout } from '../../../layout/hooks';
import { useProfile } from '../../../../database/useProfile';

export default function useParentEmail({ active = false }) {
  const [{ profile }] = useLayout();
  const parentId = profile?.parentId;
  const { profile: parentProfile } = useProfile({ id: parentId, active, shouldSetLayout: false });
  return parentProfile?.email;
}
