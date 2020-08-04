import MockAdapter from 'axios-mock-adapter';

import {AuthorizationStatuses} from '../../types';
import {reducer, ActionCreator, ActionType, Operation} from './user';

import {createAPI} from '../../api';

const api = createAPI(() => {});

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatuses.UNKNOWN,
      authInfo: null,
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should change current authorization status`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatuses.NO_AUTH,
    }, {
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthorizationStatuses.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatuses.AUTH,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change authorization status returns action with sent payload`, () => {
    expect(ActionCreator.changeAuthorizationStatus(AuthorizationStatuses.AUTH)).toEqual({
      type: ActionType.CHANGE_AUTHORIZATION_STATUS,
      payload: AuthorizationStatuses.AUTH,
    });
  });
});

describe(`Operation works correctly`, () => {
  it(`Should make a correct API call to /login (onPost)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authData = {
      email: `qwerty@gmail.com`,
      password: `123456`,
    };
    const loginLoader = Operation.login(authData);

    apiMock
      .onPost(`/login`)
      .reply(200, {
        'id': 1,
        'email': `qwerty@gmail.com`,
        'name': `qwerty`,
        'avatar_url': `/`,
        'is_pro': true,
      });

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTH_INFO,
          payload: {
            id: 1,
            email: `qwerty@gmail.com`,
            name: `qwerty`,
            avatarUrl: `/`,
            isPro: true,
          },
        });
      });
  });
});
