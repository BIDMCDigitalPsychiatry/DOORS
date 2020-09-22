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
import StyleGuide from '../pages/StyleGuide';
import PostSurvey from '../pages/Class/PostSurvey';
import PreSurvey from '../pages/Class/PreSurvey';
import Lesson from '../pages/Class/Lesson';
import Resources from '../pages/Class/Resources';
import Congratulations from '../pages/Class/Congratulations';
import CreateSession from '../pages/Session/CreateSession';

const Routes = () => (
  <Switch>
    <Route exact path={publicUrl('/StyleGuide')} component={StyleGuide} />
    <Route exact path={publicUrl('/TermsAndConditions')} component={TermsAndConditions} />
    <Route exact path={publicUrl('/Instructors')} component={Instructors} />
    <Route exact path={publicUrl('/Profile')} component={Profile} />
    <Route exact path={publicUrl('/Calendar')} component={Calendar} />
    <Route exact path={publicUrl('/PlayGround')} component={PlayGround} />
    <Route exact path={publicUrl('/Sessions')} component={Sessions} />
    <Route exact path={publicUrl('/Session')} component={Session} />
    <Route exact path={publicUrl('/CreateSession')} component={CreateSession} />
    <Route exact path={publicUrl('/SessionDashboard')} component={SessionDashboard} />
    <Route exact path={publicUrl('/SessionClass')} component={SessionClass} />
    <Route exact path={publicUrl('/SessionMaterials')} component={SessionMaterials} />
    <Route exact path={publicUrl('/SessionMembers')} component={SessionMembers} />
    <Route exact path={publicUrl('/Lesson')} component={Lesson} />
    <Route exact path={publicUrl('/Pre-Survey')} component={PreSurvey} />
    <Route exact path={publicUrl('/Post-Survey')} component={PostSurvey} />
    <Route exact path={publicUrl('/Resources')} component={Resources} />
    <Route exact path={publicUrl('/Congratulations')} component={Congratulations} />

    <Route path={'/'} component={Sessions} />
  </Switch>
);

export default Routes;
