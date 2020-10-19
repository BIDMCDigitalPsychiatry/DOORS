import { useUserId } from '../components/layout/hooks';

export const useIsOwner = classData => {
  const uid = useUserId();
  const { parentUserId, userId } = classData;
  console.log({ uid, parentUserId, userId, classData });
  return parentUserId ? parentUserId === uid : userId === uid;
};
