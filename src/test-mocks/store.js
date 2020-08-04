import offers from './offers';
import favoritesOffers from './favorites-offers';
import currentCityOffers from './current-city-offers';
import reviews from './reviews';

import NameSpace from '../reducer/name-space';
import {AuthorizationStatuses, SortingTypes} from '../types';

export default {
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatuses.NO_AUTH,
  },
  [NameSpace.OFFERS]: {
    offers,
    cities: [`Brussels`, `Paris`],
    currentCity: `Brussels`,
    currentCityOffers,
    sortingType: SortingTypes.POPULAR,
    activeOffer: offers[0],
    mouseEnterOfferId: null,
    reviews,
    favoritesOffers,
    authInfo: {
      id: 1,
      email: `admin@gmail.com`,
      name: `Bob`,
      avatarUrl: `https://b1.filmpro.ru/c/444776.700xp.jpg`,
      isPro: true,
    }
  },
};
