import * as React from 'react';
import { isEmpty } from '../../helpers';
import { useProfile } from '../../database/useProfile';
import { useUserEmail, useUserId } from './hooks';

export default function useProfileEmailAutoUpdate() {
  const id = useUserId();
  const email = useUserEmail();
  const { profile, setProfile, handleRefresh, loading, readSetRow } = useProfile({ id });

  // Any time the user id changes, compare the email address and sync if necessary.
  // This ensures that the dynamo db profile emails are in sync with the cognitor emails
  React.useEffect(() => {
    console.log('Checking profile');
    !isEmpty(id) &&
      handleRefresh({
        onSuccess: response => {
          const profile = response?.Item;
          const profileEmail = profile?.email;
          if (isEmpty(profileEmail) || email.toLowerCase() !== profileEmail.toLowerCase()) {
            console.log('Syncing profile: ' + email);
            readSetRow({ values: { email } });
          } else {
            console.log('Profile in sync');
          }
        }
      }); // Refresh profile whenever the user id changes
  }, [id, email, readSetRow, handleRefresh]);

  return { profile, setProfile, loading, handleRefresh };
}
