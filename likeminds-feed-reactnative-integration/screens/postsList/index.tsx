import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GetFeedRequest,
  LikePostRequest,
  PinPostRequest,
  SavePostRequest,
} from "@likeminds.community/feed-js-beta";
import { styles } from "./styles";
import { LMPost, LMPostUI, LMLoader } from "likeminds_feed_reactnative_ui";
import {
  DELETE_POST_MENU_ITEM,
  EDIT_POST_MENU_ITEM,
  IMAGE_ATTACHMENT_TYPE,
  NAVIGATED_FROM_COMMENT,
  NAVIGATED_FROM_POST,
  PIN_POST_MENU_ITEM,
  POST_LIKES,
  POST_TYPE,
  REPORT_POST_MENU_ITEM,
  UNPIN_POST_MENU_ITEM,
  VIDEO_ATTACHMENT_TYPE,
} from "../../constants/Strings";
import {
  CREATE_POST,
  POST_LIKES_LIST,
  POST_DETAIL,
} from "../../constants/screenNames";
// @ts-ignore the lib do not have TS declarations yet
import _ from "lodash";
import { DeleteModal, ReportModal } from "../../customModals";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getFeed,
  likePost,
  pinPost,
  pinPostStateHandler,
  refreshFeed,
  savePost,
} from "../../store/actions/feed";
import { clearPostDetail } from "../../store/actions/postDetail";
import {
  PostListContextProvider,
  PostListContextValues,
  UniversalFeedContextValues,
  usePostListContext,
  useUniversalFeedContext,
} from "../../context";
import { postLikesClear } from "../../store/actions/postLikes";

const PostsList = ({ route, children }: any) => {
  const {
    navigation
  }: UniversalFeedContextValues = useUniversalFeedContext();
  return (
    <PostListContextProvider
      navigation={navigation}
      route={route}
      children={children}
    >
      <PostsListComponent />
    </PostListContextProvider>
  );
};

const PostsListComponent = React.memo(() => {
  const dispatch = useAppDispatch();
  const {
    listRef,
    refreshing,
    onRefresh,
    localRefresh,
  }: UniversalFeedContextValues = useUniversalFeedContext();
  const {
    navigation,
    feedData,
    feedFetching,
    modalPosition,
    showActionListModal,
    closePostActionListModal,
    onMenuItemSelect,
    postLikeHandler,
    debouncedSaveFunction,
    setFeedPageNumber,
    feedPageNumber,
    renderLoader,
    showLoader,
    showDeleteModal,
    showReportModal,
    getPostDetail,
    setShowReportModal,
    handleDeletePost,
    
  }: PostListContextValues = usePostListContext();
  const LMFeedContextStyles = useLMFeedStyles();
  const { postListStyle, loaderStyle } = LMFeedContextStyles;

  return (
    <>
      {/* posts list section */}
      {!feedFetching ? (
        feedData?.length > 0 ? (
          <FlatList
            ref={listRef}
            refreshing={refreshing}
            style={postListStyle?.listStyle}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={feedData}
            renderItem={({ item }: { item: LMPostUI }) => (
              <TouchableOpacity
                disabled={
                  item?.attachments &&
                  item?.attachments?.filter(
                    (media) =>
                      media?.attachmentType === IMAGE_ATTACHMENT_TYPE ||
                      media?.attachmentType === VIDEO_ATTACHMENT_TYPE
                  ).length >= 2
                    ? true
                    : false
                }
                activeOpacity={0.8}
                style={{ backgroundColor: "#e0e0e0" }}
                onPress={() => {
                  dispatch(clearPostDetail() as any);
                  navigation.navigate(POST_DETAIL, [
                    item?.id,
                    NAVIGATED_FROM_POST,
                  ]);
                }}
              >
                <LMPost
                  post={item}
                  // header props
                  headerProps={{
                    post: item,
                    postMenu: {
                      postId: item?.id,
                      menuItems: item?.menuItems,
                      modalPosition: modalPosition,
                      modalVisible: showActionListModal,
                      onCloseModal: closePostActionListModal,
                      onSelected: (postId, itemId) =>
                        onMenuItemSelect(postId, itemId, item?.isPinned),
                      ...postListStyle?.header?.postMenu,
                    },
                    onTap: () => {
                      postListStyle?.header?.onTap();
                    },
                    showMenuIcon: postListStyle?.header?.showMenuIcon
                      ? postListStyle?.header?.showMenuIcon
                      : true,
                    showMemberStateLabel: postListStyle?.header
                      ?.showMemberStateLabel
                      ? postListStyle?.header?.showMemberStateLabel
                      : true,
                    profilePicture: postListStyle?.header?.profilePicture,
                    titleText: postListStyle?.header?.titleText,
                    createdAt: postListStyle?.header?.createdAt,
                    memberStateViewStyle:
                      postListStyle?.header?.memberStateViewStyle,
                    memberStateTextStyle:
                      postListStyle?.header?.memberStateTextStyle,
                    postHeaderViewStyle:
                      postListStyle?.header?.postHeaderViewStyle,
                    pinIcon: postListStyle?.header?.pinIcon,
                    menuIcon: postListStyle?.header?.menuIcon,
                  }}
                  // footer props
                  footerProps={{
                    isLiked: item?.isLiked,
                    isSaved: item?.isSaved,
                    likesCount: item?.likesCount,
                    commentsCount: item?.commentsCount,
                    showBookMarkIcon: postListStyle?.footer?.showBookMarkIcon
                      ? postListStyle?.footer?.showBookMarkIco
                      : true,
                    showShareIcon: postListStyle?.footer?.showShareIcon
                      ? postListStyle?.footer?.showShareIcon
                      : true,
                    likeIconButton: {
                      ...postListStyle?.footer?.likeIconButton,
                      onTap: () => {
                        postLikeHandler(item?.id);
                        postListStyle?.footer?.likeIconButton?.onTap();
                      },
                    },
                    saveButton: {
                      ...postListStyle?.footer?.saveButton,
                      onTap: () => {
                        debouncedSaveFunction(item?.id, item?.isSaved);
                        postListStyle?.footer?.saveButton?.onTap();
                      },
                    },
                    likeTextButton: {
                      ...postListStyle?.footer?.likeTextButton,
                      onTap: () => {
                          dispatch(postLikesClear());
                        navigation.navigate(POST_LIKES_LIST, [POST_LIKES, item?.id]);
                        postListStyle?.footer?.likeTextButton?.onTap();
                      },
                    },
                    commentButton: {
                      ...postListStyle?.footer?.commentButton,
                      onTap: () => {
                        dispatch(clearPostDetail());
                        navigation.navigate(POST_DETAIL, [
                          item?.id,
                          NAVIGATED_FROM_COMMENT,
                        ]);
                        postListStyle?.footer?.commentButton?.onTap();
                      },
                    },
                    shareButton: postListStyle?.footer?.shareButton,
                    footerBoxStyle: postListStyle?.footer?.footerBoxStyle,
                  }}
                  mediaProps={{
                    attachments: item?.attachments ? item.attachments : [],
                    imageProps: postListStyle?.media?.image,
                    videoProps: {
                      ...postListStyle?.media?.video,
                      videoUrl: "",
                      showControls: postListStyle?.media?.video?.showControls
                        ? postListStyle?.media?.video?.showControls
                        : true,
                    },
                    carouselProps: {
                      ...postListStyle?.media?.carousel,
                      attachments: item?.attachments ? item.attachments : [],
                      videoItem: {
                        ...postListStyle?.media?.carousel?.videoItem,
                        videoUrl: "",
                        showControls: postListStyle?.media?.carousel?.videoItem
                          ?.showControls
                          ? postListStyle?.media?.carousel?.videoItem
                              ?.showControls
                          : true,
                      },
                    },
                    documentProps: postListStyle?.media?.document,
                    linkPreviewProps: postListStyle?.media?.linkPreview,
                    postMediaStyle: postListStyle?.media?.postMediaStyle,
                  }}
                  contentProps={postListStyle?.postContent}
                />
              </TouchableOpacity>
            )}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
              setFeedPageNumber(feedPageNumber + 1);
            }}
            ListFooterComponent={<>{showLoader > 0 && renderLoader()}</>}
          />
        ) : (
          <View style={[styles.noDataView, postListStyle?.noPostView]}>
            <Text style={postListStyle?.noPostText}>No Post</Text>
          </View>
        )
      ) : (
        <View style={styles.loaderView}>
          {!localRefresh && <LMLoader {...loaderStyle?.loader} />}
        </View>
      )}

      {/* delete post modal */}
      {showDeleteModal && (
        <DeleteModal
          visible={showDeleteModal}
          displayModal={(visible) => handleDeletePost(visible)}
          deleteType={POST_TYPE}
          postDetail={getPostDetail()}
          navigation={navigation}
        />
      )}
      {/* report post modal */}
      {showReportModal && (
        <ReportModal
          visible={showReportModal}
          closeModal={() => setShowReportModal(false)}
          reportType={POST_TYPE}
          postDetail={getPostDetail()}
        />
      )}
    </>
  );
});

export { PostsList };
