import {convertToLMLikesList} from '../../viewDataModels';
import {
  COMMENT_LIKES_SUCCESS,
  POST_LIKES_CLEAR,
  POST_LIKES_SUCCESS,
} from '../types/types';

export interface PostLikesReducerState {
  postLike: [],
  totalLikes: number,
  user: {},
}
export const initialState: PostLikesReducerState = {
  postLike: [],
  totalLikes: 0,
  user: {},
};

export function postLikesReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LIKES_SUCCESS: {
      const {totalCount, users = {}} = action.body;
      const postLikesData = convertToLMLikesList(action?.body);
      return {
        ...state,
        postLike: postLikesData,
        totalLikes: totalCount,
        user: users,
      };
    }
    case POST_LIKES_CLEAR: {
      return {...state, postLike: [], totalLikes: 0};
    }
    case COMMENT_LIKES_SUCCESS: {
      const {totalCount, users = {}} = action.body;
      const postLikesData = convertToLMLikesList(action?.body);
      return {
        ...state,
        postLike: postLikesData,
        totalLikes: totalCount,
        user: users,
      };
    }
    default:
      return state;
  }
}
