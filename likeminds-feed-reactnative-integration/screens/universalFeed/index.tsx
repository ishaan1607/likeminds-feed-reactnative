import React, { useEffect, useRef, useState, ReactNode } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { LMHeader, LMIcon, LMImage, LMLoader, LMVideo } from "likeminds_feed_reactnative_ui";
import { APP_TITLE, DOCUMENT_ATTACHMENT_TYPE, IMAGE_ATTACHMENT_TYPE, POST_UPLOADING, VIDEO_ATTACHMENT_TYPE } from "../../constants/Strings";
import { CREATE_POST } from "../../constants/screenNames";
// @ts-ignore the lib do not have TS declarations yet
import _ from "lodash";
import {PostsList} from "../postsList";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { useAppDispatch } from "../../store/store";
import { UniversalFeedContextProvider, UniversalFeedContextValues, useUniversalFeedContext } from "../../context";
import STYLES from "../../constants/Styles";

const UniversalFeed = ({ navigation, route ,children}: any) => {
  return (
    <UniversalFeedContextProvider navigation={navigation} route={route} children={children}>
      <UniversalFeedComponent />
    </UniversalFeedContextProvider>
  );
};

const UniversalFeedComponent = React.memo(() => {
  const dispatch = useAppDispatch()
  const {feedData, showCreatePost, postUploading,navigation , uploadingMediaAttachment, uploadingMediaAttachmentType}: UniversalFeedContextValues = useUniversalFeedContext()
  const LMFeedContextStyles = useLMFeedStyles();
  const { universalFeedStyle, loaderStyle } = LMFeedContextStyles;  

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* header */}
      <LMHeader heading={APP_TITLE} {...universalFeedStyle?.screenHeader} />
       {/* post uploading section */}
       {postUploading && (
        <View style={styles.postUploadingView}>
          <View style={styles.uploadingPostContentView}>
            {/* post uploading media preview */}
            {uploadingMediaAttachmentType === IMAGE_ATTACHMENT_TYPE && (
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
            )}
            <Text style={styles.postUploadingText}>{POST_UPLOADING}</Text>
          </View>
          {/* progress loader */}
          <LMLoader
            size={
              Platform.OS === 'ios'
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
          universalFeedStyle?.newPostButtonStyle,
        ]}
        // handles post uploading status and member rights to create post
        onPress={
          () =>
            showCreatePost
              ? postUploading
                ? dispatch()
                // todo: handle toast later
                  // showToastMessage({
                  //   isToast: true,
                  //   message: POST_UPLOAD_INPROGRESS,
                  // }) as any,
                : 
                  navigation.navigate(CREATE_POST)
              : dispatch()
          // todo: handle toast later
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
          {...universalFeedStyle?.newPostIcon}
        />
        <Text
          style={[styles.newPostText, universalFeedStyle?.newPostButtonText]}
        >
          NEW POST
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export {UniversalFeed};
