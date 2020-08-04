import MockAdapter from 'axios-mock-adapter';

import {reducer, ActionCreator, ActionType, Operation} from './offers';

import {createAPI} from '../../api';

import {SortingTypes} from '../../types';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      offers: [],
      offersNearby: [],
      favoritesOffers: [],
      reviews: [],
      currentCity: ``,
      sortingType: SortingTypes.POPULAR,
      mouseEnterOfferId: null,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should load offers`, () => {
    const state = {
      offers: [],
    };

    expect(reducer(state, {
      type: ActionType.SET_OFFERS,
      payload: [{id: 1}, {id: 2}],
    })).toEqual({
      offers: [{id: 1}, {id: 2}],
    });
  });

  it(`Reducer should load offers nearby`, () => {
    const state = {
      offersNearby: [],
    };

    expect(reducer(state, {
      type: ActionType.SET_OFFERS_NEARBY,
      payload: [{id: 1}, {id: 2}],
    })).toEqual({
      offersNearby: [{id: 1}, {id: 2}],
    });
  });

  it(`Reducer should load reviews`, () => {
    const state = {
      reviews: [],
    };

    expect(reducer(state, {
      type: ActionType.SET_OFFER_REVIEWS,
      payload: [{id: 1}],
    })).toEqual({
      reviews: [{id: 1}],
    });
  });

  it(`Reducer should load favorites`, () => {
    const state = {
      favoritesOffers: [],
    };

    expect(reducer(state, {
      type: ActionType.SET_FAVORITE_OFFERS,
      payload: [{id: 1}],
    })).toEqual({
      favoritesOffers: [{id: 1}],
    });
  });

  it(`Reducer should update offer`, () => {
    const state = {
      offers: [
        {id: 2, title: 'Lorem 1'},
        {id: 3, title: 'Lorem 2'},
      ],
    };

    expect(reducer(state, {
      type: ActionType.UPDATE_OFFERS,
      payload: {id: 3, title: 'Lorem 100'},
    })).toEqual({
      offers: [
        {id: 2, title: 'Lorem 1'},
        {id: 3, title: 'Lorem 100'},
      ],
    });
  });

  it(`Reducer should change current city`, () => {
    const state = {
      currentCity: `Roma`,
    };

    expect(reducer(state, {
      type: ActionType.CHANGE_CURRENT_CITY,
      payload: `Paris`,
    })).toEqual({
      currentCity: `Paris`,
    });
  });

  it(`Reducer should change sorting type`, () => {
    const state = {
      sortingType: SortingTypes.POPULAR,
    };

    expect(reducer(state, {
      type: ActionType.CHANGE_SORTING_TYPE,
      payload: SortingTypes.PRICE_HIGH_TO_LOW,
    })).toEqual({
      sortingType: SortingTypes.PRICE_HIGH_TO_LOW,
    });
  });

  it(`Reducer should change mouse enter offer id`, () => {
    const state = {
      mouseEnterOfferId: null,
    };

    expect(reducer(state, {
      type: ActionType.CHANGE_MOUSE_ENTER_OFFER_ID,
      payload: 23,
    })).toEqual({
      mouseEnterOfferId: 23,
    });
  });

  it(`Reducer should remove favorites offer`, () => {
    const state = {
      favoritesOffers: [
        {
          cityName: `Paris`,
          offers: [{id: 2, title: 'Lorem 1'}, {id: 2, title: 'Lorem 2'}]
        },
        {
          cityName: `Roma`,
          offers: [{id: 3, title: 'Lorem 3'}, {id: 4, title: 'Lorem 4'}]
        }
      ],
    };

    expect(reducer(state, {
      type: ActionType.DELETE_FAVORITE_OFFER,
      payload: 3,
    })).toEqual({
      favoritesOffers: [
        {
          cityName: `Paris`,
          offers: [{id: 2, title: 'Lorem 1'}, {id: 2, title: 'Lorem 2'}]
        },
        {
          cityName: `Roma`,
          offers: [{id: 4, title: 'Lorem 4'}]
        }
      ]
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load offers returns action with sent payload`, () => {
    expect(ActionCreator.setOffers([])).toEqual({
      type: ActionType.SET_OFFERS,
      payload: [],
    });
  });

  it(`Action creator for load offers nearby returns action with sent payload`, () => {
    expect(ActionCreator.setOffersNearby([])).toEqual({
      type: ActionType.SET_OFFERS_NEARBY,
      payload: [],
    });
  });

  it(`Action creator for load reviews returns action with sent payload`, () => {
    expect(ActionCreator.setOfferReviews([])).toEqual({
      type: ActionType.SET_OFFER_REVIEWS,
      payload: [],
    });
  });

  it(`Action creator for load favorites returns action with sent payload`, () => {
    expect(ActionCreator.setFavoriteOffers([])).toEqual({
      type: ActionType.SET_FAVORITE_OFFERS,
      payload: [],
    });
  });

  it(`Action creator for update offer returns action with sent payload`, () => {
    expect(ActionCreator.updateOffers({})).toEqual({
      type: ActionType.UPDATE_OFFERS,
      payload: {},
    });
  });

  it(`Action creator for change current city returns action with sent payload`, () => {
    expect(ActionCreator.changeCurrentCity(`Roma`)).toEqual({
      type: ActionType.CHANGE_CURRENT_CITY,
      payload: `Roma`,
    });
  });

  it(`Action creator for change sorting type returns action with sent payload`, () => {
    expect(ActionCreator.changeSortingType(SortingTypes.TOP_RATED_FIRST)).toEqual({
      type: ActionType.CHANGE_SORTING_TYPE,
      payload: SortingTypes.TOP_RATED_FIRST,
    });
  });

  it(`Action creator for change mouse enter offer id returns action with sent payload`, () => {
    expect(ActionCreator.changeMouseEnterOfferId(1)).toEqual({
      type: ActionType.CHANGE_MOUSE_ENTER_OFFER_ID,
      payload: 1,
    });
  });

  it(`Action creator for remove favorites offer returns action with sent payload`, () => {
    expect(ActionCreator.deleteFavoriteOffer(1)).toEqual({
      type: ActionType.DELETE_FAVORITE_OFFER,
      payload: 1,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /hotels (onGet)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadOffers();

    apiMock
    .onGet(`/hotels`)
    .reply(200, [{
      'city': {
        'name': `Paris`,
        'location': {
          'latitude': 52.3909553943508,
          'longitude': 4.85309666406198,
          'zoom': 16,
        },
      },
      'preview_image': `https://dummyimage.com/260x200/4545454/fff`,
      'images': [
        `https://dummyimage.com/260x200/4545454/fff`,
        `https://dummyimage.com/260x200/464646/bd582c`,
        `https://dummyimage.com/260x200/464646/c09f38`,
      ],
      'title': `Studio at great location`,
      'is_favorite': true,
      'is_premium': true,
      'rating': 4,
      'type': `room`,
      'bedrooms': 3,
      'max_adults': 4,
      'price': 200,
      'goods': [`Heating`, `Kitchen`, `Fridge`],
      'host': {
        'id': 23,
        'name': `Bob`,
        'is_pro': true,
        'avatar_url': `https://dummyimage.com/74x74/000/bd582c`
      },
      'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      },
      'id': 1,
    }]);

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_OFFERS,
        payload: [{
          city: {
            name: `Paris`,
            location: {
              latitude: 52.3909553943508,
              longitude: 4.85309666406198,
              zoom: 16,
            },
          },
          previewImage: `https://dummyimage.com/260x200/4545454/fff`,
          images: [
            `https://dummyimage.com/260x200/4545454/fff`,
            `https://dummyimage.com/260x200/464646/bd582c`,
            `https://dummyimage.com/260x200/464646/c09f38`,
          ],
          title: `Studio at great location`,
          isFavorite: true,
          isPremium: true,
          rating: 4,
          type: `room`,
          bedrooms: 3,
          maxAdults: 4,
          price: 200,
          goods: [`Heating`, `Kitchen`, `Fridge`],
          host: {
            id: 23,
            name: `Bob`,
            isPro: true,
            avatarUrl: `https://dummyimage.com/74x74/000/bd582c`
          },
          description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          location: {
            latitude: 52.369553943508,
            longitude: 4.85309666406198,
            zoom: 16
          },
          id: 1,
        }],
      });
    });
  });

  it(`Should make a correct API call to /comments/:offerId (onGet)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadOfferReviews(421);

    apiMock
    .onGet(`/comments/421`)
    .reply(200, [{
      'id': 1,
      'user': {
        'id': 13,
        'is_pro': false,
        'name': `Zak`,
        'avatar_url': `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/4.jpg`
      },
      'rating': 4,
      'comment': `I stayed here for one night and it was an unpleasant experience.`,
      'date': `2020-07-12T11:12:27.245Z`
    }]);

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_OFFER_REVIEWS,
        payload: [{
          id: 1,
          image: `https://htmlacademy-react-3.appspot.com/six-cities/static/avatar/4.jpg`,
          name: `Zak`,
          rating: 4,
          description: `I stayed here for one night and it was an unpleasant experience.`,
          date: `2020-07-12T11:12:27.245Z`,
        }],
      });
    });
  });

  it(`Should make a correct API call to /hotels/:offerId/nearby (onGet)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadOffersNearby(523);

    apiMock
    .onGet(`/hotels/523/nearby`)
    .reply(200, [{
      'city': {
        'name': `Paris`,
        'location': {
          'latitude': 52.3909553943508,
          'longitude': 4.85309666406198,
          'zoom': 16,
        },
      },
      'preview_image': `https://dummyimage.com/260x200/4545454/fff`,
      'images': [
        `https://dummyimage.com/260x200/4545454/fff`,
        `https://dummyimage.com/260x200/464646/bd582c`,
        `https://dummyimage.com/260x200/464646/c09f38`,
      ],
      'title': `Studio at great location`,
      'is_favorite': true,
      'is_premium': true,
      'rating': 4,
      'type': `room`,
      'bedrooms': 3,
      'max_adults': 4,
      'price': 200,
      'goods': [`Heating`, `Kitchen`, `Fridge`],
      'host': {
        'id': 23,
        'name': `Bob`,
        'is_pro': true,
        'avatar_url': `https://dummyimage.com/74x74/000/bd582c`
      },
      'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      },
      'id': 1,
    }]);

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_OFFERS_NEARBY,
        payload: [{
          city: {
            name: `Paris`,
            location: {
              latitude: 52.3909553943508,
              longitude: 4.85309666406198,
              zoom: 16,
            },
          },
          previewImage: `https://dummyimage.com/260x200/4545454/fff`,
          images: [
            `https://dummyimage.com/260x200/4545454/fff`,
            `https://dummyimage.com/260x200/464646/bd582c`,
            `https://dummyimage.com/260x200/464646/c09f38`,
          ],
          title: `Studio at great location`,
          isFavorite: true,
          isPremium: true,
          rating: 4,
          type: `room`,
          bedrooms: 3,
          maxAdults: 4,
          price: 200,
          goods: [`Heating`, `Kitchen`, `Fridge`],
          host: {
            id: 23,
            name: `Bob`,
            isPro: true,
            avatarUrl: `https://dummyimage.com/74x74/000/bd582c`
          },
          description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          location: {
            latitude: 52.369553943508,
            longitude: 4.85309666406198,
            zoom: 16
          },
          id: 1,
        }],
      });
    });
  });

  it(`Should make a correct API call to /comments/:offerId (onPost)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.sendNewReview(22, {
      comment: `Lorem 500`,
      rating: 4,
    });

    apiMock
    .onPost(`/comments/22`)
    .reply(200, [{
      comment: `Lorem 500`,
      rating: 4,
    }]);

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });

  it(`Should make a correct API call to /favorite/:offerId/1 (onPost)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.addOfferToFavorite(54);

    apiMock
    .onPost(`/favorite/54/1`)
    .reply(200, {
      'city': {
        'name': `Paris`,
        'location': {
          'latitude': 52.3909553943508,
          'longitude': 4.85309666406198,
          'zoom': 16,
        },
      },
      'preview_image': `https://dummyimage.com/260x200/4545454/fff`,
      'images': [
        `https://dummyimage.com/260x200/4545454/fff`,
        `https://dummyimage.com/260x200/464646/bd582c`,
        `https://dummyimage.com/260x200/464646/c09f38`,
      ],
      'title': `Studio at great location`,
      'is_favorite': true,
      'is_premium': true,
      'rating': 4,
      'type': `room`,
      'bedrooms': 3,
      'max_adults': 4,
      'price': 200,
      'goods': [`Heating`, `Kitchen`, `Fridge`],
      'host': {
        'id': 23,
        'name': `Bob`,
        'is_pro': true,
        'avatar_url': `https://dummyimage.com/74x74/000/bd582c`
      },
      'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      },
      'id': 1,
    });

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_OFFERS,
        payload: {
          city: {
            name: `Paris`,
            location: {
              latitude: 52.3909553943508,
              longitude: 4.85309666406198,
              zoom: 16,
            },
          },
          previewImage: `https://dummyimage.com/260x200/4545454/fff`,
          images: [
            `https://dummyimage.com/260x200/4545454/fff`,
            `https://dummyimage.com/260x200/464646/bd582c`,
            `https://dummyimage.com/260x200/464646/c09f38`,
          ],
          title: `Studio at great location`,
          isFavorite: true,
          isPremium: true,
          rating: 4,
          type: `room`,
          bedrooms: 3,
          maxAdults: 4,
          price: 200,
          goods: [`Heating`, `Kitchen`, `Fridge`],
          host: {
            id: 23,
            name: `Bob`,
            isPro: true,
            avatarUrl: `https://dummyimage.com/74x74/000/bd582c`
          },
          description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          location: {
            latitude: 52.369553943508,
            longitude: 4.85309666406198,
            zoom: 16
          },
          id: 1,
        },
      });
    });
  });

  it(`Should make a correct API call to /favorite/:offerId/0 (onPost)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.removeOfferFromFavorite(43);

    apiMock
    .onPost(`/favorite/43/0`)
    .reply(200, {
      'city': {
        'name': `Paris`,
        'location': {
          'latitude': 52.3909553943508,
          'longitude': 4.85309666406198,
          'zoom': 16,
        },
      },
      'preview_image': `https://dummyimage.com/260x200/4545454/fff`,
      'images': [
        `https://dummyimage.com/260x200/4545454/fff`,
        `https://dummyimage.com/260x200/464646/bd582c`,
        `https://dummyimage.com/260x200/464646/c09f38`,
      ],
      'title': `Studio at great location`,
      'is_favorite': true,
      'is_premium': true,
      'rating': 4,
      'type': `room`,
      'bedrooms': 3,
      'max_adults': 4,
      'price': 200,
      'goods': [`Heating`, `Kitchen`, `Fridge`],
      'host': {
        'id': 23,
        'name': `Bob`,
        'is_pro': true,
        'avatar_url': `https://dummyimage.com/74x74/000/bd582c`
      },
      'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      },
      'id': 1,
    });

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_OFFERS,
        payload: {
          city: {
            name: `Paris`,
            location: {
              latitude: 52.3909553943508,
              longitude: 4.85309666406198,
              zoom: 16,
            },
          },
          previewImage: `https://dummyimage.com/260x200/4545454/fff`,
          images: [
            `https://dummyimage.com/260x200/4545454/fff`,
            `https://dummyimage.com/260x200/464646/bd582c`,
            `https://dummyimage.com/260x200/464646/c09f38`,
          ],
          title: `Studio at great location`,
          isFavorite: true,
          isPremium: true,
          rating: 4,
          type: `room`,
          bedrooms: 3,
          maxAdults: 4,
          price: 200,
          goods: [`Heating`, `Kitchen`, `Fridge`],
          host: {
            id: 23,
            name: `Bob`,
            isPro: true,
            avatarUrl: `https://dummyimage.com/74x74/000/bd582c`
          },
          description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
          location: {
            latitude: 52.369553943508,
            longitude: 4.85309666406198,
            zoom: 16
          },
          id: 1,
        },
      });
    });
  });

  it(`Should make a correct API call to /favorite (onGet)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loader = Operation.loadFavoriteOffers();

    apiMock
    .onGet(`/favorite`)
    .reply(200, [{
      'city': {
        'name': `Paris`,
        'location': {
          'latitude': 52.3909553943508,
          'longitude': 4.85309666406198,
          'zoom': 16,
        },
      },
      'preview_image': `https://dummyimage.com/260x200/4545454/fff`,
      'images': [
        `https://dummyimage.com/260x200/4545454/fff`,
        `https://dummyimage.com/260x200/464646/bd582c`,
        `https://dummyimage.com/260x200/464646/c09f38`,
      ],
      'title': `Studio at great location`,
      'is_favorite': true,
      'is_premium': true,
      'rating': 4,
      'type': `room`,
      'bedrooms': 3,
      'max_adults': 4,
      'price': 200,
      'goods': [`Heating`, `Kitchen`, `Fridge`],
      'host': {
        'id': 23,
        'name': `Bob`,
        'is_pro': true,
        'avatar_url': `https://dummyimage.com/74x74/000/bd582c`
      },
      'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 16
      },
      'id': 1,
    }]);

    return loader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_FAVORITE_OFFERS,
        payload: [{
          cityName: `Paris`,
          offers: [{
            city: {
              name: `Paris`,
              location: {
                latitude: 52.3909553943508,
                longitude: 4.85309666406198,
                zoom: 16,
              },
            },
            previewImage: `https://dummyimage.com/260x200/4545454/fff`,
            images: [
              `https://dummyimage.com/260x200/4545454/fff`,
              `https://dummyimage.com/260x200/464646/bd582c`,
              `https://dummyimage.com/260x200/464646/c09f38`,
            ],
            title: `Studio at great location`,
            isFavorite: true,
            isPremium: true,
            rating: 4,
            type: `room`,
            bedrooms: 3,
            maxAdults: 4,
            price: 200,
            goods: [`Heating`, `Kitchen`, `Fridge`],
            host: {
              id: 23,
              name: `Bob`,
              isPro: true,
              avatarUrl: `https://dummyimage.com/74x74/000/bd582c`
            },
            description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
            location: {
              latitude: 52.369553943508,
              longitude: 4.85309666406198,
              zoom: 16
            },
            id: 1,
          }]
        }],
      });
    });
  });
});
