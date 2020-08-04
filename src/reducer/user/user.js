import {extend} from '../../utils';
import {createAuthInfo} from '../../adapters';
import {AuthorizationStatuses} from '../../types';

const initialState = {
  authorizationStatus: AuthorizationStatuses.UNKNOWN,
  authInfo: null,
};

const ActionType = {
  CHANGE_AUTHORIZATION_STATUS: `CHANGE_AUTHORIZATION_STATUS`,
  CHANGE_AUTH_INFO: `CHANGE_AUTH_INFO`,
};

const ActionCreator = {
  changeAuthorizationStatus: (status) => ({
    type: ActionType.CHANGE_AUTHORIZATION_STATUS,
    payload: status,
  }),
  changeAuthInfo: (authInfo) => ({
    type: ActionType.CHANGE_AUTH_INFO,
    payload: authInfo,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTHORIZATION_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.CHANGE_AUTH_INFO:
      return extend(state, {
        authInfo: action.payload,
      });
    default:
      return state;
  }
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => (
    api.get(`/login`)
      .then((response) => {
        const savedAuthData = createAuthInfo(response.data);

        dispatch(ActionCreator.changeAuthInfo(savedAuthData));
        dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatuses.AUTH));
      })
      .catch((error) => {
        throw error;
      })
  ),
  login: (authData) => (dispatch, getState, api) => (
    api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        const newAuthData = createAuthInfo(response.data);

        dispatch(ActionCreator.changeAuthInfo(newAuthData));
        dispatch(ActionCreator.changeAuthorizationStatus(AuthorizationStatuses.AUTH));
      })
      .catch((error) => {
        throw error;
      })
  ),
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
