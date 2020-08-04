import React from 'react';

import ReviewsItem from '../reviews-item/reviews-item';

import {Review as ReviewInterface} from '../../types';

interface Props {
  reviews: ReviewInterface[];
}

const ReviewsList: React.FunctionComponent<Props> = (props: Props) => {
  const {reviews} = props;

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} {...review} />
      ))}
    </ul>
  );
};

export default ReviewsList;
