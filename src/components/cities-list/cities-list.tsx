import React from 'react';
import {connect} from 'react-redux';

import {ActionCreator as OffersActionCreator} from '../../reducer/offers/offers';

import {getCities, getCurrentCity} from '../../reducer/offers/selectors';

interface Props {
  cities: string[];
  currentCity: string;
  onChangeCity: (city: string) => void;
}

const CitiesList: React.FunctionComponent<Props> = (props: Props) => {
  const {cities, currentCity, onChangeCity} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, index) => {
        const classNames = `locations__item-link tabs__item ${city === currentCity && `tabs__item--active`}`;

        return (
          <li className="locations__item" key={index + city}>
            {city === currentCity ?
              <a className={classNames}><span>{city}</span></a> :
              <a className={classNames} href="#" onClick={() => onChangeCity(city)}><span>{city}</span></a>
            }
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  currentCity: getCurrentCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(OffersActionCreator.changeCurrentCity(city));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
