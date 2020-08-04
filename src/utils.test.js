import {extend, getUniqueCities, getOffersByCity, sortOffers} from './utils';

import {SortingTypes} from './types';

it(`Should create a unique object from all enumerable properties from one or two source objects`, () => {
  const firstObject = {a: 1, b: 2};
  const secondObject = {a: 2, b: 2, c: 3};

  expect(extend(firstObject, secondObject)).toEqual({a: 2, b: 2, c: 3});
  expect(extend(firstObject, secondObject)).not.toBe(firstObject);
  expect(extend(firstObject, secondObject)).not.toBe(secondObject);
});

it(`Should create an array of unique cities from offers`, () => {
  const offers = [
    {city: {name: `Paris`}},
    {city: {name: `Paris`}},
    {city: {name: `Moscow`}},
    {city: {name: `Moscow`}},
    {city: {name: `Berlin`}},
    {city: {name: `Moscow`}},
    {city: {name: `Berlin`}},
  ];

  expect(getUniqueCities(offers)).toEqual([`Paris`, `Moscow`, `Berlin`]);
});

it(`Should return offers for city from all offers`, () => {
  const offers = [
    {city: {name: `Berlin`}},
    {city: {name: `Moscow`}},
    {city: {name: `Paris`}},
    {city: {name: `Berlin`}},
  ];
  const city = `Berlin`;

  expect(getOffersByCity(offers, city)).toEqual([
    {city: {name: `Berlin`}},
    {city: {name: `Berlin`}},
  ]);
});

describe(`Sorting offers works correctly`, () => {
  it(`Should sort offers by default (popular)`, () => {
    const offers = [
      {price: 100, rating: 4},
      {price: 40, rating: 5},
      {price: 110, rating: 4.5},
    ];

    expect(sortOffers(offers, SortingTypes.POPULAR)).toEqual([
      {price: 100, rating: 4},
      {price: 40, rating: 5},
      {price: 110, rating: 4.5},
    ]);
  });

  it(`Should sort offers by price (low to high)`, () => {
    const offers = [
      {price: 100},
      {price: 40},
      {price: 110},
    ];

    expect(sortOffers(offers, SortingTypes.PRICE_LOW_TO_HIGH)).toEqual([
      {price: 40},
      {price: 100},
      {price: 110},
    ]);
  });

  it(`Should sort offers by price (high to low)`, () => {
    const offers = [
      {price: 200},
      {price: 220},
      {price: 210},
    ];

    expect(sortOffers(offers, SortingTypes.PRICE_HIGH_TO_LOW)).toEqual([
      {price: 220},
      {price: 210},
      {price: 200},
    ]);
  });

  it(`Should sort offers by rating (top rated first)`, () => {
    const offers = [
      {rating: 4},
      {rating: 5},
      {rating: 4.5},
    ];

    expect(sortOffers(offers, SortingTypes.TOP_RATED_FIRST)).toEqual([
      {rating: 5},
      {rating: 4.5},
      {rating: 4},
    ]);
  });
});
