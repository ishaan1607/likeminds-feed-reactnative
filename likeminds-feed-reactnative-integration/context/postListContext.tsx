import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { LMLoader, LMPostUI } from "likeminds_feed_reactnative_ui";
import {
  getFeed,
  likePost,
  likePostStateHandler,
  pinPost,
  pinPostStateHandler,
  savePost,
  savePostStateHandler,
} from "../store/actions/feed";
import {
  GetFeedRequest,
  LikePostRequest,
  PinPostRequest,
  SavePostRequest,
} from "@likeminds.community/feed-js-beta";
import _ from "lodash";
import {
  DELETE_POST_MENU_ITEM,
  EDIT_POST_MENU_ITEM,
  PIN_POST_MENU_ITEM,
  POST_PIN_SUCCESS,
  POST_SAVED_SUCCESS,
  POST_UNPIN_SUCCESS,
  POST_UNSAVED_SUCCESS,
  REPORT_POST_MENU_ITEM,
  SOMETHING_WENT_WRONG,
  UNPIN_POST_MENU_ITEM,
} from "../constants/Strings";
import { CREATE_POST } from "../constants/screenNames";
import { useLMFeedStyles } from "../lmFeedProvider";
import { showToastMessage } from "../store/actions/toast";

interface PostListContextProps {
  children: ReactNode;
  navigation: any;
  route: any;
}

export interface PostListContextValues {
  navigation: any;
  feedData: Array<LMPostUI>;
  accessToken: string;
  showLoader: number;
  feedPageNumber: number;
  modalPosition: {x:number, y:number};
  showActionListModal: boolean;
  selectedMenuItemPostId: string;
  showDeleteModal: boolean;
  showReportModal: boolean;
  feedFetching: boolean;
  setFeedFetching: Dispatch<SetStateAction<boolean>>;
  setShowReportModal: Dispatch<SetStateAction<boolean>>;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  setSelectedMenuItemPostId: Dispatch<SetStateAction<string>>;
  setShowActionListModal: Dispatch<SetStateAction<boolean>>;
  setFeedPageNumber: Dispatch<SetStateAction<number>>;
  renderLoader: () => void;
  getPostDetail: () => LMPostUI;
  handleDeletePost: (visible: boolean) => void;
  onMenuItemSelect: (
    postId: string,
    itemId?: number,
    pinnedValue?: boolean
  ) => void;
  fetchFeed: () => void;
  postLikeHandler: (id: string) => void;
  debouncedSaveFunction: (id: string, saved?: boolean) => void;
  debouncedLikeFunction:(id: string) => void;
  closePostActionListModal: () => void;
  handlePinPost: (id: string, pinned?: boolean) => void;
  handleReportPost: () => void;
}

const PostListContext = createContext<PostListContextValues | undefined>(
  undefined
);

export const usePostListContext = () => {
  const context = useContext(PostListContext);
  if (!context) {
    throw new Error(
      "usePostListContext must be used within an PostListContextProvider"
    );
  }
  return context;
};

export const PostListContextProvider = ({
  children,
  navigation,
  route,
}: PostListContextProps) => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector((state) => state.feed.feed);
  const accessToken = useAppSelector((state) => state.login.accessToken);
  const showLoader = useAppSelector((state) => state.loader.count);
  const [feedPageNumber, setFeedPageNumber] = useState(1);
  const modalPosition = { x: 0, y: 0 };
  const [showActionListModal, setShowActionListModal] = useState(false);
  const [selectedMenuItemPostId, setSelectedMenuItemPostId] = useState("");
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [feedFetching, setFeedFetching] = useState(false);
  const LMFeedContextStyles = useLMFeedStyles();
  const { loaderStyle } = LMFeedContextStyles;

  // this functions gets universal feed data
  const fetchFeed = async () => {
    const payload = {
      page: feedPageNumber,
      pageSize: 20,
    };
    // calling getFeed API
    const getFeedResponse = await dispatch(
      getFeed(
        GetFeedRequest.builder()
          .setpage(payload.page)
          .setpageSize(payload.pageSize)
          .build(),
        true
      )
    );
    setFeedFetching(false);
    return getFeedResponse;
  };

  // debounce on like post function
  const debouncedLikeFunction = _.debounce(postLikeHandler, 500); // Adjust the debounce time (in milliseconds) as needed

  // useEffect hook to clean up the debounced function
  useEffect(() => {
    return () => {
      debouncedLikeFunction.cancel(); // Cancel any pending debounced executions when the component unmounts
    };
  }, [debouncedLikeFunction]);

  // this functions hanldes the post like functionality
  async function postLikeHandler(id: string) {
    const payload = {
      postId: id,
    };
    // dispatch(likePostStateHandler(payload.postId));
    // calling like post api
    const postLikeResponse = await dispatch(
      likePost(
        LikePostRequest.builder().setpostId(payload.postId).build(),
        true
      )
    );
    return postLikeResponse;
  }

  // debounce on save post function
  const debouncedSaveFunction = _.debounce(savePostHandler, 500); // Adjust the debounce time (in milliseconds) as needed

  // useEffect hook to clean up the debounced function
  useEffect(() => {
    return () => {
      debouncedSaveFunction.cancel(); // Cancel any pending debounced executions when the component unmounts
    };
  }, [debouncedSaveFunction]);

  // this functions hanldes the post save functionality
  async function savePostHandler(id: string, saved?: boolean) {
    const payload = {
      postId: id,
    };
    try {
      dispatch(savePostStateHandler(payload.postId));
      // calling the save post api
      const savePostResponse = await dispatch(
        savePost(
          SavePostRequest.builder().setpostId(payload.postId).build(),
          true
        )
      );
      await dispatch(
        showToastMessage({
          isToast: true,
          message: saved ? POST_UNSAVED_SUCCESS : POST_SAVED_SUCCESS,
        }) as any,
      );
      return savePostResponse;
    } catch (error) {
      dispatch(
        showToastMessage({
          isToast: true,
          message: SOMETHING_WENT_WRONG,
        }) as any,
      );
    }
  }

  useEffect(() => {
    setFeedFetching(true);
  }, []);
  // this calls the getFeed api whenever the page number gets changed
  useEffect(() => {
    if (accessToken) {
      // fetch feed
      fetchFeed();
    }
  }, [accessToken, feedPageNumber]);

  // this function closes the post action list modal
  const closePostActionListModal = () => {
    setShowActionListModal(false);
  };

  // this function handles the functionality on the pin option
  const handlePinPost = async (id: string, pinned?: boolean) => {
    const payload = {
      postId: id,
    };
    dispatch(pinPostStateHandler(payload.postId));
    const pinPostResponse = await dispatch(
      pinPost(PinPostRequest.builder().setpostId(payload.postId).build(), true)
    );
    if (pinPostResponse) {
      dispatch(
        showToastMessage({
          isToast: true,
          message: pinned ? POST_UNPIN_SUCCESS : POST_PIN_SUCCESS,
        }) as any,
      );
    }
    return pinPostResponse;
  };

  // this function handles the functionality on the report option
  const handleReportPost = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option
  const handleDeletePost = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function returns the id of the item selected from menu list and handles further functionalities accordingly
  const onMenuItemSelect = (
    postId: string,
    itemId?: number,
    pinnedValue?: boolean
  ) => {
    setSelectedMenuItemPostId(postId);
    if (itemId === PIN_POST_MENU_ITEM || itemId === UNPIN_POST_MENU_ITEM) {
      handlePinPost(postId, pinnedValue);
    }
    if (itemId === REPORT_POST_MENU_ITEM) {
      handleReportPost();
    }
    if (itemId === DELETE_POST_MENU_ITEM) {
      handleDeletePost(true);
    }
    if (itemId === EDIT_POST_MENU_ITEM) {
      navigation.navigate(CREATE_POST, postId);
    }
  };

  // this function gets the detail pf post whose menu item is clicked
  const getPostDetail = () => {
    const postDetail = feedData.find(
      (item: LMPostUI) => item.id === selectedMenuItemPostId
    );
    return postDetail;
  };

  const renderLoader = () => {
    return <LMLoader {...loaderStyle?.loader} />;
  };

  const contextValues: PostListContextValues = {
    navigation,
    feedData,
    accessToken,
    showLoader,
    feedPageNumber,
    modalPosition,
    showActionListModal,
    selectedMenuItemPostId,
    showDeleteModal,
    showReportModal,
    feedFetching,
    setFeedFetching,
    setShowReportModal,
    setDeleteModal,
    setSelectedMenuItemPostId,
    setShowActionListModal,
    setFeedPageNumber,
    renderLoader,
    getPostDetail,
    handleDeletePost,
    onMenuItemSelect,
    fetchFeed,
    postLikeHandler,
    debouncedLikeFunction,
    debouncedSaveFunction,
    closePostActionListModal,
    handlePinPost,
    handleReportPost,
  };

  return (
    <PostListContext.Provider value={contextValues}>
      {children}
    </PostListContext.Provider>
  );
};
