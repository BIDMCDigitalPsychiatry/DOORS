import * as React from 'react';
import { useIsAdminMode } from '../../../../hooks';
import { Box } from '@material-ui/core';
import ChildPage from '../../ChildPage';
import { useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import { useSignedInAsText } from '../../../../hooks';
import KeySkills from './KeySkills';
import ActionCards from './ActionCards';
import cards from './cards';

export default function ClassDashboard() {
  const isAdminMode = useIsAdminMode();
  const [{ class: classData }] = useLayout();
  const { name, headline, keySkills = [] } = classData;
  const handleChangeRouteLayout = useHandleChangeRouteLayout();    
  return (
    <ChildPage backLabel='Back to Classes' onBack={handleChangeRouteLayout('/Classes')} supertitle={name} title={headline} subtitle={useSignedInAsText()}>
      <Box mt={2}>
        <KeySkills keySkills={keySkills} />
        <ActionCards cards={isAdminMode ? cards.filter(c => c.title !== 'Class Roster') : cards} />
      </Box>
    </ChildPage>
  );
}
