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

const sessions = [
  { id: 1, title: 'Session 1', subtitle: 'Establishing Core Smartphone Skills', skills: ['Connecting to Wifi', 'Checking the weather'], image: wifi },
  { id: 2, title: 'Session 2', subtitle: 'Building Wellness Habits', skills: ['Tracking Step Count', 'Using a guided meditation app'], image: picture },
  { id: 3, title: 'Session 3', subtitle: 'Managing Responsibilites', skills: ['Adding Calendar Events', 'Getting directions on a map app'], image: calendar },
  { id: 4, title: 'Session 4', subtitle: 'Staying Connected', skills: ['Sending an email', 'Finding a job opportunity on LinkedIn'], image: contacts },
  { id: 5, title: 'Session 5', subtitle: 'Keeping Informed', skills: [`Finding today's headlines`], image: newspaper },
  {
    id: 6,
    title: 'Session 6',
    subtitle: 'Expanding Your Knowledge',
    skills: ['Watching a Youtube video to learn a new skill', 'Translating a sentence from one language to another'],
    image: video
  },
  { id: 7, title: 'Session 7', subtitle: 'Navigating Safely', skills: [`Finding an app's privacy policy`, 'Reading app reviews and ratings'], image: checkbox },
  {
    id: 8,
    title: 'Session 8',
    subtitle: 'Enjoying Downtime ',
    skills: ['Creating an account on music streaming platform', 'Downloading a game'],
    image: musicplayer
  }
];

export default function Sessions() {  
  const handleChangeRoute = useHandleChangeRoute();
  return (
    <Page title='Available Sessions'>
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
