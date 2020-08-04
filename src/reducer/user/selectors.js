import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.USER;

const getAuthorizationStatus = (state) => state[NAME_SPACE].authorizationStatus;
const getAuthInfo = (state) => state[NAME_SPACE].authInfo;

export {getAuthorizationStatus, getAuthInfo};
