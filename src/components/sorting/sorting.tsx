import React from 'react';
import {connect} from 'react-redux';

import {ActionCreator as OffersActionCreator} from '../../reducer/offers/offers';

import {getSortingType} from '../../reducer/offers/selectors';

import {SortingTypes} from '../../types';

interface Props {
  isOpen: boolean;
  sortingType: SortingTypes;
  onOpeningClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onSelectClick: (type: SortingTypes) => void;
  onChangeSortingType: (type: SortingTypes) => void;
}

const Sorting: React.FunctionComponent<Props> = (props: Props) => {
  const {isOpen, sortingType, onOpeningClick, onSelectClick, onChangeSortingType} = props;
  const openedClassName = isOpen ? `places__options--opened` : ``;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onOpeningClick}
      >
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${openedClassName}`}>
        {Object.entries(SortingTypes).map(([key, value]) => {
          const activeClassName = value === sortingType ? `places__option--active` : ``;

          return (
            <li
              key={key}
              className={`places__option ${activeClassName}`}
              tabIndex={0}
              onClick={() => {
                onSelectClick(SortingTypes[key]);
                onChangeSortingType(SortingTypes[key]);
              }}
            >{value}</li>
          );
        })}
      </ul>
    </form>
  );
};

const mapStateToProps = (state) => ({
  sortingType: getSortingType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSortingType(newSortingType) {
    dispatch(OffersActionCreator.changeSortingType(newSortingType));
  },
});

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
