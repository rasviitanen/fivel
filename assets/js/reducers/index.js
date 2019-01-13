import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import rooms from './rooms';
import alphas from './alphas';
import room from './room';
import states from './states';



const appReducer = combineReducers({
  form,
  session,
  rooms,
  room,
  alphas,
  states,
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
