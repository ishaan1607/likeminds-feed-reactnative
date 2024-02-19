import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  LMCommentItem,
  LMHeader,
  LMInputText,
  LMProfilePicture,
  LMUserUI,
  LMLoader,
} from "likeminds_feed_reactnative_ui";
import {
  POST_LIKES_LIST,
  UNIVERSAL_FEED,
} from "../../constants/screenNames";
import {
  COMMENT_LIKES,
  COMMENT_TYPE,
  POST_TYPE
} from "../../constants/Strings";
import { DeleteModal, ReportModal } from "../../customModals";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";
import Layout from "../../constants/Layout";
import {
  replaceLastMention,
} from "../../utils";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  clearComments
} from "../../store/actions/postDetail";
import {
  PostDetailContextProvider,
  PostDetailContextValues,
  usePostDetailContext,
} from "../../context";
import { postLikesClear } from "../../store/actions/postLikes";
import { getNameInitials } from "likeminds_feed_reactnative_ui/utils/utils";

const PostDetail = ({navigation, route, children }) => {
  return (
    <PostDetailContextProvider
      navigation={navigation}
      route={route}
      children={children}
    >
      <PostDetailComponent />
    </PostDetailContextProvider>
  );
};

const PostDetailComponent = React.memo(() => {  
  const dispatch = useAppDispatch();
  const {
    keyboardIsVisible,
    postDetail,
    navigation,
    allTags,
    isUserTagging,
    refreshing,
    replyOnComment,
    onRefresh,
    getCommentDetail,
    renderPostDetail,
    getCommentsReplies,
    setReplyOnComment,
    setReplyToUsername,
    modalPositionComment,
    localModalVisibility,
    showCommentActionListModal,
    onCommentMenuItemSelect,
    closeCommentActionListModal,
    commentLikeHandler,
    setCommentPageNumber,
    commentPageNumber,
    localRefresh,
    replyToUsername,
    setCommentToAdd,
    commentToAdd,
    taggedUserName,
    setAllTags,
    setIsUserTagging,
    handleLoadMore,
    isLoading,
    handleInputChange,
    routeParams,
    showReportModal,
    setShowReportModal,
    showDeleteModal,
    selectedMenuItemPostId,
    userTaggingListHeight,
    editCommentFocus,
    commentFocus,
    commentEdit,
    addNewComment,
    handleDeleteComment,
    addNewReply,
    handleDeletePost,
    myRef,
  }: PostDetailContextValues = usePostDetailContext();

  const LMFeedContextStyles = useLMFeedStyles();
  const { postDetailStyle, postListStyle } = LMFeedContextStyles;

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.flexView}>
      <KeyboardAvoidingView
        enabled={Platform.OS === "android" ? true : false}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={
        //   Platform.OS === "android"
        //     ? keyboardIsVisible
        //       ? 0
        //       : Layout.normalize(32)
        //     : 0
        // }
        style={styles.flexView}
      >
        {/* header view */}
        <LMHeader
          showBackArrow={
            postDetailStyle?.screenHeader?.showBackArrow
              ? postDetailStyle?.screenHeader?.showBackArrow
              : true
          }
          heading={
            postDetailStyle?.screenHeader?.heading
              ? postDetailStyle?.screenHeader?.heading
              : "Post"
          }
          subHeading={
            postDetailStyle?.screenHeader?.subHeading
              ? postDetailStyle?.screenHeader?.subHeading
              : postDetail?.id
              ? postDetail?.commentsCount > 1
                ? `${postDetail?.commentsCount} comments`
                : `${postDetail?.commentsCount} comment`
              : ""
          }
          onBackPress={() => {
            Keyboard.dismiss();
            navigation.navigate(UNIVERSAL_FEED);
            postDetailStyle?.screenHeader?.onBackPress();
          }}
          rightComponent={postDetailStyle?.screenHeader?.rightComponent}
          backIcon={postDetailStyle?.screenHeader?.backIcon}
          subHeadingTextStyle={
            postDetailStyle?.screenHeader?.subHeadingTextStyle
          }
          headingTextStyle={postDetailStyle?.screenHeader?.headingTextStyle}
          headingViewStyle={postDetailStyle?.screenHeader?.headingViewStyle}
        />
        {/* post detail view */}
        {Object.keys(postDetail).length > 0 ? (
          <View
            style={StyleSheet.flatten([
              styles.mainContainer,
              {
                paddingBottom:
                  allTags && isUserTagging
                    ? 0
                    : replyOnComment.textInputFocus
                    ? Layout.normalize(104)
                    : keyboardIsVisible? Layout.normalize(74): Layout.normalize(54),
              },
            ])}
          >
            <>
              {/* this renders when the post has commentsCount greater than 0 */}
              <View>
                <FlatList
                  refreshing={refreshing}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  keyboardShouldPersistTaps={"handled"}
                  ListHeaderComponent={
                    // this renders the post section
                    <>
                      {renderPostDetail()}
                      {postDetail?.commentsCount > 0 && (
                        <Text
                          style={[
                            styles.commentCountText,
                            postDetailStyle?.commentCountHeadingText,
                          ]}
                        >
                          {postDetail.commentsCount > 1
                            ? `${postDetail.commentsCount} Comments`
                            : `${postDetail.commentsCount} Comment`}
                        </Text>
                      )}
                    </>
                  }
                  data={postDetail?.replies}
                  renderItem={({ item }) => {
                    // this renders the comments section
                    return (
                      <>
                        {item && (
                          <LMCommentItem
                            comment={item}
                            // this calls the getCommentsReplies function on click of number of child replies text
                            onTapReplies={(repliesResponseCallback) => {
                              dispatch(clearComments(item?.id));
                              getCommentsReplies(
                                item?.postId,
                                item?.id,
                                repliesResponseCallback,
                                1
                              );
                              postDetailStyle?.commentItemStyle?.onTapReplies();
                            }}
                            // this handles the pagination of child replies on click of view more
                            onTapViewMore={(
                              pageValue,
                              repliesResponseCallback
                            ) => {
                              getCommentsReplies(
                                item?.postId,
                                item?.id,
                                repliesResponseCallback,
                                pageValue
                              );
                              postDetailStyle?.commentItemStyle?.onTapViewMore();
                            }}
                            // this hanldes the functionality on click of reply text to add reply to an comment
                            replyTextProps={{
                              ...postDetailStyle?.commentItemStyle
                                ?.replyTextProps,
                              onTap: () => {
                                setReplyOnComment({
                                  textInputFocus: true,
                                  commentId: item?.id,
                                });
                                setReplyToUsername(item?.user?.name);
                                postDetailStyle?.commentItemStyle?.replyTextProps?.onTap();
                              },
                            }}
                            // view more text style
                            viewMoreRepliesProps={{
                              ...postDetailStyle?.commentItemStyle
                                ?.viewMoreRepliesProps,
                              children: postDetailStyle?.commentItemStyle
                                ?.viewMoreRepliesProps?.children ? (
                                postDetailStyle?.commentItemStyle
                                  ?.viewMoreRepliesProps?.children
                              ) : (
                                <Text></Text>
                              ),
                              textStyle: postDetailStyle?.commentItemStyle
                                ?.viewMoreRepliesProps?.textStyle
                                ? postDetailStyle?.commentItemStyle
                                    ?.viewMoreRepliesProps?.textStyle
                                : styles.viewMoreText,
                            }}
                            // comment menu item props
                            commentMenu={{
                              postId: item?.id,
                              menuItems: item?.menuItems,
                              modalPosition: modalPositionComment,
                              modalVisible: showCommentActionListModal,
                              onCloseModal: closeCommentActionListModal,
                              onSelected: (commentId, itemId) =>
                                onCommentMenuItemSelect(commentId, itemId),
                            }}
                            menuIcon={{
                              ...postDetailStyle?.commentItemStyle?.menuIcon,
                              onTap: () => {
                                setReplyOnComment({
                                  textInputFocus: false,
                                  commentId: "",
                                });
                                postDetailStyle?.commentItemStyle?.menuIcon?.onTap();
                              },
                            }}
                            // this executes on click of like icon of comment
                            likeIconButton={{
                              ...postDetailStyle?.commentItemStyle
                                ?.likeIconButton,
                              onTap: (id) => {
                                commentLikeHandler(item?.postId, id);
                                postDetailStyle?.commentItemStyle?.likeIconButton?.onTap();
                              },
                            }}
                            // this executes on click of like text of comment
                            likeTextButton={{
                              ...postDetailStyle?.commentItemStyle
                                ?.likeTextButton,
                              onTap: (id) => {
                                dispatch(postLikesClear())
                                navigation.navigate(POST_LIKES_LIST, [
                                  COMMENT_LIKES,
                                  id,
                                  item?.postId,
                                ]);
                                postDetailStyle?.commentItemStyle?.likeTextButton?.onTap();
                              },
                            }}
                            commentUserNameStyle={
                              postDetailStyle?.commentItemStyle
                                ?.commentUserNameStyle
                            }
                            commentContentProps={
                              postDetailStyle?.commentItemStyle
                                ?.commentContentProps
                            }
                            showMoreProps={
                              postDetailStyle?.commentItemStyle?.showMoreProps
                            }
                            repliesCountTextStyle={
                              postDetailStyle?.commentItemStyle
                                ?.repliesCountTextStyle
                            }
                            timeStampStyle={
                              postDetailStyle?.commentItemStyle?.timeStampStyle
                            }
                          />
                        )}
                      </>
                    );
                  }}
                  ListEmptyComponent={
                    <View
                      style={[
                        styles.noCommentSection,
                        postDetailStyle?.noCommentViewStyle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.noCommentText,
                          postDetailStyle?.noCommentHeadingTextStyle,
                        ]}
                      >
                        No comment found
                      </Text>
                      <Text
                        style={[
                          styles.lightGreyColorText,
                          postDetailStyle?.noCommentSubHeadingTextStyle,
                        ]}
                      >
                        Be the first one to comment
                      </Text>
                    </View>
                  }
                  onEndReachedThreshold={0.3}
                  onEndReached={() => {
                    setCommentPageNumber(commentPageNumber + 1);
                  }}
                />
              </View>
            </>
          </View>
        ) : (
          <View style={styles.loaderView}>{!localRefresh && <LMLoader />}</View>
        )}
        {/* replying to username view which renders when the user is adding a reply to a comment */}
        {replyOnComment.textInputFocus && (
          <View
            style={[
              styles.replyCommentSection,
              postDetailStyle?.replyingViewStyle?.replyingView,
            ]}
          >
            {postDetailStyle?.replyingViewStyle?.replyingText ? (
              postDetailStyle?.replyingViewStyle?.replyingText
            ) : (
              <Text style={styles.lightGreyColorText}>
                Replying to {replyToUsername}
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setReplyOnComment({
                  textInputFocus: false,
                  commentId: "",
                })
              }
            >
              {postDetailStyle?.replyingViewStyle?.cancelReplyIcon ? (
                postDetailStyle?.replyingViewStyle?.cancelReplyIcon
              ) : (
                <Image
                  source={require("../../assets/images/close_icon3x.png")}
                  style={styles.crossIconStyle}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
        {/* users tagging list */}
        {allTags && isUserTagging ? (
          <View
            style={[
              styles.taggingListView,
              {
                paddingBottom: replyOnComment.textInputFocus
                  ? Layout.normalize(104)
                  :keyboardIsVisible?  Layout.normalize(74):  Layout.normalize(54),
                height: userTaggingListHeight,
              },
              postDetailStyle?.userTaggingListStyle?.taggingListView,
            ]}
          >
            <FlatList
              data={[...allTags]}
              renderItem={({ item }: { item: LMUserUI }) => {
                return (
                  <Pressable
                    onPress={() => {
                      const uuid = item?.sdkClientInfo?.uuid;
                      const res = replaceLastMention(
                        commentToAdd,
                        taggedUserName,
                        item?.name,
                        uuid ? `user_profile/${uuid}` : uuid
                      );
                      setCommentToAdd(res);
                      setAllTags([]);
                      setIsUserTagging(false);
                    }}
                    style={[
                      styles.taggingListItem,
                      postDetailStyle?.userTaggingListStyle?.userTagView,
                    ]}
                    key={item?.id}
                  >
                    <LMProfilePicture
                      {...postDetailStyle?.userTaggingListStyle
                        ?.userTagProfileImageStyle}
                      fallbackText={{
                        ...postDetailStyle?.userTaggingListStyle
                          ?.userTagProfileImageStyle?.fallbackText,
                        children: postDetailStyle?.userTaggingListStyle
                          ?.userTagProfileImageStyle?.fallbackText?.children ? (
                          postDetailStyle?.userTaggingListStyle
                            ?.userTagProfileImageStyle?.fallbackText?.children
                        ) : (
                          <Text>{getNameInitials(item?.name)}</Text>
                        ),
                      }}
                      fallbackTextBoxStyle={[
                        styles.taggingListProfileBoxStyle,
                        postDetailStyle?.userTaggingListStyle
                          ?.userTagProfileImageStyle?.fallbackTextBoxStyle,
                      ]}
                      size={
                        postDetailStyle?.userTaggingListStyle
                          ?.userTagProfileImageStyle?.size
                          ? postDetailStyle?.userTaggingListStyle
                              ?.userTagProfileImageStyle?.size
                          : 40
                      }
                    />

                    <View style={styles.taggingListItemTextView}>
                      <Text
                        style={[
                          styles.taggingListText,
                          postDetailStyle?.userTaggingListStyle
                            ?.userTagNameStyle,
                        ]}
                        numberOfLines={1}
                      >
                        {item?.name}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              extraData={{
                value: [commentToAdd, allTags],
              }}
              keyboardShouldPersistTaps={"handled"}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              bounces={false}
              ListFooterComponent={
                isLoading ? (
                  <View style={styles.taggingLoaderView}>
                    <LMLoader size={15} />
                  </View>
                ) : null
              }
              keyExtractor={(item: any, index) => {
                return index?.toString();
              }}
            />
          </View>
        ) : null}

        {/* input field */}
        <LMInputText
          {...postDetailStyle?.commentTextInputStyle}
          inputText={commentToAdd}
          onType={handleInputChange}
          inputTextStyle={[
            styles.textInputStyle,{bottom: keyboardIsVisible? Layout.normalize(25): 0},
            postDetailStyle?.commentTextInputStyle?.inputTextStyle,
          ]}
          autoFocus={
            postDetailStyle?.commentTextInputStyle?.autoFocus
              ? postDetailStyle?.commentTextInputStyle?.autoFocus
              : routeParams
              ? true
              : replyOnComment.textInputFocus
              ? true
              : editCommentFocus
              ? true
              : commentFocus
          }
          placeholderText={
            postDetailStyle?.commentTextInputStyle?.placeholderText
              ? postDetailStyle?.commentTextInputStyle?.placeholderText
              : "Write a comment"
          }
          placeholderTextColor={
            postDetailStyle?.commentTextInputStyle?.placeholderTextColor
              ? postDetailStyle?.commentTextInputStyle?.placeholderTextColor
              : "#9B9B9B"
          }
          disabled={
            postDetailStyle?.commentTextInputStyle?.disabled
              ? postDetailStyle?.commentTextInputStyle?.disabled
              : postDetail?.id
              ? false
              : true
          }
          inputRef={myRef}
          rightIcon={
            postDetailStyle?.commentTextInputStyle?.rightIcon
              ? postDetailStyle.commentTextInputStyle.rightIcon
              : {
                  onTap: () => {
                    commentToAdd
                      ? editCommentFocus
                        ? commentEdit()
                        : replyOnComment.textInputFocus
                        ? addNewReply(postDetail?.id, replyOnComment.commentId)
                        : addNewComment(postDetail?.id)
                      : {};
                  },
                  icon: {
                    type: "png",
                    assetPath: require("../../assets/images/send_icon3x.png"),
                    iconStyle: { opacity: commentToAdd ? 1 : 0.7 },
                  },
                  isClickable: commentToAdd ? false : true,
                }
          }
          multilineField={
            postDetailStyle?.commentTextInputStyle?.multilineField
              ? postDetailStyle?.commentTextInputStyle?.multilineField
              : true
          }
          partTypes={[
            {
              trigger: "@", // Should be a single character like '@' or '#'
              textStyle: {
                color: "blue",
              }, // The mention style in the input
            },
          ]}
        />
      </KeyboardAvoidingView>

      {/* delete post modal */}
      {localModalVisibility && (
        <DeleteModal
          visible={showDeleteModal}
          displayModal={(visible) =>
            selectedMenuItemPostId
              ? handleDeletePost(visible)
              : handleDeleteComment(visible)
          }
          deleteType={selectedMenuItemPostId ? POST_TYPE : COMMENT_TYPE}
          postDetail={postDetail}
          commentDetail={getCommentDetail(postDetail?.replies)}
        />
      )}
      {/* report post modal */}
      {showReportModal && (
        <ReportModal
          visible={showReportModal}
          closeModal={() => setShowReportModal(false)}
          reportType={selectedMenuItemPostId ? POST_TYPE : COMMENT_TYPE}
          postDetail={postDetail}
          commentDetail={getCommentDetail(postDetail?.replies)}
        />
      )}
    </SafeAreaView>
  );
});

export { PostDetail };
