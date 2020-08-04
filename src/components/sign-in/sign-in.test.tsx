import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Router} from 'react-router-dom';

import history from "../../history";

import SignIn from './sign-in';

import testStore from '../../test-mocks/store';
import {noop} from '../../utils';

const mockStore = configureStore([]);

it(`SignIn renders correctly`, () => {
  const testMockStore = mockStore(testStore);

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <Router history={history}>
          <SignIn
            onFieldChange={noop}
            onSubmitForm={noop}
            emailValue={`admin`}
            passwordValue={`123456`}
            isSending={false}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
