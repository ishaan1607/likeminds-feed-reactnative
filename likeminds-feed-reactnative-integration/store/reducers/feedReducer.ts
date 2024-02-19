import { LMPostUI } from "likeminds_feed_reactnative_ui";
import { convertUniversalFeedPosts } from "../../viewDataModels";
import { PIN_POST_ID, PIN_THIS_POST, UNPIN_POST_ID, UNPIN_THIS_POST } from "../../constants/Strings";
import {
  UNIVERSAL_FEED_SUCCESS,
  REPORT_TAGS_SUCCESS,
  PIN_POST_STATE,
  DELETE_POST_STATE,
  UNIVERSAL_FEED_REFRESH_SUCCESS,
  LIKE_POST_STATE,
  SAVE_POST_STATE
} from '../types/types';

export interface FeedReducerState {
  feed: LMPostUI[],
  users: {},
  reportTags: {}
}

export const initialState: FeedReducerState = {
  feed: [],
  users: {},
  reportTags: {}
}
export const feedReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UNIVERSAL_FEED_SUCCESS: {
        const {users = {}} = action.body;
        let feedData = state.feed;
        let usersData = state.users;
        // model converter function  
        const post = convertUniversalFeedPosts(action.body)
        // this handles pagination and appends new post data with previous data
        feedData = feedData ? [...feedData, ...post] : [...post];       
        // this appends the new users data with previous data
        usersData = {...usersData, ...users};
        return {...state, feed: feedData, users: usersData};
    }
    case UNIVERSAL_FEED_REFRESH_SUCCESS: {
      const {users = {}} = action.body;
      // model converter function
      const post = convertUniversalFeedPosts(action.body);
      return {...state, feed: post, users: users};
    }
    case DELETE_POST_STATE: {
      const updatedFeed = state.feed;
      // this gets the index of the post that is deleted
      const deletedPostIndex = updatedFeed.findIndex(
        (item: LMPostUI) => item?.id === action.body,
      );
      // removes that post from the data
      updatedFeed.splice(deletedPostIndex, 1);
      return {...state, feed: updatedFeed};
    }
    case REPORT_TAGS_SUCCESS: {
      const {reportTags = {}} = action.body;
      return {...state, reportTags: reportTags};
    }
    case PIN_POST_STATE: {
      const updatedFeed = state.feed;
      // this gets the index of post that is pinned
      const pinnedPostIndex = updatedFeed.findIndex(
        (item: any) => item?.id === action.body,
      );
      // this updates the isPinned value
      updatedFeed[pinnedPostIndex].isPinned =
        !updatedFeed[pinnedPostIndex].isPinned;
      // this gets the index of pin/unpin from menu item
      const menuItemIndex = updatedFeed[pinnedPostIndex].menuItems.findIndex(
        (item: any) => item.id === PIN_POST_ID || item.id === UNPIN_POST_ID,
      );
      if (updatedFeed[pinnedPostIndex].isPinned) {
        //  this updates the menuItem title to unpin
        updatedFeed[pinnedPostIndex].menuItems[menuItemIndex].id =
          UNPIN_POST_ID;
        updatedFeed[pinnedPostIndex].menuItems[menuItemIndex].title =
          UNPIN_THIS_POST;
      } else {
        //  this updates the menuItem title to pin
        updatedFeed[pinnedPostIndex].menuItems[menuItemIndex].id = PIN_POST_ID;
        updatedFeed[pinnedPostIndex].menuItems[menuItemIndex].title =
          PIN_THIS_POST;
      }

      return {...state, feed: updatedFeed};
    }
    case LIKE_POST_STATE: {
      const updatedFeed = state.feed;
      // this gets the index of post that is liked
      const likedPostIndex = updatedFeed.findIndex(
        (item: LMPostUI) => item?.id === action.body,
      );
      // this updates the isLiked value
      updatedFeed[likedPostIndex].isLiked =
        !updatedFeed[likedPostIndex].isLiked;
      if (updatedFeed[likedPostIndex].isLiked) {
        // increase the like count
        updatedFeed[likedPostIndex].likesCount =
          updatedFeed[likedPostIndex].likesCount + 1;
      } else {
        // decrease the like count
        updatedFeed[likedPostIndex].likesCount =
          updatedFeed[likedPostIndex].likesCount - 1;
      }
      return {...state, feed: updatedFeed};
    }
    case SAVE_POST_STATE: {
      const updatedFeed = state.feed;
      // this gets the index of post that is saved
      const savedPostIndex = updatedFeed.findIndex(
        (item: any) => item?.id === action.body,
      );
      // this updates the isSaved value
      updatedFeed[savedPostIndex].isSaved =
        !updatedFeed[savedPostIndex].isSaved;

      return {...state, feed: updatedFeed};
    }
    default:
      return state;
  }
};
