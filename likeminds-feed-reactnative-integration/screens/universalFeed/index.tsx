import React, { useEffect, useRef, useState, ReactNode } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { LMHeader } from "likeminds_feed_reactnative_ui";
import { APP_TITLE } from "../../constants/Strings";
import { CREATE_POST } from "../../constants/screenNames";
// @ts-ignore the lib do not have TS declarations yet
import _ from "lodash";
import {PostsList} from "../postsList";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { useAppDispatch } from "../../store/store";
import { UniversalFeedContextProvider, UniversalFeedContextValues, useUniversalFeedContext } from "../../context";

const UniversalFeed = ({ navigation, route ,children}: any) => {
  return (
    <UniversalFeedContextProvider navigation={navigation} route={route} children={children}>
      <UniversalFeedComponent />
    </UniversalFeedContextProvider>
  );
};

const UniversalFeedComponent = React.memo(() => {
  const dispatch = useAppDispatch()
  const {feedData, showCreatePost, postUploading,navigation }: UniversalFeedContextValues = useUniversalFeedContext()
  const LMFeedContextStyles = useLMFeedStyles();
  const { universalFeedStyle, loaderStyle } = LMFeedContextStyles;
  // todo: handle later
  // const {mediaAttachmemnts, linkAttachments, postContent} = useAppSelector(
  //   state => state.createPost,
  //   );
  // const uploadingMediaAttachmentType = mediaAttachmemnts[0]?.attachmentType;
  // const uploadingMediaAttachment = mediaAttachmemnts[0]?.attachmentMeta.url;

  // this calls the getFeed api whenever the page number gets changed
  

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* header */}
      <LMHeader heading={APP_TITLE} {...universalFeedStyle?.screenHeader} />
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
