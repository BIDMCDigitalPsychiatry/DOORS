import * as React from 'react';
import { Route, Switch } from 'react-router';
import { publicUrl } from '../../helpers';
import PlayGround from './PlayGround';
import Sessions from '../pages/Sessions';
import Instructors from '../pages/Instructors';
import Profile from '../pages/Profile';
import Calendar from '../pages/Calendar';
import Help from '../pages/Help';

const Routes = () => (
  <Switch>
    <Route exact path={publicUrl('/Instructors')} component={Instructors} />
    <Route exact path={publicUrl('/Profile')} component={Profile} />
    <Route exact path={publicUrl('/Calendar')} component={Calendar} />
    <Route exact path={publicUrl('/Help')} component={Help} />
    <Route exact path={publicUrl('/PlayGround')} component={PlayGround} />
    <Route exact path={publicUrl('/Sessions')} component={Sessions} />
    <Route path={'/'} component={Sessions} />
  </Switch>
);

export default Routes;
