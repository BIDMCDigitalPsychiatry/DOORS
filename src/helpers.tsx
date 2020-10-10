import { AppState } from './store';
import { theme } from './constants';
import packageJson from '../package.json';
import { v4 as uuidv4 } from 'uuid';

export function hostAddress(append?) {
  return (
    window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + (append !== undefined ? append : '')
  );
}

export const debugSettings = {
  debugoutput: false,
  logviewport: false,
  logrender: true,
  logmapping: false,
  logreducer: false,
  logselectors: false,
  logform: true,
  logformupdates: true,
  debugfieldonhover: false
};

export function printHeader() {
  console.log(
    `%c

██████╗  ██████╗  ██████╗ ██████╗ ███████╗
██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗██╔════╝
██║  ██║██║   ██║██║   ██║██████╔╝███████╗
██║  ██║██║   ██║██║   ██║██╔══██╗╚════██║
██████╔╝╚██████╔╝╚██████╔╝██║  ██║███████║
╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝ 

Host: ${hostAddress()}

Environment: ${process.env.NODE_ENV}
Version: ${packageJson.version}
                         
`,
    'font-family:monospace;color:' + theme.palette.primary.main + ';font-size:12px;'
  );
}

export function getViewPortHeight(state: AppState) {
  return state.layout.height;
}

export function getLayoutHeight(state: AppState) {
  return getViewPortHeight(state);
}

export const setIfEmpty = value => (value === undefined || value === null ? '' : value);
export const checkEmpty = value => value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
export const undefinedIfEmpty = value => (checkEmpty(value) ? undefined : value);
export const isDefined = value => value !== undefined && value !== null;
export const hasChanged = (current, initial) => JSON.stringify(current) !== JSON.stringify(initial);

export const getKey = ({ container, object, id }: any) => [container, object, id].filter(v => !checkEmpty(v)).join('.');

export function validateEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  );
}

export function validateHttpUrl(url) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(String(url).toLowerCase());
}

export function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const uncapitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toLowerCase() + s.slice(1);
};

export function copyToLower(obj = {}) {
  var key,
    keys = Object.keys(obj);
  var n = keys.length;
  var newobj = {};
  while (n--) {
    key = keys[n];
    newobj[uncapitalize(key)] = obj[key];
  }
  return newobj;
}

export const isTrue = value => value === 1 || value === '1' || value === true || value === 'true';
export const isFalse = value => value === 0 || value === '0' || value === false || value === 'false';

// Converts a string, number or boolean to boolean with default false
export const bool = x =>
  typeof x === 'boolean'
    ? x
    : typeof x === 'number'
    ? x === 1
      ? true
      : false
    : typeof x === 'string'
    ? x === '1'
      ? true
      : x.toLowerCase() === 'true'
      ? true
      : false
    : false;

// If a function, then return the result of the function call with props passed in.  Else return the value
export const evalFunc = (value, props = undefined) => (typeof value === 'function' ? value(props) : value);

export const emptyUndefined = value => (value === false || value === null ? undefined : value);
export const isError = value => (value === undefined || value === null || value === '' ? false : true);

export const copyDeleteKey = (key, obj) => deleteKey(key, { ...obj });

export const deleteKey = (key, obj) => {
  delete obj[key];
  return obj;
};

export const getLabel = f => (f.label === null ? undefined : f.label !== undefined ? f.label : f.id);

export function spread(final, current) {
  return { ...final, ...current };
}

export function isEmpty(str) {
  return !str || 0 === str.length;
}

export function triggerResize() {
  window.dispatchEvent(new CustomEvent('resize')); //Makes the indicator start animating
  setTimeout(() => window.dispatchEvent(new CustomEvent('resize')), 200); //Ensures the animation resized correctly after the drawer finishes opening/closing
}

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const publicUrl = path => process.env.PUBLIC_URL + path;

export function updateState(state, { payload, id }) {
  const data = evalFunc(payload, state[id]);
  var newState = { ...state };
  newState[id] = data;
  if (state && state[id]) {
    newState[id] = data;
  }
  return newState;
}

export function uuid() {
  return uuidv4();
}

//returns milliseconds from Jan 1 1970
export function getTime() {
  return Date.now();
}
export function getIsoDateString(timestamp?: number) {
  var d = new Date(0);
  d.setUTCMilliseconds(timestamp || getTime());
  return d.toISOString();
}

export function getDateFromTimestamp(milliseconds): string {
  //UTC timestamp is milliseconds since Jan 1 1970
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  //utc time
  d.setUTCMilliseconds(milliseconds);
  return mmddyyyy(d);
}

export function getTimeFromTimestamp(milliseconds): string {
  //UTC timestamp is milliseconds since Jan 1 1970
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  //utc time
  d.setUTCMilliseconds(milliseconds);
  return getHoursMinutes(d);
}

function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

export function getHoursMinutes(date) {
  var h = addZero(date.getHours());
  var m = addZero(date.getMinutes());
  return h + ':' + m;
}

export function yyyymmdd(date?: Date) {
  date = date ? date : new Date(); //If we don't pass a date in, then create it

  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
}

export function mmddyyyy(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [(mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd, date.getFullYear()].join('/');
}

export function getDateForInput(date) {
  //should be in this format: 2019-01-02
  return yyyymmdd(date);
}

// Returns minutes elapsed from time to current time
export function minutesFrom(time) {
  var current = new Date().getTime();
  var diff = (current - time) / 60000; //converts milliseconds to elapsed minutes
  return diff > 0 ? diff : 0;
}

export function minutesToTimeAgo(minutes) {
  var d = Math.floor(minutes / 1440);
  var h = Math.floor(minutes / 60);
  var m = Math.floor(minutes % 60);
  var ret = '';
  if (d > 0) {
    ret = ret + d + 'd ';
  }
  if (h > 0 || d > 0) {
    ret = ret + h + 'h ';
  }
  if (m >= 0 || h > 0 || d > 0) {
    ret = ret + m + 'm ';
  }
  if (ret !== '') ret = ret + 'ago';
  return ret;
}

export const timeAgo = time => (time ? minutesToTimeAgo(minutesFrom(time)) : '');

export function sortDescending(a = 0, b = 0) {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

export function sortAscending(a = 0, b = 0) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const getAndroidIdFromUrl = (url: string) => {
  var searchStr = '?id=';
  var index = (url as string)?.indexOf(searchStr);
  if (index >= 0) {
    var indexEnd = url.indexOf('&', index);
    return url.substring(index + searchStr.length, indexEnd >= 0 ? indexEnd : undefined);
  }
};

export const getAppleIdFromUrl = (url: string) => {
  var searchStr = '/id';
  var index = (url as string)?.indexOf(searchStr);
  if (index >= 0) {
    var indexEnd = url.indexOf('&', index);
    return url.substring(index + searchStr.length, indexEnd >= 0 ? indexEnd : undefined);
  }
};

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function dayAbbrOfWeek(dayIndex) {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIndex];
}

function monthAbbrOfYear(monthIndex) {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
}

function nth(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function getDayTimeFromTimestamp(timestamp: number) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCMilliseconds(timestamp); //utc time
  var day = dayAbbrOfWeek(d.getDay());
  var year = d.getDate() + nth(d.getDate());
  var h = d.getHours();
  var m = addZero(d.getMinutes());
  var isPM = h > 12 ? true : false;
  h = isPM ? h - 12 : h === 0 ? 12 : h; //If PM, subtract 12.  If we are 0 or midnight, then set to 12, otherwise use the normal hour index
  var month = monthAbbrOfYear(d.getMonth());

  return `${day} ${month} ${year} ${h}:${m} ${isPM ? 'PM' : 'AM'}`;
}

// Accepts a single paramater which is one or more emails separated
// by space,comma,semicolon,tab, or newline.
// Returns an array of tokens that should be emails
// Does not validate emails to see if they are well formed.
export function parseEmails(emails) {
  return isEmpty(emails) ? [] : emails.toLowerCase().split(/[\s,;\t\n]+/);
}

export const getClassTitle = ({ headline, name }) => [headline, name].filter(x => !isEmpty(x)).join(' - ');

export const getStudentName = ({ student, profile }) => profile?.name ?? student?.email ?? 'Unknown Name';

// Returns the first id before the : separator
export const getId = id => {
  console.log({ id });
  if (isEmpty(id) || !id.includes(':')) {
    return id;
  } else {
    return id.split(':')[0];
  }
};

// Returns the second id after the : separator
export const getSessionId = id => {
  if (isEmpty(id) || !id.includes(':')) {
    return undefined;
  } else {
    return id.split(':')[1];
  }
};
