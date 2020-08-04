import React from 'react';

const STARS_TITLES = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

interface Props {
  rating: number;
  textareaValue: string;
  isValid: boolean;
  isSending: boolean;
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  onStarsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReviewForm: React.FunctionComponent<Props> = (props: Props) => {
  const {rating, textareaValue, isValid, isSending, onSubmitForm, onStarsChange, onTextareaChange} = props;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onSubmitForm}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STARS_TITLES.map((title, index) => {
          const value = index + 1;
          const id = `${value}-stars`;

          return (
            <React.Fragment key={id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={id}
                checked={rating === value}
                onChange={onStarsChange}
                type="radio"
              />

              <label htmlFor={id} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </React.Fragment>
          );
        }).reverse()}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={textareaValue}
        onChange={onTextareaChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSending}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
