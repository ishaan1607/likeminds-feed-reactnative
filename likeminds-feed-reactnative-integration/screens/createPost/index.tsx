import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import React from "react";
import { NetworkUtil, nameInitials, replaceLastMention } from "../../utils";
import { useAppDispatch } from "../../store/store";
import {
  ADD_FILES,
  ADD_IMAGES,
  ADD_MORE_MEDIA,
  ADD_POST_TEXT,
  ADD_VIDEOS,
  CREATE_POST_PLACEHOLDER_TEXT,
  IMAGE_ATTACHMENT_TYPE,
  SAVE_POST_TEXT,
  SELECT_BOTH,
  SELECT_IMAGE,
  SELECT_VIDEO,
  VIDEO_ATTACHMENT_TYPE,
} from "../../constants/Strings";
import { setUploadAttachments } from "../../store/actions/createPost";
import { styles } from "./styles";
import {
  CreatePostContextProvider,
  CreatePostContextValues,
  useCreatePostContext,
} from "../../context";
import { useLMFeedStyles } from "../../lmFeedProvider";
import {
  LMButton,
  LMIcon,
  LMInputText,
  LMProfilePicture,
  LMText,
} from "../../uiComponents";
import { LMUserUI } from "../../models";
import {
  LMCarousel,
  LMDocument,
  LMHeader,
  LMImage,
  LMLinkPreview,
  LMLoader,
  LMVideo,
} from "../../components";

const CreatePost = ({ navigation, route, children }) => {
  return (
    <CreatePostContextProvider
      navigation={navigation}
      route={route}
      children={children}
    >
      <CreatePostComponent />
    </CreatePostContextProvider>
  );
};

const CreatePostComponent = React.memo(() => {
  const dispatch = useAppDispatch();
  const LMFeedContextStyles = useLMFeedStyles();
  const { postListStyle, createPostStyle } = LMFeedContextStyles;
  const {
    navigation,
    postToEdit,
    showOptions,
    memberData,
    myRef,
    postContentText,
    handleInputChange,
    handleDocument,
    handleGallery,
    handleLoadMore,
    allAttachment,
    allTags,
    setAllTags,
    setClosedOnce,
    setFormattedLinkAttachments,
    isUserTagging,
    userTaggingListHeight,
    setIsUserTagging,
    taggedUserName,
    setPostContentText,
    isLoading,
    showSelecting,
    formattedDocumentAttachments,
    formattedLinkAttachments,
    formattedMediaAttachments,
    removeDocumentAttachment,
    removeMediaAttachment,
    removeSingleAttachment,
    showLinkPreview,
    setShowLinkPreview,
    postDetail,
    postEdit,
  }: CreatePostContextValues = useCreatePostContext();
  // this renders the post detail UI
  const uiRenderForPost = () => {
    return (
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={
          postToEdit
            ? styles.scrollViewStyleWithoutOptions
            : showOptions
            ? styles.scrollViewStyleWithOptions
            : styles.scrollViewStyleWithoutOptions
        }
      >
        {/* user profile section */}
        <View style={styles.profileContainer}>
          {/* profile image */}
          <LMProfilePicture
            {...postListStyle?.header?.profilePicture}
            fallbackText={{
              children: <Text>{nameInitials(memberData.name)}</Text>,
            }}
            imageUrl={memberData.imageUrl}
          />
          {/* user name */}
          <LMText
            children={<Text>{memberData.name}</Text>}
            textStyle={
              createPostStyle?.userNameTextStyle
                ? createPostStyle?.userNameTextStyle
                : styles.userNameText
            }
          />
        </View>
        {/* text input field */}
        <LMInputText
          {...createPostStyle?.createPostTextInputStyle}
          placeholderText={createPostStyle?.createPostTextInputStyle?.placeholderText ? createPostStyle?.createPostTextInputStyle?.placeholderText :CREATE_POST_PLACEHOLDER_TEXT}
          placeholderTextColor={createPostStyle?.createPostTextInputStyle?.placeholderTextColor ? createPostStyle?.createPostTextInputStyle?.placeholderTextColor :"#0F1E3D66"}
          inputTextStyle={[styles.textInputView, createPostStyle?.createPostTextInputStyle?.inputTextStyle]}
          multilineField ={createPostStyle?.createPostTextInputStyle?.multilineField != undefined ? createPostStyle?.createPostTextInputStyle?.multilineField : true}
          inputRef={myRef}
          inputText={postContentText}
          onType={handleInputChange}
          autoFocus={postToEdit ? true : false}
          textValueStyle={createPostStyle?.createPostTextInputStyle?.textValueStyle ? createPostStyle?.createPostTextInputStyle?.textValueStyle :{ fontSize: 16 }}
          partTypes={[
            {
              trigger: "@", // Should be a single character like '@' or '#'
              textStyle: {
                color: "#007AFF",
                ...createPostStyle?.createPostTextInputStyle?.mentionTextStyle
              }, // The mention style in the input
            },
          ]}
        />

        {/* users tagging list */}
        {allTags && isUserTagging ? (
          <View
            style={[
              styles.taggingListView,
              {
                height: userTaggingListHeight,
              },
            ]}
          >
            <FlatList
              data={[...allTags]}
              nestedScrollEnabled={true}
              renderItem={({ item }: { item: LMUserUI }) => {
                return (
                  <Pressable
                    onPress={() => {
                      const uuid = item?.sdkClientInfo?.uuid;
                      const res = replaceLastMention(
                        postContentText,
                        taggedUserName,
                        item?.name,
                        uuid ? `user_profile/${uuid}` : uuid
                      );
                      setPostContentText(res);
                      setAllTags([]);
                      setIsUserTagging(false);
                    }}
                    style={styles.taggingListItem}
                    key={item?.id}
                  >
                    <LMProfilePicture
                      fallbackText={{
                        children: <Text>{nameInitials(item?.name)}</Text>,
                      }}
                      fallbackTextBoxStyle={styles.taggingListProfileBoxStyle}
                      size={40}
                    />
                    <View style={styles.taggingListItemTextView}>
                      <LMText
                        children={<Text>{item?.name}</Text>}
                        maxLines={1}
                        textStyle={styles.taggingListText}
                      />
                    </View>
                  </Pressable>
                );
              }}
              extraData={{
                value: [postContentText, allTags],
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
              keyExtractor={(item) => {
                return item?.id;
              }}
            />
          </View>
        ) : null}

        {/* selected media section */}
        <View>
          {/* multi media selection section */}
          {showSelecting ? (
            <View style={styles.selectingMediaView}>
              <LMLoader size={10} />
              <Text style={styles.selectingMediaText}>Fetching Media</Text>
            </View>
          ) : formattedMediaAttachments ? (
            formattedMediaAttachments?.length > 1 ? (
              <LMCarousel
                attachments={formattedMediaAttachments}
                showCancel={postToEdit ? false : true}
                videoItem={{ videoUrl: "", showControls: true }}
                onCancel={(index) => removeMediaAttachment(index)}
              />
            ) : (
              <>
                {/* single image selected section */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  IMAGE_ATTACHMENT_TYPE && (
                  <LMImage
                    imageUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel={postToEdit ? false : true}
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
                {/* single video selected section  */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  VIDEO_ATTACHMENT_TYPE && (
                  <LMVideo
                    videoUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel={postToEdit ? false : true}
                    showControls
                    looping={false}
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
              </>
            )
          ) : null}
          {/* selected document view section */}
          {formattedDocumentAttachments &&
            formattedDocumentAttachments.length >= 1 && (
              <LMDocument
                attachments={formattedDocumentAttachments}
                showCancel={postToEdit ? false : true}
                showMoreText={false}
                onCancel={(index) => removeDocumentAttachment(index)}
              />
            )}
          {/* added link preview section */}
          {formattedMediaAttachments.length <= 0 &&
            formattedDocumentAttachments.length <= 0 &&
            showLinkPreview &&
            formattedLinkAttachments.length >= 1 && (
              <LMLinkPreview
                attachments={formattedLinkAttachments}
                showCancel
                onCancel={() => {
                  setShowLinkPreview(false);
                  setClosedOnce(true);
                  setFormattedLinkAttachments([]);
                }}
              />
            )}
        </View>
        {/* add more media button section */}
        {!postToEdit &&
          allAttachment.length > 0 &&
          allAttachment.length < 10 && (
            <LMButton
              onTap={
                formattedMediaAttachments.length > 0
                  ? () => handleGallery(SELECT_BOTH)
                  : formattedDocumentAttachments.length > 0
                  ? () => handleDocument()
                  : () => {}
              }
              icon={{
                assetPath: require("../../assets/images/plusAdd_icon3x.png"),
                height: 20,
                width: 20,
              }}
              text={{
                children: <Text>{ADD_MORE_MEDIA}</Text>,
                textStyle: styles.addMoreButtonText,
              }}
              buttonStyle={styles.addMoreButtonView}
            />
          )}
      </ScrollView>
    );
  };

  const checkNetInfo = async () => {
    const isConnected = await NetworkUtil.isNetworkAvailable();
    if (isConnected) {
      postToEdit
        ? postEdit()
        : // store the media for uploading and navigate to feed screen
          dispatch(
            setUploadAttachments({
              mediaAttachmentData: allAttachment,
              linkAttachmentData: formattedLinkAttachments,
              postContentData: postContentText.trim(),
            })
          );
      navigation.goBack();
    } else {
      Alert.alert("", "Please check your internet connection");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* screen header section*/}
      <LMHeader {...createPostStyle?.createPostScreenHeader}
        showBackArrow={
          createPostStyle?.createPostScreenHeader?.showBackArrow != undefined
            ? createPostStyle?.createPostScreenHeader?.showBackArrow
            : true
        }
        onBackPress={() => {
          navigation.goBack();
          createPostStyle?.createPostScreenHeader?.onBackPress && createPostStyle?.createPostScreenHeader?.onBackPress();
        }}
        heading={
          postToEdit
            ? createPostStyle?.createPostScreenHeader?.editPostHeading
              ? createPostStyle?.createPostScreenHeader?.editPostHeading
              : "Edit Post"
            : createPostStyle?.createPostScreenHeader?.createPostHeading
            ? createPostStyle?.createPostScreenHeader?.createPostHeading
            : "Create a Post"
        }
        rightComponent={
          // post button section
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            disabled={
              postToEdit
                ? false
                : allAttachment?.length > 0 ||
                  formattedLinkAttachments?.length > 0 ||
                  postContentText.trim() !== ""
                ? false
                : true
            }
            style={
              postToEdit
                ? styles.enabledOpacity
                : allAttachment?.length > 0 ||
                  formattedLinkAttachments?.length > 0 ||
                  postContentText.trim() !== ""
                ? styles.enabledOpacity
                : styles.disabledOpacity
            }
            onPress={() => checkNetInfo()}
          >
            {createPostStyle?.createPostScreenHeader?.rightComponent ? (
              createPostStyle?.createPostScreenHeader?.rightComponent
            ) : (
              <Text style={styles.headerRightComponentText}>
                {postToEdit ? SAVE_POST_TEXT : ADD_POST_TEXT}
              </Text>
            )}
          </TouchableOpacity>
        }
      />
      {/* handles the UI to be rendered for edit post and create post */}
      {!postToEdit ? (
        uiRenderForPost()
      ) : postDetail?.id ? (
        uiRenderForPost()
      ) : (
        // loader view section
        <View style={styles.rowAlignMent}>
          <LMLoader />
        </View>
      )}
      {/* selection options section */}
      {!postToEdit && showOptions && (
          <View style={[styles.selectionOptionsView, createPostStyle?.attachmentOptionsStyle?.attachmentOptionsView]}>
            {/* add photos button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.optionItemView, createPostStyle?.attachmentOptionsStyle?.photoAttachmentView]}
              onPress={() => {
                handleGallery(SELECT_IMAGE);
                createPostStyle?.attachmentOptionsStyle?.onPhotoAttachmentOptionClick && createPostStyle?.attachmentOptionsStyle?.onPhotoAttachmentOptionClick()
              }}
            >
              <LMIcon
                assetPath={require("../../assets/images/gallery_icon3x.png")}
                {...createPostStyle?.attachmentOptionsStyle?.photoAttachmentIcon}
              />
              <LMText
                children={<Text>{ADD_IMAGES}</Text>}
                textStyle={styles.selectionOptionstext}
                {...createPostStyle?.attachmentOptionsStyle?.photoAttachmentTextStyle}
              />
            </TouchableOpacity>
            {/* add video button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.optionItemView, createPostStyle?.attachmentOptionsStyle?.videoAttachmentView]}
              onPress={() => {
                handleGallery(SELECT_VIDEO);
                createPostStyle?.attachmentOptionsStyle?.onVideoAttachmentOptionClick && createPostStyle?.attachmentOptionsStyle?.onVideoAttachmentOptionClick()
              }}
            >
              <LMIcon
                assetPath={require("../../assets/images/video_icon3x.png")}
                {...createPostStyle?.attachmentOptionsStyle?.videoAttachmentIcon}
              />
              <LMText
                children={<Text>{ADD_VIDEOS}</Text>}
                textStyle={styles.selectionOptionstext}
                {...createPostStyle?.attachmentOptionsStyle?.videoAttachmentTextStyle}
              />
            </TouchableOpacity>
            {/* add files button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.optionItemView, createPostStyle?.attachmentOptionsStyle?.filesAttachmentView]}
              onPress={() => {
                handleDocument();
                createPostStyle?.attachmentOptionsStyle?.onFilesAttachmentOptionClick && createPostStyle?.attachmentOptionsStyle?.onFilesAttachmentOptionClick()
              }}
            >
              <LMIcon
                assetPath={require("../../assets/images/paperClip_icon3x.png")}
                {...createPostStyle?.attachmentOptionsStyle?.filesAttachmentIcon}
              />
              <LMText
                children={<Text>{ADD_FILES}</Text>}
                textStyle={styles.selectionOptionstext}
                {...createPostStyle?.attachmentOptionsStyle?.filesAttachmentTextStyle}
              />
            </TouchableOpacity>
          </View>
      )}
    </SafeAreaView>
  );
});

export { CreatePost };
