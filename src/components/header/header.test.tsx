import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from "react-router-dom";
import history from "../../history";

import NameSpace from '../../reducer/name-space';

import {Header} from './header';

import testStore from '../../test-mocks/store';

it(`Header renders correctly`, () => {
  const {authorizationStatus, authInfo} = testStore[NameSpace.USER];

  const tree = renderer.create(
      <Router history={history}>
        <Header
          authorizationStatus={authorizationStatus}
          authInfo={authInfo}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
