import * as React from 'react';
import { useIsAdminMode } from '../../../../hooks';
import cards from './cards';
import ClassDashboardContent from './ClassDashboardContent';

export default function ClassesDashboard() {
  const isAdminMode = useIsAdminMode();
  return <ClassDashboardContent cards={isAdminMode ? cards.filter(c => c.title !== 'Class Roster') : cards} />;
}
