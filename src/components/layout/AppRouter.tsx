import * as React from 'react';
import Routes from './routes';
import { ConnectedRouter } from 'connected-react-router';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import Layout from './Layout';
import AuthGate from './AuthGate';
import InviteGate from './InviteGate';
import UserTypeGate from './UserTypeGate';
import ProfileGate from './ProfileGate';

export interface AppRouterProps {
  history?: any;
}

function AppRouter(props: AppRouterProps) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <AuthGate>
        <InviteGate>
          <UserTypeGate>
            <ProfileGate>
              <Layout>
                <Routes />
              </Layout>
            </ProfileGate>
          </UserTypeGate>
        </InviteGate>
      </AuthGate>
    </ConnectedRouter>
  );
}

const mapStateToProps = (state: AppState, ownProp: AppRouterProps): AppRouterProps => {
  var history = ownProp.history;
  const location = state && state.router && state.router.location; //location from redux store (previously persisted location)
  history.location = location ? location : history.location; //if a previous location exists, then set it, otherwise use the passed in/default value
  return { history };
};

export default connect(mapStateToProps)(AppRouter);
