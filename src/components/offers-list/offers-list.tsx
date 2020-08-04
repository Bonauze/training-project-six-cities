import React from 'react';

import PlaceCard from '../place-card/place-card';

import {Offer as OfferInterface} from '../../types';

interface Props {
  offers: OfferInterface[];
  isPlaceNearby: boolean;
}

const OfferList: React.FunctionComponent<Props> = (props: Props) => {
  const {offers, isPlaceNearby} = props;

  return (
    <React.Fragment>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          isPlaceNearby={isPlaceNearby}
        />
      ))}
    </React.Fragment>
  );
};

export default OfferList;
