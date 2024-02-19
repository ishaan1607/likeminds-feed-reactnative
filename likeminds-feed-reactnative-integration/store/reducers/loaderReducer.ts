import { START_LOADING, STOP_LOADING } from "../types/loader";

export interface LoaderReducerState {
  count: number;
}
export const initialState: LoaderReducerState = {
  count: 0,
};

export function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, count: ++state.count };
    }
    case STOP_LOADING: {
      return { ...state, count: Math.max(0, --state.count) };
    }
    default:
      return state;
  }
}
