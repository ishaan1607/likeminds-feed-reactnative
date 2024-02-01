import { useContextState } from "./contextStore";
import { feedReducer } from "./reducers/feedReducer";
import { loaderReducer } from "./reducers/loaderReducer";
import { loginReducer } from "./reducers/loginReducer";
import { postDetailReducer } from "./reducers/postDetailReducer";

// Combine multiple reducers into one
const combineReducers = (reducers) => (state, action) => {
  return Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});
};

export const rootReducer = combineReducers({
    feed: feedReducer,
    login: loginReducer,
    loader: loaderReducer,
    postDetail: postDetailReducer
});

export const useAppSelector = (selector) => {
  const { state } = useContextState();
  return selector(state);
};

export const useAppDispatch = () => {
  const { dispatch } = useContextState();
  return dispatch;
};