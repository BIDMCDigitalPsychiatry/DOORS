import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import TabSelector from '../../general/TabSelector/TabSelector';
import { useHeight, useWidth } from '../../layout/hooks';

export default function TableTabSelector({ id, tabs, tab: Tab = undefined, ...other }) {
  const storeTable = useSelector((s: AppState) => s.table[id]);
  const height = useHeight();
  const width = useWidth();
  const orientation = height > width ? 'potrait' : 'landscape';
  const tab = Tab ? Tab : storeTable?.tab;

  return <TabSelector id={id} tab={tab} tabs={tabs} orientation={orientation} {...other} />;
}
