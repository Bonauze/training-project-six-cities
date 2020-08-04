import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from "react-router-dom";
import history from "../../history";

import {Favorites} from './favorites';

import testStore from '../../test-mocks/store';
import NameSpace from '../../reducer/name-space';

const mockStore = configureStore([]);
import {noop} from '../../utils';

it(`Favorites renders correctly`, () => {
  const testMockStore = mockStore(testStore);
  const {favoritesOffers} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <Router history={history}>
          <Favorites
            favoritesOffers={favoritesOffers}
            onLoadFavoritesOffers={noop}
            onRemoveOfferFromFavorite={noop}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
