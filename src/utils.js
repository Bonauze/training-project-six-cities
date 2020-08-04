import {SortingTypes} from './types';

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const getUniqueCities = (offers) => {
  return offers.reduce((cities, {city}) => {
    if (cities.includes(city.name)) {
      return cities;
    }
    return [...cities, city.name];
  }, []);
};

const getOffersByCity = (offers, city) => {
  return offers.reduce((currentCityOffers, offer) => {
    if (offer.city.name === city) {
      return [...currentCityOffers, offer];
    }
    return currentCityOffers;
  }, []);
};

const sortOffers = (offers, sortingType) => {
  const offersCopy = offers.slice();

  switch (sortingType) {
    case SortingTypes.POPULAR:
      return offersCopy;
    case SortingTypes.PRICE_LOW_TO_HIGH:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortingTypes.PRICE_HIGH_TO_LOW:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortingTypes.TOP_RATED_FIRST:
      return offersCopy.sort((a, b) => b.rating - a.rating);
    default:
      return offersCopy;
  }
};

const sortReviews = (reviews) => {
  const reviewsCopy = reviews.slice();

  return reviewsCopy.sort((a, b) => (
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ));
};

const updateOffers = (offers, editedOffer) => {
  return offers.map((offer) => {
    if (offer.id === editedOffer.id) {
      return editedOffer;
    }
    return offer;
  });
};

const removeFavoriteOffer = (favoriteOffers, offerId) => {
  return favoriteOffers.reduce((newFavoriteOffers, item) => {
    const newOffers = item.offers.filter((offer) => offer.id !== offerId);

    if (newOffers.length !== 0) {
      return [
        ...newFavoriteOffers,
        {cityName: item.cityName, offers: newOffers}
      ];
    }
    return newFavoriteOffers;
  }, []);
};

const noop = () => {
  // do nothing
};

export {
  extend,
  getUniqueCities,
  getOffersByCity,
  sortOffers,
  sortReviews,
  updateOffers,
  removeFavoriteOffer,
  noop,
};
