import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from "react-router-dom";
import history from "../../history";

import NameSpace from '../../reducer/name-space';
import {AuthorizationStatuses} from '../../types';

import {Offer} from './offer';

import testStore from '../../test-mocks/store';
import offers from '../../test-mocks/offers';

const mockStore = configureStore([]);
import {noop} from '../../utils';

it(`Offer renders correctly`, () => {
  const testMockStore = mockStore(testStore);
  const authorizationStatus = AuthorizationStatuses.AUTH;
  const {activeOffer, reviews} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <Router history={history}>
          <Offer
            authorizationStatus={authorizationStatus}
            activeOffer={activeOffer}
            reviews={reviews}
            offersNearby={offers}
            offersNearbyCoordinates={{
              centerCoordinates: [48.85661, 2.351499],
              markersCoordinates: [{
                coordinates: [48.83961, 2.342499],
                id: 70,
              }],
              zoom: 13,
            }}
            onLoadReviews={noop}
            onLoadOffersNearby={noop}
            onAddOfferToFavorite={noop}
            onRemoveOfferFromFavorite={noop}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
