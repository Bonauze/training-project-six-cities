import React from 'react';

interface State {
  isOpen: boolean;
}

const withOpeningState = (Component) => {
  return class WithOpeningState extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };

      this._handleOpeningClick = this._handleOpeningClick.bind(this);
      this._handleSelectClick = this._handleSelectClick.bind(this);
    }

    private _handleOpeningClick() {
      this.setState((prevState) => ({
        isOpen: !prevState.isOpen,
      }));
    }

    private _handleSelectClick() {
      this.setState({isOpen: false});
    }

    render() {
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isOpen}
          onOpeningClick={this._handleOpeningClick}
          onSelectClick={this._handleSelectClick}
        />
      );
    }
  };
};

export default withOpeningState;
