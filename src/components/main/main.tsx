import React from 'react';
import {connect} from 'react-redux';

import Header from '../header/header';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import OfferList from '../offers-list/offers-list';
import Sorting from '../sorting/sorting';

import withOpeningState from '../../hocs/with-opening-state/with-opening-state';

const SortingWrapped = withOpeningState(Sorting);

import {getCurrentCity, getCurrentCityOffers, getOffersCoordinates} from '../../reducer/offers/selectors';

import {Offer as OfferInterface, OffersCoordinates as OffersCoordinatesInterface} from '../../types';

interface Props {
  currentCity: string;
  currentCityOffers: OfferInterface[];
  offersCoordinates: OffersCoordinatesInterface;
}

const renderMap = (offersCoordinates) => {
  if (offersCoordinates === null) {
    return null;
  }

  const {centerCoordinates, zoom, markersCoordinates} = offersCoordinates;

  return (
    <Map
      centerCoordinates={centerCoordinates}
      zoom={zoom}
      markersCoordinates={markersCoordinates}
    />
  );
};

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {currentCity, currentCityOffers, offersCoordinates} = props;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentCityOffers.length} places to stay in {currentCity}</b>
              <SortingWrapped />
              <div className="cities__places-list places__list tabs__content">
                <OfferList
                  offers={currentCityOffers}
                  isPlaceNearby={false}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {renderMap(offersCoordinates)}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  currentCityOffers: getCurrentCityOffers(state),
  offersCoordinates: getOffersCoordinates(state),
});

export {Main};
export default connect(mapStateToProps)(Main);
