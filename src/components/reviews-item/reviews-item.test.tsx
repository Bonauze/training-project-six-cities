import React from 'react';
import renderer from 'react-test-renderer';

import NameSpace from '../../reducer/name-space';

import ReviewsItem from './reviews-item';

import testStore from '../../test-mocks/store';

it(`ReviewsItem renders correctly`, () => {
  const {reviews} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <ReviewsItem
        {...reviews[0]}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
