import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { POST_LIKES_LIST, UNIVERSAL_FEED } from "../../constants/screenNames";
import {
  COMMENT_LIKES,
  COMMENT_TYPE,
  POST_TYPE,
  VIEW_MORE_TEXT
} from "../../constants/Strings";
import { DeleteModal, ReportModal } from "../../customModals";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";
import Layout from "../../constants/Layout";
import {
  replaceLastMention,
} from "../../utils";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { useAppDispatch } from "../../store/store";
import {
  clearComments
} from "../../store/actions/postDetail";
import {
  PostDetailContextProvider,
  PostDetailContextValues,
  usePostDetailContext,
} from "../../context";
import { postLikesClear } from "../../store/actions/postLikes";
import { SafeAreaView } from "react-native-safe-area-context";
import { LMCommentItem, LMHeader, LMLoader } from "../../components";
import { LMUserUI, RootStackParamList } from "../../models";
import {
  LMIcon,
  LMInputText,
  LMProfilePicture,
  LMText,
} from "../../uiComponents";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface PostDetailProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList, "PostDetail">;
  route: {
    key: string;
    name: string;
    params: Array<string>;
    path: undefined;
  };
  getCommentsRepliesProp: (
    postId: string,
    commentId: string,
    repliesResponseCallback: any,
    pageNo: number
  ) => void;
  addNewCommentProp: (postId: string) => void;
  addNewReplyProp: (postId: string, commentId: string) => void;
  commentLikeHandlerProp: (postId: string, commentId: string) => void;
  onCommentMenuItemSelectProp: (commentId: string, itemId?: number) => void;
}

const PostDetail = ({
  navigation,
  route,
  children,
  onCommentMenuItemSelectProp,
  getCommentsRepliesProp,
  commentLikeHandlerProp,
  addNewCommentProp,
  addNewReplyProp,
}: PostDetailProps) => {
  return (
    <PostDetailContextProvider
      navigation={navigation}
      route={route}
      children={children}
    >
      <PostDetailCustomisableMethodsContextProvider
        getCommentsRepliesProp={getCommentsRepliesProp}
        commentLikeHandlerProp={commentLikeHandlerProp}
        addNewCommentProp={addNewCommentProp}
        onCommentMenuItemSelectProp={onCommentMenuItemSelectProp}
        addNewReplyProp={addNewReplyProp}
      >
        <PostDetailComponent />
      </PostDetailCustomisableMethodsContextProvider>
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
    navigatedFromComments,
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
    keyboardFocusOnReply,
    setKeyboardFocusOnReply,
    showRepliesOfCommentId,
  }: PostDetailContextValues = usePostDetailContext();

  const LMFeedContextStyles = useLMFeedStyles();
  const { postDetailStyle, postListStyle } = LMFeedContextStyles;
  const {
    onCommentMenuItemSelectProp,
    getCommentsRepliesProp,
    commentLikeHandlerProp,
    addNewCommentProp,
    addNewReplyProp,
  } = usePostDetailCustomisableMethodsContext();
  const postHeaderStyle = postListStyle?.header;
  const customScreenHeader = postDetailStyle?.screenHeader;
  const customCommentItemStyle = postDetailStyle?.commentItemStyle;
  const customReplyingViewStyle = postDetailStyle?.replyingViewStyle;
  const customCommentTextInput = postDetailStyle?.commentTextInputStyle;

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.flexView}>
      <KeyboardAvoidingView
       enabled={true}
       behavior={"height"}
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
            customScreenHeader?.heading ? customScreenHeader?.heading : "Post"
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
          rightComponent={customScreenHeader?.rightComponent}
          backIcon={customScreenHeader?.backIcon}
          subHeadingTextStyle={customScreenHeader?.subHeadingTextStyle}
          headingTextStyle={customScreenHeader?.headingTextStyle}
          headingViewStyle={customScreenHeader?.headingViewStyle}
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
                    ? Platform.OS === "android"
                      ? keyboardFocusOnReply
                        ? navigatedFromComments
                          ? Layout.normalize(94)
                          : Layout.normalize(114)
                        : Layout.normalize(94)
                      : Layout.normalize(94)
                    : keyboardIsVisible
                    ? navigatedFromComments
                      ? Layout.normalize(64)
                      : Layout.normalize(84)
                    : Layout.normalize(64),
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
                            isRepliesVisible={
                              item?.id === showRepliesOfCommentId
                            }
                            // this calls the getCommentsReplies function on click of number of child replies text
                            onTapReplies={(repliesResponseCallback) => {
                              dispatch(clearComments(item?.id));
                              getCommentsRepliesProp
                                ? getCommentsRepliesProp(
                                    item?.postId,
                                    item?.id,
                                    repliesResponseCallback,
                                    1
                                  )
                                : getCommentsReplies(
                                    item?.postId,
                                    item?.id,
                                    repliesResponseCallback,
                                    1
                                  );
                              customCommentItemStyle?.onTapReplies &&
                                customCommentItemStyle?.onTapReplies();
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
                              customCommentItemStyle?.onTapViewMore &&
                                customCommentItemStyle?.onTapViewMore();
                            }}
                            // this hanldes the functionality on click of reply text to add reply to an comment
                            replyTextProps={{
                              ...customCommentItemStyle?.replyTextProps,
                              onTap: () => {
                                setKeyboardFocusOnReply(true)
                                setReplyOnComment({
                                  textInputFocus: true,
                                  commentId: item?.id,
                                });
                                setReplyToUsername(item?.user?.name);
                                customCommentItemStyle?.replyTextProps?.onTap &&
                                  customCommentItemStyle?.replyTextProps?.onTap();
                              },
                            }}
                            // view more text style
                            viewMoreRepliesProps={{
                              ...customCommentItemStyle?.viewMoreRepliesProps,
                              children: customCommentItemStyle
                                ?.viewMoreRepliesProps?.children ? (
                                customCommentItemStyle?.viewMoreRepliesProps
                                  ?.children
                              ) : (
                                <Text>{VIEW_MORE_TEXT}</Text>
                              ),
                              textStyle: postDetailStyle?.commentItemStyle
                                ?.viewMoreRepliesProps?.textStyle
                                ? customCommentItemStyle?.viewMoreRepliesProps
                                    ?.textStyle
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
                                onCommentMenuItemSelectProp
                                  ? onCommentMenuItemSelectProp(
                                      commentId,
                                      itemId
                                    )
                                  : onCommentMenuItemSelect(commentId, itemId),
                              menuItemTextStyle:
                                postHeaderStyle?.postMenu?.menuItemTextStyle,
                              menuViewStyle:
                                postHeaderStyle?.postMenu?.menuViewStyle,
                              backdropColor:
                                postHeaderStyle?.postMenu?.backdropColor,
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
                                commentLikeHandlerProp
                                  ? commentLikeHandlerProp(item?.postId, id)
                                  : commentLikeHandler(item?.postId, id);
                                postListStyle?.footer?.likeIconButton?.onTap();
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
                              customCommentItemStyle?.commentUserNameStyle
                            }
                            commentContentProps={
                              customCommentItemStyle?.commentContentProps
                            }
                            showMoreProps={
                              postDetailStyle?.commentItemStyle?.showMoreProps
                            }
                            repliesCountTextStyle={
                              customCommentItemStyle?.repliesCountTextStyle
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
              {
                bottom:
                  Platform.OS === "android"
                    ? keyboardIsVisible
                      ? navigatedFromComments
                        ? Layout.normalize(64)
                        : Layout.normalize(84)
                      : Layout.normalize(64)
                    : Layout.normalize(64),
              },
              customReplyingViewStyle?.replyingView,
            ]}
          >
            {postDetailStyle?.replyingViewStyle?.replyingText ? (
              postDetailStyle?.replyingViewStyle?.replyingText
            ) : (
              <Text
                style={[
                  styles.lightGreyColorText,
                  customReplyingViewStyle?.replyingText?.textStyle,
                ]}
              >
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
              {customReplyingViewStyle?.cancelReplyIcon?.assetPath ||
              customReplyingViewStyle?.cancelReplyIcon?.iconUrl ? (
                <LMIcon {...customReplyingViewStyle?.cancelReplyIcon} />
              ) : (
                <Image
                  source={require("../../assets/images/close_icon3x.png")}
                  style={[
                    customReplyingViewStyle?.cancelReplyIcon?.iconStyle,
                    {
                      width: customReplyingViewStyle?.cancelReplyIcon?.width
                        ? customReplyingViewStyle?.cancelReplyIcon?.width
                        : styles.crossIconStyle?.width,
                      height: customReplyingViewStyle?.cancelReplyIcon?.height
                        ? customReplyingViewStyle?.cancelReplyIcon?.height
                        : styles.crossIconStyle?.height,
                    },
                  ]}
                  tintColor={
                    customReplyingViewStyle?.cancelReplyIcon?.color
                      ? customReplyingViewStyle?.cancelReplyIcon?.color
                      : styles.crossIconStyle?.tintColor
                  }
                  resizeMode={customReplyingViewStyle?.cancelReplyIcon?.boxFit}
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
                  ? navigatedFromComments
                    ? Layout.normalize(94)
                    : Layout.normalize(114)
                  : keyboardIsVisible
                  ? navigatedFromComments
                    ? Layout.normalize(64)
                    : Layout.normalize(84)
                  : Layout.normalize(64),
                maxHeight: 300,
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
                        ...postHeaderStyle?.profilePicture?.fallbackText,
                        children: postHeaderStyle?.profilePicture?.fallbackText
                          ?.children ? (
                          postHeaderStyle?.profilePicture?.fallbackText
                            ?.children
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
            styles.textInputStyle,
            {
              bottom: keyboardIsVisible
                ? navigatedFromComments
                  ? Layout.normalize(0)
                  : Layout.normalize(25)
                : 0,
            },
            customCommentTextInput?.inputTextStyle,
          ]}
          autoFocus={
            postDetailStyle?.commentTextInputStyle?.autoFocus
              ? postDetailStyle?.commentTextInputStyle?.autoFocus
              : routeParams
              ? true
              : keyboardFocusOnReply
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
          inputRef={myRef}
          rightIcon={{
            ...customCommentTextInput?.rightIcon,
            onTap: () => {
              customCommentTextInput?.rightIcon?.onTap();
              commentToAdd
                ? editCommentFocus
                  ? commentEdit()
                  : replyOnComment.textInputFocus
                  ? addNewReplyProp
                    ? addNewReplyProp(postDetail?.id, replyOnComment.commentId)
                    : addNewReply(postDetail?.id, replyOnComment.commentId)
                  : addNewCommentProp
                  ? addNewCommentProp(postDetail?.id)
                  : addNewComment(postDetail?.id)
                : {};
              setAllTags([]);
              setIsUserTagging(false);
            },
            icon: {
              assetPath: require("../../assets/images/send_icon3x.png"),
              iconStyle: { opacity: commentToAdd ? 1 : 0.7 },
              ...customCommentTextInput?.rightIcon?.icon,
            },
            isClickable: commentToAdd
              ? customCommentTextInput?.rightIcon?.isClickable != undefined
                ? customCommentTextInput?.rightIcon?.isClickable
                : true
              : false,
          }}
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
                ...customCommentTextInput?.mentionTextStyle,
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
          navigation={navigation}
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
