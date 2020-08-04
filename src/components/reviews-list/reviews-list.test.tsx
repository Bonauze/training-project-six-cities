import React from 'react';
import renderer from 'react-test-renderer';

import NameSpace from '../../reducer/name-space';

import ReviewsList from './reviews-list';

import testStore from '../../test-mocks/store';

it(`ReviewsList renders correctly`, () => {
  const {reviews} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <ReviewsList
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
