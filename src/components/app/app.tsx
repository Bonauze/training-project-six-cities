import React, {PureComponent} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import history from '../../history';

import PrivateRoute from '../private-route/private-route';

import Main from '../main/main';
import NotFound from '../not-found/not-found';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';

import withHandleAuthForm from '../../hocs/with-handle-auth-form/with-handle-auth-form';

const SignInWrapped = withHandleAuthForm(SignIn);

import {Operation as UserOperation} from '../../reducer/user/user';
import {Operation as OffersOperation} from '../../reducer/offers/offers';

import {getCurrentCity, getOffers} from '../../reducer/offers/selectors';
import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AppRoute} from '../../constants';

import {Offer as OfferInterface, AuthorizationStatuses} from '../../types';

interface Props {
  authorizationStatus: AuthorizationStatuses;
  currentCity: string;
  offers: OfferInterface[];
  onCheckAuth: () => void;
  onLoadOffers: () => void;
}

class App extends PureComponent<Props> {
  componentDidMount() {
    const {onCheckAuth, onLoadOffers} = this.props;

    onCheckAuth();
    onLoadOffers();
  }

  render() {
    const {authorizationStatus, offers} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={AppRoute.ROOT}
            render={() => {
              return <Main />;
            }}
          />

          <Route
            exact
            path={AppRoute.LOGIN}
            render={() => {
              switch (authorizationStatus) {
                case AuthorizationStatuses.AUTH:
                  return <Redirect to={AppRoute.ROOT} />;
                case AuthorizationStatuses.NO_AUTH:
                  return <SignInWrapped />;
                case AuthorizationStatuses.UNKNOWN:
                  return null;
                default:
                  throw new Error(`Unknown Authorization Status: ${authorizationStatus}!`);
              }
            }}
          />

          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return <Favorites />;
            }}
          />

          <Route
            exact
            path={`${AppRoute.OFFER}/:id`}
            render={(props) => {
              const activeOfferId = Number(props.match.params.id);
              const activeOffer = offers.find((currentCityOffer: OfferInterface) => currentCityOffer.id === activeOfferId);

              if (activeOffer) {
                return <Offer activeOffer={activeOffer} />;
              }
              return <NotFound />;
            }}
          />

          <Route
            render={() => {
              return <NotFound />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  currentCity: getCurrentCity(state),
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckAuth() {
    dispatch(UserOperation.checkAuth());
  },
  onLoadOffers() {
    dispatch(OffersOperation.loadOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
