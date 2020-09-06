import * as React from 'react';
import { Typography, Grid, Container, createStyles, makeStyles } from '@material-ui/core';
import Session from './Session';
import calendar from '../../../images/calendar.png';
import wifi from '../../../images/wifi.png';
import picture from '../../../images/picture.png';
import contacts from '../../../images/contacts.png';
import musicplayer from '../../../images/musicplayer.png';
import newspaper from '../../../images/newspaper.png';
import checkbox from '../../../images/checkbox.png';
import video from '../../../images/video.png';

const useStyles = makeStyles(({ palette }: any) =>
  createStyles({
    container: {
      marginTop: 8,
      marginBottom: 8
    },
    header: {
      color: palette.primary.dark
    }
  } as any)
);

const sessions = [
  { title: 'Session 1', subtitle: 'Establishing Core Smartphone Skills', topics: ['Connecting to Wifi', 'Checking the weather'], image: wifi },
  { title: 'Session 2', subtitle: 'Building Wellness Habits', topics: ['Tracking Step Count', 'Using a guided meditation app'], image: picture },
  { title: 'Session 3', subtitle: 'Managing Responsibilites', topics: ['Adding Calendar Events', 'Getting directions on a map app'], image: calendar },
  { title: 'Session 4', subtitle: 'Staying Connected', topics: ['Sending an email', 'Finding a job opportunity on LinkedIn'], image: contacts },
  { title: 'Session 5', subtitle: 'Keeping Informed', topics: [`Finding today's headlines`], image: newspaper },
  {
    title: 'Session 6',
    subtitle: 'Expanding Your Knowledge',
    topics: ['Watching a Youtube video to learn a new skill', 'Translating a sentence from one language to another'],
    image: video
  },
  { title: 'Session 7', subtitle: 'Navigating Safely', topics: [`Finding an app's privacy policy`, 'Reading app reviews and ratings'], image: checkbox },
  { title: 'Session 8', subtitle: 'Enjoying Downtime ', topics: ['Creating an account on music streaming platform', 'Downloading a game'], image: musicplayer }
];

export default function Sessions() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth={false}>
      <Grid container alignItems='center'>
        <Grid item>
          <Typography className={classes.header} variant='h4'>
            Available Sessions
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.container}>
        {[
          sessions.map(s => (
            <Grid item lg={3} sm={6} xs={12}>
              <Session {...s} />
            </Grid>
          ))
        ]}
      </Grid>
    </Container>
  );
}
