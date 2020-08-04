import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import withOpeningState from './with-opening-state';

interface MockComponentProps {
  onOpeningClick: () => void;
  onSelectClick: () => void;
}

const MockComponent: React.FunctionComponent<MockComponentProps> = (props: MockComponentProps) => {
  const {onOpeningClick, onSelectClick} = props;

  return (
    <section>
      <button onClick={onOpeningClick} />
      <div onClick={onSelectClick} />
    </section>
  );
};

const MockComponentWrapped = withOpeningState(MockComponent);

it(`Should change isOpen state, when click to open button or select element`, () => {
  const wrapper = mount(
      <MockComponentWrapped />
  );

  expect(wrapper.state().isOpen).toEqual(false);

  const openingButton = wrapper.find(`button`);
  const element = wrapper.find(`div`);

  openingButton.simulate(`click`);
  expect(wrapper.state().isOpen).toEqual(true);
  openingButton.simulate(`click`);
  expect(wrapper.state().isOpen).toEqual(false);

  openingButton.simulate(`click`);
  expect(wrapper.state().isOpen).toEqual(true);
  element.simulate(`click`);
  expect(wrapper.state().isOpen).toEqual(false);
});
