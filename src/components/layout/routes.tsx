import * as React from 'react';
import { Route, Switch } from 'react-router';
import { publicUrl } from '../../helpers';
import PlayGround from './PlayGround';
import Instructors from '../pages/Instructors';
import Profile from '../pages/Profile/Profile';
import Calendar from '../pages/Calendar';
import Sessions from '../pages/Session/Sessions';
import Session from '../pages/Session/Session';
import SessionDashboard from '../pages/Session/SessionDashboard';
import SessionClass from '../pages/Session/SessionClass';
import SessionMaterials from '../pages/Session/SessionMaterials';
import SessionMembers from '../pages/Session/SessionMembers';
import TermsAndConditions from '../pages/TermsAndConditions';

const Routes = () => (
  <Switch>
    <Route exact path={publicUrl('/TermsAndConditions')} component={TermsAndConditions} />
    <Route exact path={publicUrl('/Instructors')} component={Instructors} />
    <Route exact path={publicUrl('/Profile')} component={Profile} />
    <Route exact path={publicUrl('/Calendar')} component={Calendar} />
    <Route exact path={publicUrl('/PlayGround')} component={PlayGround} />
    <Route exact path={publicUrl('/Sessions')} component={Sessions} />
    <Route exact path={publicUrl('/Session')} component={Session} />
    <Route exact path={publicUrl('/SessionDashboard')} component={SessionDashboard} />
    <Route exact path={publicUrl('/SessionClass')} component={SessionClass} />
    <Route exact path={publicUrl('/SessionMaterials')} component={SessionMaterials} />
    <Route exact path={publicUrl('/SessionMembers')} component={SessionMembers} />

    <Route path={'/'} component={Sessions} />
  </Switch>
);

export default Routes;
