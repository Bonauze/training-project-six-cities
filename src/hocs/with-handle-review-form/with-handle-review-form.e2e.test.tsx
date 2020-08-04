import React from 'react';
import Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import withHandleReviewForm from './with-handle-review-form';
import testStore from '../../test-mocks/store';

interface MockComponentProps {
  onStarsChange: () => void;
  onTextareaChange: () => void;
}

const MockComponent: React.FunctionComponent<MockComponentProps> = (props: MockComponentProps) => {
  const {onStarsChange, onTextareaChange} = props;

  return (
    <form>
      <input type="radio" value={3} onChange={onStarsChange} />
      <textarea onChange={onTextareaChange} />
    </form>
  );
};

const MockComponentWrapped = withHandleReviewForm(MockComponent);
const lorem = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.`;

const mockStore = configureStore([]);

it(`Should change isValid state, when changing form`, () => {
  const testMockStore = mockStore(testStore);

  const wrapper = Enzyme.mount(
      <Provider store={testMockStore}>
        <MockComponentWrapped />
      </Provider>
  ).find(`WithHandleReviewForm`);

  expect(wrapper.state().isValid).toEqual(false);

  const starsInput = wrapper.find(`input`);
  const textarea = wrapper.find(`textarea`);

  starsInput.simulate(`change`, {target: {value: 4}});
  textarea.simulate(`change`, {target: {value: lorem}});

  expect(wrapper.state().rating).toEqual(4);
  expect(wrapper.state().textareaValue).toEqual(lorem);
  expect(wrapper.state().isValid).toEqual(true);

  starsInput.simulate(`change`, {target: {value: 0}});

  expect(wrapper.state().isValid).toEqual(false);
});
