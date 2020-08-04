export enum SortingTypes {
  POPULAR = `Popular`,
  PRICE_LOW_TO_HIGH = `Price: low to high`,
  PRICE_HIGH_TO_LOW = `Price: high to low`,
  TOP_RATED_FIRST = `Top rated first`,
}

export enum OfferTypes {
  APARTMENT = `apartment`,
  ROOM = `room`,
  HOUSE = `house`,
  HOTEL = `hotel`
}

export enum AuthorizationStatuses {
  AUTH = `AUTH`,
  NO_AUTH = `NO_AUTH`,
  UNKNOWN = `UNKNOWN`,
}

export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Offer {
  city: {
    name: string;
    location: Location;
  };
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: OfferTypes;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: {
    id: number;
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
  description: string;
  location: Location;
  id: number;
}

export interface Review {
  date: string;
  description: string;
  id: number;
  image: string;
  name: string;
  rating: number;
}

export interface FavoritesOffer {
  cityName: string;
  offers: [Offer];
}

export interface AuthInfo {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface OffersCoordinates {
  centerCoordinates: [number, number];
  markersCoordinates: {
    coordinates: [number, number];
    id: number;
  }[];
  zoom: number;
}
