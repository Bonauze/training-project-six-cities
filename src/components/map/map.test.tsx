import React from 'react';
import renderer from 'react-test-renderer';

import {Map} from './map';

import offers from './../../test-mocks/offers';
const offersCoordinates = offers.map(({id, location}) => {
  return {
    id,
    coordinates: [location.latitude, location.longitude],
  };
});

it(`Map renders correctly`, () => {
  const tree = renderer.create(
      <Map
        centerCoordinates={[52.38333, 4.9]}
        zoom={12}
        markersCoordinates={offersCoordinates}
        activeCoordinatesId={1}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
