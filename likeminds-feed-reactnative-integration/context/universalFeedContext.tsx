import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppSelector } from "../store/store";
import { LMPostUI } from "likeminds_feed_reactnative_ui";

interface UniversalFeedContextProps {
  children: ReactNode;
  navigation: any;
  route: any;
}

export interface UniversalFeedContextValues {
  navigation: any;
  feedData: Array<LMPostUI>;
  accessToken: string;
  memberData: {};
  memberRight: [];
  postUploading: boolean;
  showCreatePost: boolean;
  setPostUploading: Dispatch<SetStateAction<boolean>>;
  setShowCreatePost: Dispatch<SetStateAction<boolean>>;
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
  route,
}: UniversalFeedContextProps) => {
  const feedData = useAppSelector((state) => state.feed.feed);
  const accessToken = useAppSelector((state) => state.login.accessToken);
  const memberData = useAppSelector((state) => state.login.member);
  const memberRight = useAppSelector((state) => state.login.memberRights);
  const [postUploading, setPostUploading] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(true);
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
  };

  return (
    <UniversalFeedContext.Provider value={contextValues}>
      {children}
    </UniversalFeedContext.Provider>
  );
};
