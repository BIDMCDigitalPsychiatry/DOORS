import * as React from 'react';
import { Route, Switch } from 'react-router';
import { publicUrl } from '../../helpers';
import PlayGround from './PlayGround';
import Instructors from '../pages/Instructors';
import Profile from '../pages/Profile/Profile';
import Calendar from '../pages/Calendar';
import Classes from '../pages/Class/Classes/Classes';
import ClassDashboard from '../pages/Class/ClassDashboard/ClassDashboard';
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
import ForgotPassword from './ForgotPassword';
import { useHandleChangeRoute, useUserEmail } from './hooks';
import { useUserType } from '../../hooks';
import AccessDenied from '../pages/AccessDenied';
import ClassReport from '../pages/Class/ClassReport/ClassReport';
import InstructorClasses from '../pages/Class/Classes/InstructorClasses'; 

const ForgotPasswordRoute = () => {
  const email = useUserEmail();
  const changeRoute = useHandleChangeRoute();
  return <ForgotPassword email={email} onBack={changeRoute('/Profile')} onSuccess={changeRoute('/Profile')} />;
};

const ProtectedRoute = ({ userTypes = [], ...other }) => {
  const userType = useUserType();
  const denied = userTypes.length > 0 && !userTypes.includes(userType) ? true : false;
  return denied ? <AccessDenied /> : <Route {...other} />;
};

const Routes = () => (
  <Switch>
    <ProtectedRoute userTypes={['Admin']} exact path={publicUrl('/PlayGround')} component={PlayGround} />
    <ProtectedRoute userTypes={['Admin']} exact path={publicUrl('/Instructors')} component={Instructors} />
    <ProtectedRoute userTypes={['Instructor', 'Admin']} exact path={publicUrl('/StyleGuide')} component={StyleGuide} />
    <ProtectedRoute userTypes={['Instructor', 'Admin']} exact path={publicUrl('/CreateClass')} component={CreateClass} />
    <ProtectedRoute userTypes={['Instructor', 'Admin']} exact path={publicUrl('/ClassMaterials')} component={ClassMaterials} />
    <ProtectedRoute userTypes={['Instructor', 'Admin']} exact path={publicUrl('/ClassDashboard')} component={ClassDashboard} />
    <ProtectedRoute userTypes={['Instructor', 'Admin']} exact path={publicUrl('/ClassRoster')} component={ClassRoster} />
    <ProtectedRoute userTypes={['Instructor', 'Admin']} exact path={publicUrl('/ClassReport')} component={ClassReport} />
    <ProtectedRoute userTypes={['Admin']} exact path={publicUrl('/InstructorClasses')} component={InstructorClasses} />
    <Route exact path={publicUrl('/TermsAndConditions')} component={TermsAndConditions} />
    <Route exact path={publicUrl('/Profile')} component={Profile} />
    <Route exact path={publicUrl('/Calendar')} component={Calendar} />
    <Route exact path={publicUrl('/Classes')} component={Classes} />
    <ProtectedRoute exact path={publicUrl('/Lesson')} component={Lesson} />
    <ProtectedRoute exact path={publicUrl('/Pre-Survey')} component={PreSurvey} />
    <ProtectedRoute exact path={publicUrl('/Post-Survey')} component={PostSurvey} />
    <ProtectedRoute exact path={publicUrl('/Resources')} component={Resources} />
    <ProtectedRoute exact path={publicUrl('/Congratulations')} component={Congratulations} />
    <ProtectedRoute exact path={publicUrl('/ForgotPassword')} component={ForgotPasswordRoute} />
    <Route path={'/'} component={Classes} />
  </Switch>
);

export default Routes;
