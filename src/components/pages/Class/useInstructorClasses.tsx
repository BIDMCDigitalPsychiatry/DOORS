import { useLayout } from '../../layout/hooks';
import useClassesByUserId from './useClassesByUserId';

export default function useInstructorClasses() {
  const [{ instructor }] = useLayout();
  const { userId } = instructor;
  return useClassesByUserId({ userId });
}
