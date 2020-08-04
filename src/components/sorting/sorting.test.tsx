import React from 'react';
import renderer from 'react-test-renderer';

import NameSpace from '../../reducer/name-space';

import {Sorting} from './sorting';

import testStore from '../../test-mocks/store';
import {noop} from '../../utils';

it(`Sorting renders correctly`, () => {
  const {sortingType} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Sorting
        isOpen={false}
        sortingType={sortingType}
        onOpeningClick={noop}
        onSelectClick={noop}
        onChangeSortingType={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
