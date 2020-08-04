import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Sorting} from './sorting';

import {SortingTypes} from '../../types';
import {noop} from '../../utils';

Enzyme.configure({adapter: new Adapter()});

it(`Should sorting option be pressed 2 times`, () => {
  const onChangeSortingType = jest.fn();

  const sorting = shallow(
      <Sorting
        isOpen={false}
        sortingType={SortingTypes.PRICE_HIGH_TO_LOW}
        onOpeningClick={noop}
        onSelectClick={noop}
        onChangeSortingType={onChangeSortingType}
      />
  );

  const options = sorting.find(`.places__option`);

  sorting.find(`.places__sorting-type`).simulate(`click`);
  options.at(0).simulate(`click`);
  options.at(1).simulate(`click`);

  expect(onChangeSortingType).toHaveBeenCalledTimes(2);
});
