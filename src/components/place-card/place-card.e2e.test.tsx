import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Router} from 'react-router-dom';
import history from '../../history';

import NameSpace from '../../reducer/name-space';
import {AuthorizationStatuses} from '../../types';

import {PlaceCard} from './place-card';

Enzyme.configure({adapter: new Adapter()});

import testStore from '../../test-mocks/store';
import {noop} from '../../utils';

it(`Data passed to callback is consistent with user answer`, () => {
  const onMouseEnter = jest.fn();
  const {offers} = testStore[NameSpace.OFFERS];

  const placeCard = shallow(
      <Router history={history}>
        <PlaceCard
          offer={offers[0]}
          isPlaceNearby={false}
          onOfferMouseEnter={onMouseEnter}
          onAddOfferToFavorite={noop}
          onRemoveOfferFromFavorite={noop}
          authorizationStatus={AuthorizationStatuses.NO_AUTH}
        />
      </Router>
  ).childAt(0).dive();

  placeCard.find(`.place-card`).simulate(`mouseEnter`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
  expect(onMouseEnter.mock.calls[0][0]).toBe(offers[0].id);
});
