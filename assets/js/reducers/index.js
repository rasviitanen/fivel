import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import rooms from './rooms';
import alphas from './alphas';
import room from './room';


const appReducer = combineReducers({
  form,
  session,
  rooms,
  room,
  alphas,
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
