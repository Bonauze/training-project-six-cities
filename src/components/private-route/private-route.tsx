import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AuthorizationStatuses} from '../../types';

import {AppRoute} from '../../constants';

interface Props extends RouteProps {
  authorizationStatus: AuthorizationStatuses;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, path, exact, render} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        switch (authorizationStatus) {
          case AuthorizationStatuses.AUTH:
            return render();
          case AuthorizationStatuses.NO_AUTH:
            return <Redirect to={AppRoute.LOGIN} />;
          case AuthorizationStatuses.UNKNOWN:
            return null;
          default:
            throw new Error(`Unknown Authorization Status: ${authorizationStatus}!`);
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);

