import {OfferTypes} from './types';

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer`,
};

export const OfferTypesNames = {
  [OfferTypes.APARTMENT]: `Apartment`,
  [OfferTypes.ROOM]: `Private Room`,
  [OfferTypes.HOUSE]: `House`,
  [OfferTypes.HOTEL]: `Hotel`,
};
