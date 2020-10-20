import * as React from 'react';
import { tables } from '../../database/dbConfig';
import useInvites from '../../database/useInvites';
import { isEmpty } from '../../helpers';
import { getUrlParamater } from '../../hooks';
import AcceptInvite from './AcceptInvite';
import { useUserEmail } from './hooks';

export default function InviteGate({ children }) {
  const [id, setId] = React.useState(getUrlParamater('i'));
  const [type, setType] = React.useState(getUrlParamater('t'));

  const email = useUserEmail();
  const { invites: students, handleRefresh: refreshStudents } = useInvites({ email });
  const { invites: instructors, handleRefresh: refreshInstructors } = useInvites({ email, Model: tables.instructors });

  const handleBack = React.useCallback(() => {
    refreshInstructors();
    refreshStudents();
    setId(getUrlParamater('i'));
    setType(getUrlParamater('t'));
  }, [setId, refreshInstructors, refreshStudents]);

  if (students?.length > 0) {
    return <AcceptInvite id={students[0].id} type='s' onBack={handleBack} />;
  } else if (instructors?.length > 0) {
    return <AcceptInvite id={instructors[0].id} type='i' onBack={handleBack} />;
  } else {
    return !isEmpty(id) ? <AcceptInvite id={id} type={type} onBack={handleBack} /> : children;
  }
}
