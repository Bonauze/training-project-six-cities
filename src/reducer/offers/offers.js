import {
  extend,
  removeFavoriteOffer,
  updateOffers,
  sortReviews,
} from '../../utils';

import {SortingTypes} from '../../types';

import {createOffer, createReview, createFavoriteOffers} from '../../adapters';

const initialState = {
  offers: [],
  offersNearby: [],
  favoritesOffers: [],
  reviews: [],
  currentCity: ``,
  sortingType: SortingTypes.POPULAR,
  mouseEnterOfferId: null,
};

const ActionType = {
  SET_OFFERS: `SET_OFFERS`,
  SET_OFFERS_NEARBY: `SET_OFFERS_NEARBY`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
  SET_OFFER_REVIEWS: `SET_OFFER_REVIEWS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  UPDATE_OFFERS_NEARBY: `UPDATE_OFFERS_NEARBY`,
  CHANGE_CURRENT_CITY: `CHANGE_CURRENT_CITY`,
  CHANGE_SORTING_TYPE: `CHANGE_SORTING_TYPE`,
  CHANGE_MOUSE_ENTER_OFFER_ID: `CHANGE_MOUSE_ENTER_OFFER_ID`,
  DELETE_FAVORITE_OFFER: `DELETE_FAVORITE_OFFER`,
};

const ActionCreator = {
  setOffers: (offers) => ({
    type: ActionType.SET_OFFERS,
    payload: offers,
  }),
  setOffersNearby: (offersNearby) => ({
    type: ActionType.SET_OFFERS_NEARBY,
    payload: offersNearby,
  }),
  setFavoriteOffers: (favoriteOffers) => ({
    type: ActionType.SET_FAVORITE_OFFERS,
    payload: favoriteOffers,
  }),
  setOfferReviews: (offerReviews) => ({
    type: ActionType.SET_OFFER_REVIEWS,
    payload: offerReviews,
  }),
  updateOffers: (updatedOffer) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: updatedOffer,
  }),
  updateOffersNearby: (updatedOfferNearby) => ({
    type: ActionType.UPDATE_OFFERS_NEARBY,
    payload: updatedOfferNearby,
  }),
  changeCurrentCity: (currentCity) => ({
    type: ActionType.CHANGE_CURRENT_CITY,
    payload: currentCity,
  }),
  changeSortingType: (sortingType) => ({
    type: ActionType.CHANGE_SORTING_TYPE,
    payload: sortingType,
  }),
  changeMouseEnterOfferId: (offerId) => ({
    type: ActionType.CHANGE_MOUSE_ENTER_OFFER_ID,
    payload: offerId,
  }),
  deleteFavoriteOffer: (offerId) => ({
    type: ActionType.DELETE_FAVORITE_OFFER,
    payload: offerId,
  }),
};

const showError = (errorText) => {
  // eslint-disable-next-line no-alert
  alert(`${errorText} Please try again.`);
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
    .then((response) => {
      const convertedOffers = response.data.map(createOffer);
      const defaultCurrentCity = convertedOffers[0].city.name;

      dispatch(ActionCreator.setOffers(convertedOffers));
      dispatch(ActionCreator.changeCurrentCity(defaultCurrentCity));
    })
    .catch((error) => {
      showError(`Failed suggestion.`);
      throw error;
    });
  },
  loadOffersNearby: (offerId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
    .then((response) => {
      const offersNearby = response.data.map(createOffer);

      dispatch(ActionCreator.setOffersNearby(offersNearby));
    })
    .catch((error) => {
      showError(`Failed to load offers nearby.`);
      throw error;
    });
  },
  loadFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      const editedOffers = response.data.map(createOffer);
      const favoritesOffers = createFavoriteOffers(editedOffers);

      dispatch(ActionCreator.setFavoriteOffers(favoritesOffers));
    })
    .catch((error) => {
      showError(`Failed to load featured offers.`);
      throw error;
    });
  },
  loadOfferReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
    .then((response) => {
      const reviews = response.data.map(createReview);

      dispatch(ActionCreator.setOfferReviews(reviews));
    })
    .catch((error) => {
      showError(`Failed to load reviews.`);
      throw error;
    });
  },
  sendNewReview: (offerId, data) => (dispatch, getState, api) => {
    return api.post(`/comments/${offerId}`, {
      comment: data.comment,
      rating: data.rating,
    })
    .catch((error) => {
      showError(`Failed to send review.`);
      throw error;
    });
  },
  addOfferToFavorite: (offerId, isPlaceNearby) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/1`)
    .then((response) => {
      const editedOffer = createOffer(response.data);

      if (isPlaceNearby) {
        dispatch(ActionCreator.updateOffersNearby(editedOffer));
      } else {
        dispatch(ActionCreator.updateOffers(editedOffer));
      }
    })
    .catch((error) => {
      showError(`Failed to add offer to favorites.`);
      throw error;
    });
  },
  removeOfferFromFavorite: (offerId, isPlaceNearby) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/0`)
    .then((response) => {
      const editedOffer = createOffer(response.data);

      if (isPlaceNearby) {
        dispatch(ActionCreator.updateOffersNearby(editedOffer));
      } else {
        dispatch(ActionCreator.updateOffers(editedOffer));
      }

      dispatch(ActionCreator.deleteFavoriteOffer(offerId));
    })
    .catch((error) => {
      showError(`Failed to delete favorite offer.`);
      throw error;
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.SET_OFFERS_NEARBY:
      return extend(state, {
        offersNearby: action.payload,
      });
    case ActionType.SET_FAVORITE_OFFERS:
      return extend(state, {
        favoritesOffers: action.payload,
      });
    case ActionType.SET_OFFER_REVIEWS:
      return extend(state, {
        reviews: sortReviews(action.payload),
      });
    case ActionType.UPDATE_OFFERS:
      return extend(state, {
        offers: updateOffers(state.offers, action.payload),
      });
    case ActionType.UPDATE_OFFERS_NEARBY:
      return extend(state, {
        offersNearby: updateOffers(state.offersNearby, action.payload),
      });
    case ActionType.CHANGE_CURRENT_CITY:
      return extend(state, {
        currentCity: action.payload,
      });
    case ActionType.CHANGE_SORTING_TYPE:
      return extend(state, {
        sortingType: action.payload,
      });
    case ActionType.CHANGE_MOUSE_ENTER_OFFER_ID:
      return extend(state, {
        mouseEnterOfferId: action.payload,
      });
    case ActionType.DELETE_FAVORITE_OFFER:
      return extend(state, {
        favoritesOffers: removeFavoriteOffer(state.favoritesOffers, action.payload),
      });
    default:
      return state;
  }
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
