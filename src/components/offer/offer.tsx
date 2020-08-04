import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import history from '../../history';

import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';
import OfferList from '../offers-list/offers-list';

import withHandleReviewForm from '../../hocs/with-handle-review-form/with-handle-review-form';

const ReviewsFormWrapper = withHandleReviewForm(ReviewForm);

import {getAuthorizationStatus} from '../../reducer/user/selectors';
import {getOffersNearby, getReviews, getOffersNearbyCoordinates} from '../../reducer/offers/selectors';

import {Operation as OffersOperation} from '../../reducer/offers/offers';

import {AppRoute, OfferTypesNames} from '../../constants';

import {
  Offer as OfferInterface,
  Review as ReviewInterface,
  OffersCoordinates as OffersCoordinatesInterface,
  AuthorizationStatuses,
} from '../../types';

const MAX_REVIEWS_COUNT = 10;

interface Props {
  authorizationStatus: AuthorizationStatuses;
  activeOffer: OfferInterface;
  reviews: ReviewInterface[];
  offersNearby: OfferInterface[];
  offersNearbyCoordinates: OffersCoordinatesInterface;
  onLoadReviews: (id: number) => void;
  onLoadOffersNearby: (id: number) => void;
  onAddOfferToFavorite: (id: number) => void;
  onRemoveOfferFromFavorite: (id: number) => void;
}

class Offer extends PureComponent<Props> {
  componentDidMount() {
    this._loadData();
  }

  componentDidUpdate(prevProps) {
    const {activeOffer} = this.props;

    if (prevProps.activeOffer !== activeOffer) {
      this._loadData();
    }
  }

  private _loadData() {
    const {onLoadReviews, onLoadOffersNearby, activeOffer} = this.props;
    const {id: activeOfferId} = activeOffer;

    onLoadReviews(activeOfferId);
    onLoadOffersNearby(activeOfferId);
  }

  private _renderHost(host) {
    return (
      <React.Fragment>
        <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``}`}>
          <img
            className="property__avatar user__avatar"
            src={`../${host.avatarUrl}`}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="property__user-name">{host.name}</span>
      </React.Fragment>
    );
  }

  private _renderReviews() {
    const {reviews} = this.props;

    if (!reviews.length) {
      return null;
    }

    const slicedReviews = reviews.slice(0, MAX_REVIEWS_COUNT);

    return (
      <ReviewsList reviews={slicedReviews} />
    );
  }

  private _renderReviewForm() {
    const {authorizationStatus, activeOffer} = this.props;

    if (authorizationStatus === AuthorizationStatuses.AUTH) {
      return <ReviewsFormWrapper activeOfferId={activeOffer.id} />;
    }

    return null;
  }

  private _renderOffersNearby() {
    const {offersNearby} = this.props;

    if (!offersNearby.length) {
      return null;
    }

    return (
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OfferList
              offers={offersNearby}
              isPlaceNearby={true}
            />
          </div>
        </section>
      </div>
    );
  }

  private _renderMap() {
    const {offersNearbyCoordinates} = this.props;

    if (offersNearbyCoordinates === null) {
      return null;
    }

    const {centerCoordinates, zoom, markersCoordinates} = offersNearbyCoordinates;

    return (
      <Map
        centerCoordinates={centerCoordinates}
        zoom={zoom}
        markersCoordinates={markersCoordinates}
      />
    );
  }

  render() {
    const {authorizationStatus, activeOffer, reviews, onRemoveOfferFromFavorite, onAddOfferToFavorite} = this.props;

    return (
      <div className="page">
        <Header />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {activeOffer.images.map((image, index) => (
                  <div className="property__image-wrapper" key={image + index}>
                    <img className="property__image" src={image} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {activeOffer.isPremium && <div className="property__mark"><span>Premium</span></div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{activeOffer.title}</h1>

                  <button
                    className={`property__bookmark-button button ${activeOffer.isFavorite ? `property__bookmark-button--active` : ``}`}
                    type="button"
                    onClick={() => {
                      if (authorizationStatus !== AuthorizationStatuses.AUTH) {
                        history.push(AppRoute.LOGIN);
                        return;
                      }

                      if (activeOffer.isFavorite) {
                        onRemoveOfferFromFavorite(activeOffer.id);
                      } else {
                        onAddOfferToFavorite(activeOffer.id);
                      }
                    }}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>

                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${activeOffer.rating * 20}%`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{activeOffer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">{OfferTypesNames[activeOffer.type]}</li>
                  <li className="property__feature property__feature--bedrooms">{activeOffer.bedrooms} Bedrooms</li>
                  <li className="property__feature property__feature--adults">Max {activeOffer.maxAdults} adults</li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">€{activeOffer.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {activeOffer.goods.map((item, index) => (
                      <li className="property__inside-item" key={item + index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    {this._renderHost(activeOffer.host)}
                  </div>
                  <div className="property__description">
                    <p className="property__text">{activeOffer.description}</p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  {this._renderReviews()}
                  {this._renderReviewForm()}
                </section>
              </div>
            </div>
            <section className="property__map map">
              {this._renderMap()}
            </section>
          </section>

          {this._renderOffersNearby()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  reviews: getReviews(state),
  offersNearby: getOffersNearby(state),
  offersNearbyCoordinates: getOffersNearbyCoordinates(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadReviews(id) {
    dispatch(OffersOperation.loadOfferReviews(id));
  },
  onLoadOffersNearby(id) {
    dispatch(OffersOperation.loadOffersNearby(id));
  },
  onAddOfferToFavorite(id) {
    dispatch(OffersOperation.addOfferToFavorite(id));
  },
  onRemoveOfferFromFavorite(id) {
    dispatch(OffersOperation.removeOfferFromFavorite(id));
  },
});

export {Offer};
export default connect(mapStateToProps, mapDispatchToProps)(Offer);
