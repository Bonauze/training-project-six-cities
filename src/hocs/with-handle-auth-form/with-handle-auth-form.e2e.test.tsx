import React from 'react';
import Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import withHandleAuthForm from './with-handle-auth-form';
import testStore from '../../test-mocks/store';

interface MockComponentProps {
  onFieldChange: () => void;
}

const MockComponent: React.FunctionComponent<MockComponentProps> = (props: MockComponentProps) => {
  const {onFieldChange} = props;

  return (
    <form>
      <input type="text" value="" name="email" onChange={onFieldChange} />
      <input type="password" value="" name="password" onChange={onFieldChange} />
    </form>
  );
};

const MockComponentWrapped = withHandleAuthForm(MockComponent);

const mockStore = configureStore([]);

it(`Should change emailValue or passwordValue state, when changing inputs`, () => {
  const testMockStore = mockStore(testStore);

  const wrapper = Enzyme.mount(
      <Provider store={testMockStore}>
        <MockComponentWrapped />
      </Provider>
  ).find(`WithHandleAuthForm`);

  expect(wrapper.state().emailValue).toEqual(``);

  const emailInput = wrapper.find(`input[name="email"]`);
  const passwordInput = wrapper.find(`input[name="password"]`);

  emailInput.simulate(`change`, {target: {value: `admin@gmail.com`, name: `email`}});
  expect(wrapper.state().emailValue).toEqual(`admin@gmail.com`);

  passwordInput.simulate(`change`, {target: {value: `123456`, name: `password`}});
  expect(wrapper.state().passwordValue).toEqual(`123456`);
});
