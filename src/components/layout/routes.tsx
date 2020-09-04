import * as React from 'react';
import { Route, Switch } from 'react-router';
import { publicUrl } from '../../helpers';
import PlayGround from './PlayGround';
import Home from '../pages/Home';

const Routes = () => (
  <Switch>
    <Route exact path={'/'} component={Home} />
    <Route exact path={publicUrl('/')} component={Home} />
    <Route exact path={publicUrl('/PlayGround')} component={PlayGround} />
  </Switch>
);

export default Routes;
