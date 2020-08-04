import React from 'react';

import Header from '../header/header';

interface Props {
  emailValue: string;
  passwordValue: string;
  isSending: boolean;
  onFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SignIn: React.FunctionComponent<Props> = (props: Props) => {
  const {emailValue, passwordValue, isSending, onFieldChange, onSubmitForm} = props;

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={onSubmitForm}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={emailValue}
                  onChange={onFieldChange}
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={passwordValue}
                  onChange={onFieldChange}
                />
              </div>

              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSending}
              >
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
