import * as React from 'react';
import { Grid, Box, Divider, Typography } from '@material-ui/core';
import ChildPage from '../../ChildPage';
import { useHandleChangeRouteLayout, useLayout } from '../../../layout/hooks';
import { tables } from '../../../../database/dbConfig';
import { getClassTitle, getDateFromTimestamp, isEmpty, onlyUnique } from '../../../../helpers';
import { useFullScreen } from '../../../../hooks';
import { useClassData } from '../../../../database/useClassData';
import useTableRow from '../../../../database/useTableRow';
import useGroupStudents from '../../../../database/useGroupStudents';
import RankingModel from '../RankingModel';
import MarginDivider from '../../../application/DialogField/MarginDivider';
import { useSessionsByGroupId } from '../../../../database/useSessions';
import { defaultAgeRankingModels, defaultRankingModels } from '../../../../database/models/Class';
import Session from '../../../../database/models/Session';
import Decimal from 'decimal.js-light';
import { buildParticipants } from '../ClassGroup';
import { ParticipantsDetailed } from '../ParticipantsDetailed';
import ResultsSummary from './ResultsSummary';

const getRankingValue = id => {
  return defaultRankingModels.find(rm => rm.id === id)?.rankingValue;
};

export const getReportData = (sessions: Session[]) => {
  const surveyQuestions = sessions.map(s => s.surveyQuestions).reduce((f, c) => f.concat(c), []);
  const surveyQuestionNames = surveyQuestions.map(sq => sq.name).filter(onlyUnique);

  var results = [];

  // For each question create an array of the ranking model and the number of answers for each ranking model
  surveyQuestionNames.forEach(question => {
    var preAnswers = [];
    var postAnswers = [];
    sessions.forEach(session => {
      session.surveyQuestions.forEach(sq => {
        if (sq.name === question) {
          if (!isEmpty(sq.preSurveyAnswer)) {
            preAnswers = [
              ...preAnswers,
              {
                session: session,
                value: getRankingValue(sq.preSurveyAnswer.id)
              }
            ];
          }
          if (!isEmpty(sq.postSurveyAnswer)) {
            postAnswers = [
              ...postAnswers,
              {
                session: session,
                value: getRankingValue(sq.postSurveyAnswer.id)
              }
            ];
          }
        }
      });
    });

    results.push({
      question,
      preAnswers,
      postAnswers,
      preAnswersAverage: new Decimal(preAnswers.reduce((t, c) => t + c.value, 0)).dividedBy(preAnswers.length).toDecimalPlaces(2).toNumber(),
      postAnswersAverage: new Decimal(postAnswers.reduce((t, c) => t + c.value, 0)).dividedBy(postAnswers.length).toDecimalPlaces(2).toNumber()
    });
  });

  return {
    ageQuestionData: defaultAgeRankingModels.map(rm => sessions.filter(s => s.ageQuestion.preSurveyAnswer.id === rm.id).length),
    results
  };
};

export default function ClassReport() {
  const [state, setState] = React.useState({ loading: false });
  const [{ groupId }] = useLayout();

  const { data }: any = useClassData();
  const { row: group } = useTableRow({ Model: tables.groups, id: groupId, state, setState });
  const { sessions } = useSessionsByGroupId({ groupId, classId: data.id });
  const { activeStudents } = useGroupStudents({ groupId });
  const activeParticipants = buildParticipants(activeStudents, sessions);

  const completed = sessions.filter(c => c.completed === true);
  //const inProgress = sessions.filter(c => c.completed !== true);

  const { results, ageQuestionData } = getReportData(completed);

  const { rankingModel } = data;
  const { name, headline } = data;

  const handleChangeRouteLayout = useHandleChangeRouteLayout();
  const fs = useFullScreen();

  return (
    <ChildPage
      backLabel='Back to Class Roster'
      onBack={handleChangeRouteLayout('/ClassRoster', { class: data })}
      title={getClassTitle({ headline, name })}
      subtitle='Class Report'
    >
      <Box mt={2}>
        <Divider />
        <Grid container style={{ padding: !fs ? 24 : 8 }} spacing={fs ? 2 : 4}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>{group?.name}</Typography>
            {!isEmpty(group?.location) && <Typography variant='body2'>Location: {group?.location}</Typography>}
            {!isEmpty(group?.type) && <Typography variant='body2'>Type: {group?.location}</Typography>}
            {!isEmpty(group?.created) && (
              <Box mt={1}>
                <Typography variant='caption'>Created on {getDateFromTimestamp(group?.created)}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <RankingModel rankingModel={rankingModel} />
          </Grid>
          <Grid item xs={12}>
            <ResultsSummary results={results} ageQuestionData={ageQuestionData} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6'>View Individual Answers</Typography>
            <MarginDivider />
            <Box mt={2}>
              <Grid container>
                <Grid item xs>
                  {[{ participants: activeParticipants, label: 'Active Participants', view: false, viewReport: true, remove: false }]
                    .filter(i => i.participants.length > 0)
                    .map((props, i) => (
                      <ParticipantsDetailed key={i} {...props} />
                    ))}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ChildPage>
  );
}
