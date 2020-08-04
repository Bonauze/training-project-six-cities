import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import withHandleAuthForm from './with-handle-auth-form';
import testStore from '../../test-mocks/store';
import configureStore from 'redux-mock-store';

interface MockComponentProps {
  className: string;
}

const MockComponent: React.FunctionComponent<MockComponentProps> = (props: MockComponentProps) => {
  const {className} = props;

  return (
    <div className={className} />
  );
};

const MockComponentWrapped = withHandleAuthForm(MockComponent);

const mockStore = configureStore([]);

it(`withHandleAuthForm renders correctly`, () => {
  const testMockStore = mockStore(testStore);

  const tree = renderer.create(
      <Provider store={testMockStore}>
        <MockComponentWrapped
          className={`test-class`}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
