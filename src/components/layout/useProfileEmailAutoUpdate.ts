import * as React from 'react';
import { useProfile } from '../../database/useProfile';
import { isEmpty } from '../../helpers';
import { useLayout, useUserEmail, useUserId } from './hooks';

export default function useProfileEmailAutoUpdate() {
  const id = useUserId();
  const email = useUserEmail();
  const [{ profile }] = useLayout();
  const { readSetRow } = useProfile({ id });

  const profileId = profile?.id;
  const profileEmail = profile?.email;

  // This monitors the profile email and the cognito email and esnures that the profile email is auto updated to match the cognito email

  React.useEffect(() => {
    if (!isEmpty(id) && id === profileId) {
      if (!isEmpty(email) && profileEmail?.toLowerCase() !== email?.toLowerCase()) {
        console.log('Syncing profile: ' + email);
        readSetRow({ values: { email } });
      } else {
        console.log('Profile in sync: ' + email);
      }
    }
  }, [id, profileId, email, profileEmail, readSetRow]);
}
