import React from 'react';
import renderer from 'react-test-renderer';

import NameSpace from '../../reducer/name-space';

import {CitiesList} from './cities-list';

import testStore from '../../test-mocks/store';
import {noop} from '../../utils';

it(`CitiesList renders correctly`, () => {
  const {cities, currentCity} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <CitiesList
        cities={cities}
        currentCity={currentCity}
        onChangeCity={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
