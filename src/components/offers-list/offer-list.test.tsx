import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';
import history from '../../history';

import NameSpace from '../../reducer/name-space';

import OfferList from './offers-list';

import testStore from '../../test-mocks/store';

const mockStore = configureStore([]);

it(`OfferList renders correctly`, () => {
  const testMockStore = mockStore(testStore);
  const {offers} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <Router history={history}>
          <OfferList
            offers={offers}
            isPlaceNearby={false}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
