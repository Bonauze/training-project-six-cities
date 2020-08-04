import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from "react-router-dom";
import history from "../../history";

import NameSpace from '../../reducer/name-space';

import {Main} from './main';

import testStore from '../../test-mocks/store';

const mockStore = configureStore([]);

it(`Main renders correctly`, () => {
  const testMockStore = mockStore(testStore);
  const {currentCity, currentCityOffers} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <Router history={history}>
          <Main
            currentCity={currentCity}
            currentCityOffers={currentCityOffers}
            offersCoordinates={{
              centerCoordinates: [48.85661, 2.351499],
              markersCoordinates: [{
                coordinates: [48.83961, 2.342499],
                id: 70,
              }],
              zoom: 13,
            }}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
