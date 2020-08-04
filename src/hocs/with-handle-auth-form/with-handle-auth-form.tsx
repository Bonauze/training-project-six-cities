import React from 'react';
import {connect} from 'react-redux';

import {Operation as UserOperation} from '../../reducer/user/user';

interface Props {
  onLogin: (data: {
    email: string;
    password: string;
  }) => Promise<string>;
}

interface State {
  emailValue: string;
  passwordValue: string;
  isSending: boolean;
}

const withHandleAuthForm = (Component) => {
  class WithHandleAuthForm extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        emailValue: ``,
        passwordValue: ``,
        isSending: false,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleFieldChange = this._handleFieldChange.bind(this);
    }

    private _handleFormSubmit(event: React.ChangeEvent) {
      event.preventDefault();

      this.setState({isSending: true});

      const {onLogin} = this.props;
      const {emailValue, passwordValue} = this.state;

      const response = onLogin({
        email: emailValue,
        password: passwordValue,
      });

      response.catch(() => {
        this.setState({isSending: false});
      });
    }

    private _handleFieldChange(event) {
      const {name, value} = event.target;

      this.setState((prevState) => ({
        ...prevState,
        [`${name}Value`]: value,
      }));
    }

    render() {
      const {emailValue, passwordValue, isSending} = this.state;

      return (
        <Component
          {...this.props}
          onFieldChange={this._handleFieldChange}
          onSubmitForm={this._handleFormSubmit}
          emailValue={emailValue}
          passwordValue={passwordValue}
          isSending={isSending}
        />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onLogin(authData) {
      return dispatch(UserOperation.login(authData));
    },
  });

  return connect(null, mapDispatchToProps)(WithHandleAuthForm);
};

export default withHandleAuthForm;
