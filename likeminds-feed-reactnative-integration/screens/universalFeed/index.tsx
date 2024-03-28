import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";

import {
  APP_TITLE,
  CREATE_POST_PERMISSION,
  DOCUMENT_ATTACHMENT_TYPE,
  IMAGE_ATTACHMENT_TYPE,
  POST_UPLOADING,
  POST_UPLOAD_INPROGRESS,
  VIDEO_ATTACHMENT_TYPE,
} from "../../constants/Strings";
import { CREATE_POST } from "../../constants/screenNames";
// @ts-ignore the lib do not have TS declarations yet
import _ from "lodash";
import { PostsList } from "../postsList";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { useAppDispatch } from "../../store/store";
import {
  UniversalFeedContextProvider,
  UniversalFeedContextValues,
  UniversalFeedCustomisableMethodsContextProvider,
  useUniversalFeedContext,
  useUniversalFeedCustomisableMethodsContext,
} from "../../context";
import STYLES from "../../constants/Styles";
import { showToastMessage } from "../../store/actions/toast";
import { LMHeader, LMImage, LMLoader, LMVideo } from "../../components";
import { LMIcon } from "../../uiComponents";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../models";

interface UniversalFeedProps {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList, "UniversalFeed">;
  route: {
    key: string;
    name: string;
    params: Array<string>;
    path: undefined;
  };
  postLikeHandlerProp: (id: string) => void;
  savePostHandlerProp: (id: string, saved?: boolean) => void;
  selectPinPostProp: (id: string, pinned?: boolean) => void;
  selectEditPostProp: (id: string) => void;
  onSelectCommentCountProp: (id: string) => void;
  onTapLikeCountProps: (id: string) => void;
  handleDeletePostProps: (visible: boolean) => void;
  handleReportPostProps: () => void;
  newPostButtonClickProps: () => void;
  onOverlayMenuClickProp: (event: {
    nativeEvent: { pageX: number; pageY: number };
  }) => void;
}

const UniversalFeed = ({
  navigation,
  route,
  children,
  postLikeHandlerProp,
  savePostHandlerProp,
  selectPinPostProp,
  selectEditPostProp,
  onSelectCommentCountProp,
  onTapLikeCountProps,
  handleDeletePostProps,
  handleReportPostProps,
  newPostButtonClickProps,
  onOverlayMenuClickProp
}: UniversalFeedProps) => {
  return (
      <UniversalFeedCustomisableMethodsContextProvider
        postLikeHandlerProp={postLikeHandlerProp}
        savePostHandlerProp={savePostHandlerProp}
        selectEditPostProp={selectEditPostProp}
        selectPinPostProp={selectPinPostProp}
        onSelectCommentCountProp={onSelectCommentCountProp}
        onTapLikeCountProps={onTapLikeCountProps}
        handleDeletePostProps={handleDeletePostProps}
        handleReportPostProps={handleReportPostProps}
        newPostButtonClickProps={newPostButtonClickProps}
        onOverlayMenuClickProp={onOverlayMenuClickProp}
      >
        <UniversalFeedComponent />
      </UniversalFeedCustomisableMethodsContextProvider>
  );
};

const UniversalFeedComponent = () => {
  const dispatch = useAppDispatch();
  const {
    feedData,
    showCreatePost,
    postUploading,
    navigation,
    uploadingMediaAttachment,
    uploadingMediaAttachmentType,
    newPostButtonClick
  }: UniversalFeedContextValues = useUniversalFeedContext();
  const LMFeedContextStyles = useLMFeedStyles();
  const { universalFeedStyle, loaderStyle } = LMFeedContextStyles;
  const {newPostButtonClickProps} = useUniversalFeedCustomisableMethodsContext()

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
                assetPath={require("../../assets/images/pdf_icon3x.png")}
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
        style={[
          styles.newPostButtonView,
          showCreatePost
            ? styles.newPostButtonEnable
            : styles.newPostButtonDisable,
          universalFeedStyle?.newPostButtonStyle,
        ]}
        // handles post uploading status and member rights to create post
        onPress={() =>
         newPostButtonClickProps ? newPostButtonClickProps() : newPostButtonClick()
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
};

export { UniversalFeed };
