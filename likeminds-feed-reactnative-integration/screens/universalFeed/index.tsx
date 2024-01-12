import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { styles } from "./styles";
import {
  LMHeader,
  LMPostUI,
} from "likeminds_feed_reactnative_ui";
import { NavigationService } from "../../navigation";
import {
  APP_TITLE,
  POST_UPLOADING
} from "../../constants/Strings";
import { LMLoader } from "likeminds_feed_reactnative_ui";
import {
  CREATE_POST
} from "../../constants/screenNames";
import STYLES from "../../constants/Styles";
// @ts-ignore the lib do not have TS declarations yet
import _ from "lodash";
import { useAppContext } from "../../store/AppContext";
import { Client } from "../../client";
import PostsList from "../postsList";
import { useLMFeedStyles } from "../../lmFeedProvider";

const UniversalFeed = React.memo(() => {
  const myClient = Client.myClient;
  const { state, dispatch } = useAppContext();
  const feedData = state.feed.feed;
  const accessToken = state.login.community.accessToken;
  const memberData = state.login.member;
  const memberRight = state.login.memberRights;
  // const {mediaAttachmemnts, linkAttachments, postContent} = useAppSelector(
  //   state => state.createPost,
  //   );
  const [postUploading, setPostUploading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(true);
  // const uploadingMediaAttachmentType = mediaAttachmemnts[0]?.attachmentType;
  // const uploadingMediaAttachment = mediaAttachmemnts[0]?.attachmentMeta.url;
  const listRef = useRef<FlashList<LMPostUI>>(null);
  const LMFeedContextStyles = useLMFeedStyles();
  const newPostButtonStyles = LMFeedContextStyles?.newPostButtonStyles

  // this function adds a new post
  // const postAdd = useCallback(async () => {
  //   // replace the mentions with route
  //   const postContentText = mentionToRouteConverter(postContent);
  //   // upload media to aws
  //   const uploadPromises = mediaAttachmemnts?.map(
  //     async (item: LMAttachmentUI) => {
  //       return uploadFilesToAWS(
  //         item.attachmentMeta,
  //         memberData.userUniqueId,
  //       ).then(res => {
  //         item.attachmentMeta.url = res.Location;
  //         return item; // Return the updated item
  //       });
  //     },
  //   );
  //   // Wait for all upload operations to complete
  //   const updatedAttachments = await Promise.all(uploadPromises);
  //   const addPostResponse = await dispatch(
  //     addPost(
  //       AddPostRequest.builder()
  //         .setAttachments([...updatedAttachments, ...linkAttachments])
  //         .setText(postContentText)
  //         .build(),
  //     ) as any,
  //   );
  //   if (addPostResponse) {
  //     setPostUploading(false);
  //     dispatch(
  //       setUploadAttachments({
  //         allAttachment: [],
  //         linkData: [],
  //         conText: '',
  //       }) as any,
  //     );
  //     await onRefresh();
  //     listRef.current?.scrollToIndex({animated: true, index: 0});
  //     dispatch(
  //       showToastMessage({
  //         isToast: true,
  //         message: POST_UPLOADED,
  //       }) as any,
  //     );
  //   }
  //   return addPostResponse;
  // }, [
  //   dispatch,
  //   linkAttachments,
  //   mediaAttachmemnts,
  //   memberData?.userUniqueId,
  //   postContent,
  //   onRefresh,
  // ]);

  // this useEffect handles the execution of addPost api
  // useEffect(() => {
  //   // this checks if any media is selected to be posted and then executes the addPost api
  //   if (
  //     mediaAttachmemnts.length > 0 ||
  //     linkAttachments.length > 0 ||
  //     postContent !== ''
  //   ) {
  //     setPostUploading(true);
  //     postAdd();
  //   }
  // }, [mediaAttachmemnts, linkAttachments, postContent, postAdd]);

  // this calls the getFeed api whenever the page number gets changed
  useEffect(() => {
    if (accessToken) {
      // handles members right
      if (memberData?.state !== 1) {
        const members_right = memberRight?.find(
          (item: any) => item?.state === 9
        );

        if (members_right?.isSelected === false) {
          setShowCreatePost(false);
        }
      }
    }
  }, [accessToken]);


  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* header */}
      <LMHeader heading={APP_TITLE} />
      {/* post uploading section */}
      {postUploading && (
        <View style={styles.postUploadingView}>
          <View style={styles.uploadingPostContentView}>
            {/* post uploading media preview */}
            {/* {uploadingMediaAttachmentType === IMAGE_ATTACHMENT_TYPE && (
                <LMImage
                  imageUrl={uploadingMediaAttachment}
                  imageStyle={styles.uploadingImageStyle}
                  boxStyle={styles.uploadingImageVideoBox}
                  width={styles.uploadingImageVideoBox.width}
                  height={styles.uploadingImageVideoBox.height}
                />
              )}
              {uploadingMediaAttachmentType === VIDEO_ATTACHMENT_TYPE && (
                <LMVideo
                  videoUrl={uploadingMediaAttachment}
                  videoStyle={styles.uploadingVideoStyle}
                  boxStyle={styles.uploadingImageVideoBox}
                  width={styles.uploadingImageVideoBox.width}
                  height={styles.uploadingImageVideoBox.height}
                  showControls={false}
                  boxFit="contain"
                />
              )}
              {uploadingMediaAttachmentType === DOCUMENT_ATTACHMENT_TYPE && (
                <LMIcon
                  assetPath={require('../../assets/images/pdf_icon3x.png')}
                  type="png"
                  iconStyle={styles.uploadingDocumentStyle}
                  height={styles.uploadingPdfIconSize.height}
                  width={styles.uploadingPdfIconSize.width}
                />
              )} */}
            <Text style={styles.postUploadingText}>{POST_UPLOADING}</Text>
          </View>
          {/* progress loader */}
          <LMLoader
            size={
              Platform.OS === "ios"
                ? STYLES.$LMLoaderSizeiOS
                : STYLES.$LMLoaderSizeAndroid
            }
          />
        </View>
      )}
      {/* posts list section */}
     <PostsList />
      {/* create post button section */}
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={feedData?.length >= 0 ? false : true}
        style={[
          styles.newPostButtonView,
          showCreatePost
            ? styles.newPostButtonEnable
            : styles.newPostButtonDisable,
            newPostButtonStyles
        ]}
        // handles post uploading status and member rights to create post
        onPress={() =>
          showCreatePost
            ? postUploading
              ? dispatch()
                // showToastMessage({
                //   isToast: true,
                //   message: POST_UPLOAD_INPROGRESS,
                // }) as any,
              : NavigationService.navigate(CREATE_POST)
            : dispatch()
              //   showToastMessage({
              //     isToast: true,
              //     message: CREATE_POST_PERMISSION,
              //   }) as any,
        }
      >
        <Image
          source={require("../../assets/images/add_post_icon3x.png")}
          resizeMode={"contain"}
          style={styles.newPostButtonIcon}
        />
        <Text style={styles.newPostText}>NEW POST</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  );
});

export default UniversalFeed;
