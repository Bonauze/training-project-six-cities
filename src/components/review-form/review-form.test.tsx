import React from 'react';
import renderer from 'react-test-renderer';

import {noop} from '../../utils';

import ReviewForm from './review-form';

it(`ReviewForm renders correctly`, () => {
  const tree = renderer.create(
      <ReviewForm
        rating={0}
        textareaValue={`Lorem text`}
        isValid={false}
        isSending={false}
        onSubmitForm={noop}
        onStarsChange={noop}
        onTextareaChange={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
