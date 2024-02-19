import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { LMAttachmentUI, LMPostUI } from "likeminds_feed_reactnative_ui";
import { mentionToRouteConverter, uploadFilesToAWS } from "../utils";
import { addPost, setUploadAttachments } from "../store/actions/createPost";
import { AddPostRequest, GetFeedRequest } from "@likeminds.community/feed-js";
import { refreshFeed } from "../store/actions/feed";
import { FlashList } from "@shopify/flash-list";
import { POST_UPLOADED, RIGHT_CREATE_POST, STATE_ADMIN } from "../constants/Strings";
import { RootStackParamList } from "../models/RootStackParamsList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { showToastMessage } from "../store/actions/toast";

interface UniversalFeedContextProps {
  children: ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList, 'UniversalFeed'>;
  route: {
    key: string;
    name: string;
    params: Array<string>;
    path: undefined;
  };
}

export interface UniversalFeedContextValues {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UniversalFeed'>;
  feedData: Array<LMPostUI>;
  accessToken: string;
  memberData: {};
  memberRight: [];
  postUploading: boolean;
  showCreatePost: boolean;
  refreshing: boolean;
  localRefresh: boolean;
  listRef: MutableRefObject<FlashList<LMPostUI> | null>;
  mediaAttachmemnts: [];
  linkAttachments: [];
  postContent: string;
  uploadingMediaAttachmentType: number;
  uploadingMediaAttachment: string;
  setLocalRefresh: Dispatch<SetStateAction<boolean>>;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  setPostUploading: Dispatch<SetStateAction<boolean>>;
  setShowCreatePost: Dispatch<SetStateAction<boolean>>;
  onRefresh: () => void;
  postAdd: () => void;
  keyExtractor:(val) => string
}

const UniversalFeedContext = createContext<
  UniversalFeedContextValues | undefined
>(undefined);

export const useUniversalFeedContext = () => {
  const context = useContext(UniversalFeedContext);
  if (!context) {
    throw new Error(
      "useUniversalFeedContext must be used within an UniversalFeedContextProvider"
    );
  }
  return context;
};

export const UniversalFeedContextProvider = ({
  children,
  navigation,
}: UniversalFeedContextProps) => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector((state) => state.feed.feed);
  const accessToken = useAppSelector((state) => state.login.accessToken);
  const memberData = useAppSelector((state) => state.login.member);
  const memberRight = useAppSelector((state) => state.login.memberRights);
  const [postUploading, setPostUploading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(true);
  const { mediaAttachmemnts, linkAttachments, postContent } = useAppSelector(
    (state) => state.createPost
  );
  const uploadingMediaAttachmentType = mediaAttachmemnts[0]?.attachmentType;
  const uploadingMediaAttachment = mediaAttachmemnts[0]?.attachmentMeta.url;

  const [refreshing, setRefreshing] = useState(false);
  const [localRefresh, setLocalRefresh] = useState(false);
  const listRef = useRef<FlashList<LMPostUI>>(null);

  useEffect(() => {
    if (accessToken) {
      // handles members right
      if (memberData?.state !== STATE_ADMIN) {
        const members_right = memberRight?.find(
          (item) => item?.state === RIGHT_CREATE_POST
        );

        if (members_right?.isSelected === false) {
          setShowCreatePost(false);
        }
      }
    }
  }, [accessToken]);

  // this function is executed on pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    setLocalRefresh(true);
    // calling getFeed API
    await dispatch(
      refreshFeed(
        GetFeedRequest.builder().setpage(1).setpageSize(20).build(),
        true
      )
    );
    setLocalRefresh(false);
    setRefreshing(false);
  };

  // this function adds a new post
  const postAdd = async () => {
    // replace the mentions with route
    const postContentText = mentionToRouteConverter(postContent);
    // upload media to aws
    const uploadPromises = mediaAttachmemnts?.map(
      async (item: LMAttachmentUI) => {
        return uploadFilesToAWS(
          item.attachmentMeta,
          memberData.userUniqueId
        ).then((res) => {
          item.attachmentMeta.url = res.Location;
          return item; // Return the updated item
        });
      }
    );
    // Wait for all upload operations to complete
    const updatedAttachments = await Promise.all(uploadPromises);
    const addPostResponse = await dispatch(
      addPost(
        AddPostRequest.builder()
          .setAttachments([...updatedAttachments, ...linkAttachments])
          .setText(postContentText)
          .build(),
        true
      )
    );
    if (addPostResponse) {
      setPostUploading(false);
      dispatch(
        setUploadAttachments({
          allAttachment: [],
          linkData: [],
          conText: "",
        }) as any
      );
      await onRefresh();
      listRef.current?.scrollToIndex({ animated: true, index: 0 });
      dispatch(showToastMessage({
        isToast: true,
        message: POST_UPLOADED,
      }));
    }
    return addPostResponse;
  };

  // this useEffect handles the execution of addPost api
  useEffect(() => {
    // this checks if any media is selected to be posted and then executes the addPost api
    if (
      mediaAttachmemnts.length > 0 ||
      linkAttachments.length > 0 ||
      postContent !== ""
    ) {
      setPostUploading(true);
      postAdd();
    }
  }, [mediaAttachmemnts, linkAttachments, postContent]);

   // keyExtractor of feed list
   const keyExtractor = (item: LMPostUI) => {
    const id = item?.id;
    const itemLiked = item?.isLiked;
    const itemPinned = item?.isPinned;
    const itemComments = item?.commentsCount;
    const itemSaved = item?.isSaved;
    const itemText = item?.text;

    return `${id}${itemLiked}${itemPinned}${itemComments}${itemSaved}${itemText}`;
  };

  const contextValues: UniversalFeedContextValues = {
    navigation,
    feedData,
    accessToken,
    memberData,
    memberRight,
    postUploading,
    showCreatePost,
    setPostUploading,
    setShowCreatePost,
    refreshing,
    localRefresh,
    listRef,
    mediaAttachmemnts,
    linkAttachments,
    postContent,
    uploadingMediaAttachmentType,
    uploadingMediaAttachment,
    setLocalRefresh,
    setRefreshing,
    onRefresh,
    postAdd,
    keyExtractor
  };

  return (
    <UniversalFeedContext.Provider value={contextValues}>
      {children}
    </UniversalFeedContext.Provider>
  );
};
