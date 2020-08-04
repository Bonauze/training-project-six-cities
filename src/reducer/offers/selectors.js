import {createSelector} from 'reselect';

import NameSpace from '../name-space';
import {getOffersByCity, getUniqueCities, sortOffers} from '../../utils';

const NAME_SPACE = NameSpace.OFFERS;

const getOffers = (state) => state[NAME_SPACE].offers;
const getOffersNearby = (state) => state[NAME_SPACE].offersNearby;
const getCurrentCity = (state) => state[NAME_SPACE].currentCity;
const getSortingType = (state) => state[NAME_SPACE].sortingType;
const getMouseEnterOfferId = (state) => state[NAME_SPACE].mouseEnterOfferId;
const getReviews = (state) => state[NAME_SPACE].reviews;
const getFavoritesOffers = (state) => state[NAME_SPACE].favoritesOffers;

const createOffersCoordinates = (offers) => {
  if (offers.length === 0) {
    return null;
  }

  const {latitude, longitude, zoom} = offers[0].city.location;

  return {
    centerCoordinates: [latitude, longitude],
    zoom,
    markersCoordinates: offers.map(({id, location}) => {
      return {id, coordinates: [location.latitude, location.longitude]};
    }),
  };
};

const getCurrentCityOffers = createSelector(
    getOffers,
    getCurrentCity,
    getSortingType,
    (offers, currentCity, sortingType) => {
      if (offers.length && currentCity) {
        const currentCityOffers = getOffersByCity(offers, currentCity);
        return sortOffers(currentCityOffers, sortingType);
      }
      return [];
    }
);

const getOffersCoordinates = createSelector(
    getCurrentCityOffers,
    createOffersCoordinates
);

const getOffersNearbyCoordinates = createSelector(
    getOffersNearby,
    createOffersCoordinates
);

const getCities = createSelector(
    getOffers,
    (offers) => {
      return getUniqueCities(offers);
    }
);

export {
  getOffers,
  getOffersNearby,
  getCities,
  getCurrentCity,
  getSortingType,
  getCurrentCityOffers,
  getMouseEnterOfferId,
  getReviews,
  getFavoritesOffers,
  getOffersCoordinates,
  getOffersNearbyCoordinates,
};
