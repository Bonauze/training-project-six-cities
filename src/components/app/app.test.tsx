import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from "react-router-dom";
import history from "../../history";

import NameSpace from '../../reducer/name-space';
import {AuthorizationStatuses} from '../../types';

import {App} from './app';

import testStore from '../../test-mocks/store';
import {noop} from '../../utils';

const mockStore = configureStore([]);

it(`App renders correctly`, () => {
  const testMockStore = mockStore(testStore);
  const {currentCity, offers} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <Router history={history}>
          <App
            authorizationStatus={AuthorizationStatuses.NO_AUTH}
            currentCity={currentCity}
            offers={offers}
            onCheckAuth={noop}
            onLoadOffers={noop}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
