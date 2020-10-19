import React from 'react';
import GenericDialog from '../GenericDialog';
import { useDialogState } from '../useDialogState';
import ResultsSummary from '../../../pages/Class/ClassReport/ResultsSummary';
import { getReportData } from '../../../pages/Class/ClassReport/ClassReport';

export const title = 'View Report';

export default function ViewReportDialog({ id = title, onClose = undefined, ...other }) {
  const [state] = useDialogState(id);
  const { initialValues } = state;
  const { participant } = initialValues;

  const sessions = participant?.sessions ?? [];
  const { ageQuestionData, results } = getReportData(sessions);

  return (
    <GenericDialog
      id={id}
      title={id}
      maxWidth='xl'
      onClose={onClose}
      cancelLabel='Done'
      submitLabel={null}
      fields={[
        {
          id: 'results',
          Field: () => <ResultsSummary title='Results' ageQuestionData={ageQuestionData} results={results} />
        }
      ]}
      {...other}
    />
  );
}
