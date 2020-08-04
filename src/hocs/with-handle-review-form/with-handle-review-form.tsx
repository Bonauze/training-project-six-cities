import React from 'react';
import {connect} from 'react-redux';

import {Operation as OffersOperation} from '../../reducer/offers/offers';

const MIN_REVIEW_COUNT_CHARACTERS = 50;
const MAX_REVIEW_COUNT_CHARACTERS = 300;

interface Props {
  activeOfferId: number;
  onSendNewReview: (activeOfferId: number, data: {
    comment: string;
    rating: number;
  }) => Promise<string>;
  onLoadReviews: (activeOfferId: number) => void;
}

interface State {
  rating: number;
  textareaValue: string;
  isValid: boolean;
  isSending: boolean;
}

const withHandleReviewForm = (Component) => {
  class WithHandleReviewForm extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        textareaValue: ``,
        isValid: false,
        isSending: false,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleStarsChange = this._handleStarsChange.bind(this);
      this._handleTextareaChange = this._handleTextareaChange.bind(this);
    }

    private _handleFormSubmit(event) {
      event.preventDefault();

      const {rating, textareaValue, isValid} = this.state;
      const {activeOfferId, onSendNewReview, onLoadReviews} = this.props;

      if (!isValid) {
        return;
      }

      this.setState({isSending: true});

      const response = onSendNewReview(activeOfferId, {
        comment: textareaValue,
        rating,
      });

      response.then(() => {
        this.setState({
          rating: 0,
          textareaValue: ``,
          isValid: false,
          isSending: false,
        });
        onLoadReviews(activeOfferId);
      }).catch((error) => {
        this.setState({isSending: false});
        // eslint-disable-next-line no-alert
        alert(error);
      });
    }

    private _handleStarsChange(event) {
      this.setState({rating: Number(event.target.value)}, this._validateForm);
    }

    private _handleTextareaChange(event) {
      this.setState({textareaValue: event.target.value}, this._validateForm);
    }

    private _validateForm() {
      const {rating, textareaValue} = this.state;
      const textareaLength = textareaValue.length;

      if (textareaLength < MIN_REVIEW_COUNT_CHARACTERS || textareaLength > MAX_REVIEW_COUNT_CHARACTERS) {
        this.setState({isValid: false});
        return;
      }

      if (rating === 0) {
        this.setState({isValid: false});
        return;
      }

      this.setState({isValid: true});
    }

    render() {
      const {rating, textareaValue, isValid, isSending} = this.state;

      return (
        <Component
          {...this.props}
          rating={rating}
          textareaValue={textareaValue}
          isValid={isValid}
          isSending={isSending}
          onSubmitForm={this._handleFormSubmit}
          onStarsChange={this._handleStarsChange}
          onTextareaChange={this._handleTextareaChange}
        />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSendNewReview(offerId, data) {
      return dispatch(OffersOperation.sendNewReview(offerId, data));
    },
    onLoadReviews(id) {
      dispatch(OffersOperation.loadOfferReviews(id));
    },
  });

  return connect(null, mapDispatchToProps)(WithHandleReviewForm);
};

export default withHandleReviewForm;
