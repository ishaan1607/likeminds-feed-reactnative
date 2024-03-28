import React from 'react';
import {PostDetail, usePostDetailContext} from '@likeminds.community/feed-rn-core';

const DetailScreen = ({navigation}) => {
  const {route, getCommentsReplies, addNewComment, addNewReply, commentLikeHandler, handleDeleteComment, handleEditComment, handleReportComment, handleScreenBackPress, onCommentOverflowMenuClick} = usePostDetailContext();

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
  const customOnCommentDelete = (visible) => {
    console.log('before comment delete');
    handleDeleteComment(visible);
    console.log('after comment delete');
  };
  const customOnCommentEdit = (commentId) => {
    console.log('before comment edit');
    handleEditComment(commentId);
    console.log('after comment edit');
  };
  const customOnCommentReport = () => {
    console.log('before comment report');
    handleReportComment();
    console.log('after comment report');
  };
  const customBackHandler = () => {
    console.log('before back click');
    handleScreenBackPress()
    console.log('after back click');
  };
  const customCommentOverlayMenuCick = (event) => {
    console.log('before comment menuItemClick');
    onCommentOverflowMenuClick(event);
    console.log('after comment menuItemClick');
  };
  return (
    <PostDetail
      route={route}
      navigation={navigation}
      getCommentsRepliesProp={(postId, commentId, repliesResponseCallback, pageNo) => customGetCommentsRepliesProp(postId, commentId, repliesResponseCallback, pageNo)}
      addNewCommentProp={(id) => customAddNewCommentProp(id)}
      addNewReplyProp={(postId, commentId) => customAddNewReplyProp(postId, commentId)}
      commentLikeHandlerProp={(postId, commentId) => customCommentLikeHandlerProp(postId, commentId)}
      handleDeleteCommentProp={(visible) => customOnCommentDelete(visible)}
      handleEditCommentProp={(id) => customOnCommentEdit(id)}
      handleReportCommentProp={() => customOnCommentReport()}
      handleScreenBackPressProp={() => customBackHandler()}
      onCommentOverflowMenuClickProp={(event) => customCommentOverlayMenuCick(event)}
    />
  );
};

export default DetailScreen;
