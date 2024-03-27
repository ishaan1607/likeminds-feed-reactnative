import React from 'react';
import { UniversalFeed, usePostListContext, useUniversalFeedContext} from '@likeminds.community/feed-rn-core';

const Feed = ({route}) => {
  const {
    postLikeHandler,
    savePostHandler,
    handleEditPost,
    handlePinPost,
    onTapCommentCount,
  } = usePostListContext();
  const {navigation} = useUniversalFeedContext()

  const customPostLike = (postId) => {
    console.log('before like ');
    postLikeHandler(postId);
    console.log('after like', postId);
  }; const customPostSave = (postId, saved) => {
    console.log('before save');
    savePostHandler(postId, saved);
    console.log('after save', postId, saved);
  }; const customHandleEdit = (postId) => {
    console.log('before edit select');
    handleEditPost(postId);
    console.log('after edit select', postId);
  }; const customHandlePin = (postId, pinned) => {
    console.log('before pin select');
    handlePinPost(postId, pinned);
    console.log('after pin select', postId, pinned);
  }; 
  const customHandleCommentClick = (postId) => {
    console.log('before comment select');
    onTapCommentCount(postId);
    console.log('after comment select', postId);
  };
  return (
      <UniversalFeed
        navigation={navigation}
        route={route}
        postLikeHandlerProp={(id) => customPostLike(id)}
        savePostHandlerProp={(id, saved) => customPostSave(id, saved)}
        onSelectCommentCountProp={(id) => customHandleCommentClick(id)}
        selectEditPostProp={(id) => customHandleEdit(id)}
        selectPinPostProp={(id, pinned) => customHandlePin(id, pinned)}
      >
      </UniversalFeed>
  );
};

export default Feed;
