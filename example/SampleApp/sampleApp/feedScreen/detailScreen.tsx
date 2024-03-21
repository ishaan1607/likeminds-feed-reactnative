import {View, Text} from 'react-native';
import React from 'react';
import {PostDetail, UniversalFeed, usePostDetailContext} from '@likeminds.community/feed-rn-core';
import {navigationRef} from '../RootNavigation';

const DetailScreen = ({navigation}) => {
  const {route, getCommentsReplies, addNewComment, addNewReply, commentLikeHandler, onCommentMenuItemSelect} = usePostDetailContext();

  const customGetCommentsRepliesProp = (postId, commentId, repliesResponseCallback, pageNo) => {
    console.log('before getComment');
    getCommentsReplies(postId, commentId, repliesResponseCallback, pageNo);
    console.log('after getComment');
  };
  const customAddNewCommentProp = (postId) => {
    console.log('before new comment');
    addNewComment(postId);
    console.log('after new comment', postId);
  };
  const customAddNewReplyProp = (postId, commentId) => {
    console.log('before add reply');
    addNewReply(postId, commentId);
    console.log('after add reply',);
  };
  const customCommentLikeHandlerProp = (postId, commentId) => {
    console.log('before like comment');
    commentLikeHandler(postId, commentId);
    console.log('after like comment');
  };
  const customOnCommentMenuItemSelectProp = (commentId, itemId) => {
    console.log('before comment menu select');
    onCommentMenuItemSelect(commentId, itemId);
    console.log('after comment menu select');
  };
  return (
    <PostDetail
      route={route}
      navigation={navigation}
      getCommentsRepliesProp={(postId, commentId, repliesResponseCallback, pageNo) => customGetCommentsRepliesProp(postId, commentId, repliesResponseCallback, pageNo)}
      addNewCommentProp={(id) => customAddNewCommentProp(id)}
      addNewReplyProp={(postId, commentId) => customAddNewReplyProp(postId, commentId)}
      commentLikeHandlerProp={(postId, commentId) => customCommentLikeHandlerProp(postId, commentId)}
      onCommentMenuItemSelectProp={(commentId, itemId) => customOnCommentMenuItemSelectProp(commentId, itemId)}
    />
  );
};

export default DetailScreen;
