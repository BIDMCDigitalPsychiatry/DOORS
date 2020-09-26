import calendar from '../../../images/calendar.png';
import wifi from '../../../images/wifi.png';
import picture from '../../../images/picture.png';
import contacts from '../../../images/contacts.png';
import musicplayer from '../../../images/musicplayer.png';
import newspaper from '../../../images/newspaper.png';
import checkbox from '../../../images/checkbox.png';
import video from '../../../images/video.png';

export const images = {
  wifi,
  calendar,
  picture,
  contacts,
  musicplayer,
  newspaper,
  checkbox,
  video
};

export const getImage = key => images[key];
