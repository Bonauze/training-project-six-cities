import React from 'react';
import {Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import history from '../../history';

import NameSpace from '../../reducer/name-space';
import {AuthorizationStatuses} from '../../types';

import {PlaceCard} from './place-card';

import testStore from '../../test-mocks/store';
import {noop} from '../../utils';

it(`PlaceCard renders correctly`, () => {
  const {offers} = testStore[NameSpace.OFFERS];

  const tree = renderer.create(
      <Router history={history}>
        <PlaceCard
          offer={offers[0]}
          isPlaceNearby={false}
          onOfferMouseEnter={noop}
          onAddOfferToFavorite={noop}
          onRemoveOfferFromFavorite={noop}
          authorizationStatus={AuthorizationStatuses.NO_AUTH}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
