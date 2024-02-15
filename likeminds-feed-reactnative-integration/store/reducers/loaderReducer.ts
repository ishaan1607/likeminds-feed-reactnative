import { SHOW_TOAST, START_LOADING, STOP_LOADING } from "../types/loader";

export interface LoaderReducerState {
  count: number;
  isToast: boolean;
  message: ''
}
export const initialState: LoaderReducerState = {
  count: 0,
  isToast: false,
  message: '',
};

export function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, count: ++state.count };
    }
    case STOP_LOADING: {
      return { ...state, count: Math.max(0, --state.count) };
    }
    case SHOW_TOAST: {
      const {isToast, message} = action.body;
      return {...state, isToast: isToast, message: message};
    }
    default:
      return state;
  }
}
