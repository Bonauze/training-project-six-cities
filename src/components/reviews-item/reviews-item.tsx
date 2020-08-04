import React from 'react';

import {Review as Props} from '../../types';

const getYearMonthDay = (date: string): string => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth();
  const day = dateObject.getDay();

  return `${year}-${month}-${day}`;
};

const getFormattedDate = (date: string): string => {
  return new Date(date).toLocaleString(`en-GB`, {
    year: `numeric`,
    month: `long`,
  });
};

const ReviewsItem: React.FunctionComponent<Props> = (props: Props) => {
  const {image, name, rating, description, date} = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={image} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{description}</p>
        <time className="reviews__time" dateTime={getYearMonthDay(date)}>{getFormattedDate(date)}</time>
      </div>
    </li>
  );
};

export default ReviewsItem;
