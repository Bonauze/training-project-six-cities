import React from 'react';
import renderer from 'react-test-renderer';

import withOpeningState from './with-opening-state';

const MockComponent = () => {
  return <div />;
};

const MockComponentWrapped = withOpeningState(MockComponent);

it(`withOpeningState renders correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
