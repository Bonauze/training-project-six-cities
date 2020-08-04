import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import withHandleReviewForm from './with-handle-review-form';
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

const MockComponentWrapped = withHandleReviewForm(MockComponent);

const mockStore = configureStore([]);

it(`withHandleReviewForm renders correctly`, () => {
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
