import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getAuthorizationStatus, getAuthInfo} from '../../reducer/user/selectors';

import {AppRoute} from '../../constants';

import {AuthInfo as AuthInfoInterface, AuthorizationStatuses} from '../../types';

interface Props {
  authorizationStatus: AuthorizationStatuses;
  authInfo: AuthInfoInterface;
}

const renderAuth = (authorizationStatus, authInfo) => {
  switch (authorizationStatus) {
    case AuthorizationStatuses.AUTH:
      return (
        <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" />
          <span className="header__user-name user__name">{authInfo.email}</span>
        </Link>
      );
    case AuthorizationStatuses.NO_AUTH:
      return (
        <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" />
          <span className="header__login">Sign in</span>
        </Link>
      );
    case AuthorizationStatuses.UNKNOWN:
      return null;
    default:
      throw new Error(`Unknown Authorization Status: ${authorizationStatus}!`);
  }
};

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, authInfo} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {renderAuth(authorizationStatus, authInfo)}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authInfo: getAuthInfo(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
