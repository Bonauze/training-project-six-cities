import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NameSpace from '../../reducer/name-space';

import {CitiesList} from './cities-list';

Enzyme.configure({adapter: new Adapter()});

import testStore from '../../test-mocks/store';

it(`Should city links be clicked 2 times`, () => {
  const onChangeCityClick = jest.fn();
  const {cities, currentCity} = testStore[NameSpace.OFFERS];

  const citiesList = shallow(
      <CitiesList
        cities={cities}
        currentCity={currentCity}
        onChangeCity={onChangeCityClick}
      />
  );

  citiesList.find(`.locations__item-link:not(.tabs__item--active)`).forEach((link) => {
    link.simulate(`click`);
  });

  expect(onChangeCityClick).toHaveBeenCalledTimes(cities.length - 1);
});
