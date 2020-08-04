import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import history from '../../history';

import {Operation as OffersOperation, ActionCreator as OffersActionCreator} from '../../reducer/offers/offers';

import {getAuthorizationStatus} from '../../reducer/user/selectors';

import {AppRoute, OfferTypesNames} from '../../constants';

import {Offer as OfferInterface, AuthorizationStatuses} from '../../types';

interface Props {
  authorizationStatus: AuthorizationStatuses;
  offer: OfferInterface;
  isPlaceNearby: boolean;
  onOfferMouseEnter: (id: number) => void;
  onAddOfferToFavorite: (id: number, isPlaceNearby: boolean) => void;
  onRemoveOfferFromFavorite: (id: number, isPlaceNearby: boolean) => void;
}

const PlaceCard: React.FunctionComponent<Props> = (props: Props) => {
  const {
    offer,
    isPlaceNearby,
    onOfferMouseEnter,
    onAddOfferToFavorite,
    onRemoveOfferFromFavorite,
    authorizationStatus
  } = props;

  return (
    <article
      className={`place-card ${isPlaceNearby ? `near-places__card` : `cities__place-card`}`}
      onMouseEnter={() => onOfferMouseEnter(offer.id)}
      onMouseLeave={() => onOfferMouseEnter(null)}
    >
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`place-card__image-wrapper ${isPlaceNearby ? `near-places__image-wrapper` : `cities__image-wrapper`}`}>
        <Link to={`${AppRoute.OFFER}/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? `place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={() => {
              if (authorizationStatus === AuthorizationStatuses.AUTH) {
                if (offer.isFavorite) {
                  onRemoveOfferFromFavorite(offer.id, isPlaceNearby);
                } else {
                  onAddOfferToFavorite(offer.id, isPlaceNearby);
                }
              } else if (authorizationStatus === AuthorizationStatuses.NO_AUTH) {
                history.push(AppRoute.LOGIN);
              }
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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
        <p className="place-card__type">{OfferTypesNames[offer.type]}</p>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferMouseEnter(id) {
    dispatch(OffersActionCreator.changeMouseEnterOfferId(id));
  },
  onAddOfferToFavorite(id, isPlaceNearby) {
    dispatch(OffersOperation.addOfferToFavorite(id, isPlaceNearby));
  },
  onRemoveOfferFromFavorite(id, isPlaceNearby) {
    dispatch(OffersOperation.removeOfferFromFavorite(id, isPlaceNearby));
  },
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
