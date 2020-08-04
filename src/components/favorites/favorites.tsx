import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from '../header/header';

import {Operation as OffersOperation} from '../../reducer/offers/offers';

import {getFavoritesOffers} from '../../reducer/offers/selectors';

import {AppRoute} from '../../constants';

import {FavoritesOffer as FavoritesOfferInterface} from '../../types';

interface Props {
  favoritesOffers: FavoritesOfferInterface[];
  onLoadFavoritesOffers: () => void;
  onRemoveOfferFromFavorite: (id: number) => void;
}

class Favorites extends PureComponent<Props> {
  componentDidMount() {
    const {onLoadFavoritesOffers} = this.props;

    onLoadFavoritesOffers();
  }

  private _renderFavorites(favoritesOffers, onRemoveOfferFromFavorite) {
    return (
      <React.Fragment>
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {favoritesOffers.map((favoritesOffer) => {
            return (
              <li key={favoritesOffer.cityName} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>{favoritesOffer.cityName}</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoritesOffer.offers.map((offer) => {

                    return (
                      <article key={offer.id} className="favorites__card place-card">
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`${AppRoute.OFFER}/${offer.id}`}>
                            <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{offer.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button
                              className="place-card__bookmark-button place-card__bookmark-button--active button"
                              type="button"
                              onClick={() => {
                                onRemoveOfferFromFavorite(offer.id);
                              }}
                            >
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark" />
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{width: `${Math.round(offer.rating) * 20}%`}}/>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to={`${AppRoute.OFFER}/${offer.id}`}>{offer.title}</Link>
                          </h2>
                          <p className="place-card__type">{offer.type}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  private _renderFavoritesEmpty() {
    return (
      <React.Fragment>
        <h1 className="visually-hidden">Favorites (empty)</h1>
        <div className="favorites__status-wrapper">
          <b className="favorites__status">Nothing yet saved.</b>
          <p className="favorites__status-description">Save properties to narrow down search or plan yor future
            trips.</p>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {favoritesOffers, onRemoveOfferFromFavorite} = this.props;
    const isEmpty = !favoritesOffers.length;

    return (
      <div className="page">
        <Header />

        <main className={`page__main page__main--favorites ${isEmpty ? `page__main--favorites-empty` : ``}`}>
          <div className="page__favorites-container container">
            <section className={`favorites ${isEmpty ? `favorites--empty` : ``}`}>
              {isEmpty ? this._renderFavoritesEmpty() : this._renderFavorites(favoritesOffers, onRemoveOfferFromFavorite)}
            </section>
          </div>
        </main>

        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favoritesOffers: getFavoritesOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavoritesOffers() {
    dispatch(OffersOperation.loadFavoriteOffers());
  },
  onRemoveOfferFromFavorite(id) {
    dispatch(OffersOperation.removeOfferFromFavorite(id));
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
