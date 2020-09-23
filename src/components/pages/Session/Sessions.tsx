import * as React from 'react';
import { Grid } from '@material-ui/core';
import Session from './Session';
import calendar from '../../../images/calendar.png';
import wifi from '../../../images/wifi.png';
import picture from '../../../images/picture.png';
import contacts from '../../../images/contacts.png';
import musicplayer from '../../../images/musicplayer.png';
import newspaper from '../../../images/newspaper.png';
import checkbox from '../../../images/checkbox.png';
import video from '../../../images/video.png';
import Page from '../Page';
import { useHandleChangeRoute } from '../../layout/hooks';
import { useIsAdminMode } from '../../../hooks';
import StyledButton from '../../general/StyledButton';

const rankingModel = [
  'I cannot do it on my own',
  'I can do it on my own, but with step by step directions',
  'I can do it mostly on my own, but may have a few questions',
  'I can do it on my own with ease',
  'I can do it and can teach someone else'
];

const surveyQuestions = [
  { label: 'Adding an appointment to my calendar', locked: true },
  { label: 'Getting directions to home', locked: true },
  { label: 'Setting an alarm', locked: true },
  { label: 'Looking up a train schedule', locked: false },
  { label: 'Creating an account on a ride-sharing app', locked: false }
];

const classResources = [
  { label: 'Test Resource 1', description: 'Test resource...' },
  { label: 'Test Resource 2', description: 'Test resource...' },
  { label: 'Test Resource 3', description: 'Test resource...' },
  { label: 'Test Resource 4', description: 'Test resource...' }
];

const classPresentation = { name: 'File_Name.pdf', date: '6/10/20' };

const sessions = [
  {
    id: 1,
    title: 'Session 1',
    subtitle: 'Establishing Core Smartphone Skills',
    keySkills: ['Connecting to Wifi', 'Checking the weather'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: wifi,
    classPresentation
  },
  {
    id: 2,
    title: 'Session 2',
    subtitle: 'Building Wellness Habits',
    keySkills: ['Tracking Step Count', 'Using a guided meditation app'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: picture,
    classPresentation
  },
  {
    id: 3,
    title: 'Session 3',
    subtitle: 'Managing Responsibilites',
    keySkills: ['Adding Calendar Events', 'Getting directions on a map app'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: calendar,
    classPresentation
  },
  {
    id: 4,
    title: 'Session 4',
    subtitle: 'Staying Connected',
    keySkills: ['Sending an email', 'Finding a job opportunity on LinkedIn'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: contacts,
    classPresentation
  },
  {
    id: 5,
    title: 'Session 5',
    subtitle: 'Keeping Informed',
    keySkills: [`Finding today's headlines`],
    rankingModel,
    surveyQuestions,
    classResources,
    image: newspaper,
    classPresentation
  },
  {
    id: 6,
    title: 'Session 6',
    subtitle: 'Expanding Your Knowledge',
    keySkills: ['Watching a Youtube video to learn a new skill', 'Translating a sentence from one language to another'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: video,
    classPresentation
  },
  {
    id: 7,
    title: 'Session 7',
    subtitle: 'Navigating Safely',
    keySkills: [`Finding an app's privacy policy`, 'Reading app reviews and ratings'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: checkbox,
    classPresentation
  },
  {
    id: 8,
    title: 'Session 8',
    subtitle: 'Enjoying Downtime ',
    keySkills: ['Creating an account on music streaming platform', 'Downloading a game'],
    rankingModel,
    surveyQuestions,
    classResources,
    image: musicplayer,
    classPresentation
  }
];

const ActionButton = () => {
  const changeRoute = useHandleChangeRoute();
  return <StyledButton onClick={changeRoute('/CreateSession')}>Create New Session</StyledButton>;
};

export default function Sessions() {
  const handleChangeRoute = useHandleChangeRoute();
  const isAdminMode = useIsAdminMode();
  return (
    <Page title='Available Sessions' ActionButton={isAdminMode ? ActionButton : undefined}>
      <Grid container spacing={3}>
        {[
          sessions.map(s => (
            <Grid key={[s.title, s.subtitle].join('-')} item lg={3} sm={6} xs={12}>
              <Session {...s} onClick={handleChangeRoute('/SessionDashboard', s)} />
            </Grid>
          ))
        ]}
      </Grid>
    </Page>
  );
}
