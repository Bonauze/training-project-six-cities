import {combineReducers} from 'redux';
import {reducer as offers} from './offers/offers';
import {reducer as user} from './user/user';
import NameSpace from './name-space';

const rootReducer = combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
});

export default rootReducer;
