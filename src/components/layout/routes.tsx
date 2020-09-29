import * as React from 'react';
import { Route, Switch } from 'react-router';
import { publicUrl } from '../../helpers';
import PlayGround from './PlayGround';
import Instructors from '../pages/Instructors';
import Profile from '../pages/Profile/Profile';
import Calendar from '../pages/Calendar';
import Classes from '../pages/Class/Classes';
import Class from '../pages/Class/Class';
import ClassDashboard from '../pages/Class/ClassDashboard';
import SessionClass from '../pages/Class/SessionClass';
import ClassMaterials from '../pages/Class/ClassMaterials';
import ClassRoster from '../pages/Class/ClassRoster';
import TermsAndConditions from '../pages/TermsAndConditions';
import StyleGuide from '../pages/StyleGuide';
import PostSurvey from '../pages/Class/PostSurvey';
import PreSurvey from '../pages/Class/PreSurvey';
import Lesson from '../pages/Class/Lesson';
import Resources from '../pages/Class/Resources';
import Congratulations from '../pages/Class/Congratulations';
import CreateClass from '../pages/Class/CreateClass';

const Routes = () => (
  <Switch>
    <Route exact path={publicUrl('/StyleGuide')} component={StyleGuide} />
    <Route exact path={publicUrl('/TermsAndConditions')} component={TermsAndConditions} />
    <Route exact path={publicUrl('/Instructors')} component={Instructors} />
    <Route exact path={publicUrl('/Profile')} component={Profile} />
    <Route exact path={publicUrl('/Calendar')} component={Calendar} />
    <Route exact path={publicUrl('/PlayGround')} component={PlayGround} />
    <Route exact path={publicUrl('/Classes')} component={Classes} />
    <Route exact path={publicUrl('/Class')} component={Class} />
    <Route exact path={publicUrl('/CreateClass')} component={CreateClass} />
    <Route exact path={publicUrl('/ClassDashboard')} component={ClassDashboard} />
    <Route exact path={publicUrl('/SessionClass')} component={SessionClass} />
    <Route exact path={publicUrl('/ClassMaterials')} component={ClassMaterials} />
    <Route exact path={publicUrl('/ClassRoster')} component={ClassRoster} />
    <Route exact path={publicUrl('/Lesson')} component={Lesson} />
    <Route exact path={publicUrl('/Pre-Survey')} component={PreSurvey} />
    <Route exact path={publicUrl('/Post-Survey')} component={PostSurvey} />
    <Route exact path={publicUrl('/Resources')} component={Resources} />
    <Route exact path={publicUrl('/Congratulations')} component={Congratulations} />

    <Route path={'/'} component={Classes} />
  </Switch>
);

export default Routes;
