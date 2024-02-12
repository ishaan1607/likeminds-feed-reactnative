import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import STYLES from "../constants/Styles";
import { StyleSheet, View } from "react-native";
import { Credentials } from "../credentials";
import { LMFeedClient } from "@likeminds.community/feed-js-beta";
import { Client } from "../client";
import { LMFeedProviderProps, ThemeContextProps } from "./types";
import { useAppDispatch } from "../store/store";
import { getMemberState, initiateUser } from "../store/actions/login";

// Create the theme context
export const LMFeedStylesContext = createContext<ThemeContextProps | undefined>(
  undefined
);

// Create a context for LMChatProvider
const LMFeedContext = createContext<LMFeedClient | undefined>(undefined);

// Create a hook to use the LMChatContext
export const useLMFeed = () => {
  const context = useContext(LMFeedContext);
  if (!context) {
    throw new Error("useLMFeed must be used within an LMFeedProvider");
  }
  return context;
};

export const useLMFeedStyles = () => {
  const context = useContext(LMFeedStylesContext);
  if (!context) {
    throw new Error("useLMFeedStyles must be used within an LMFeedProvider");
  }
  return context;
};

export const LMFeedProvider = ({
  myClient,
  children,
  userName,
  userUniqueId,
  themeStyles,
  universalFeedStyle,
  postListStyle,
  loaderStyle,
  postDetailStyle
}: LMFeedProviderProps): React.JSX.Element => {
  const [isInitiated, setIsInitiated] = useState(false);
  const dispatch  = useAppDispatch();

  useEffect(() => {
    //setting client in Client class
    Client.setMyClient(myClient);
    Credentials.setCredentials(userName, userUniqueId);

    // storing myClient followed by community details
    const callInitApi = async () => {
      const payload = {
        uuid: Credentials.userUniqueId, // uuid
        userName: Credentials.username, // user name
        isGuest: false,
      };

      const initiateResponse = await dispatch(initiateUser(payload, true));
    if (initiateResponse) {
      // calling getMemberState API
      await dispatch(getMemberState());
    }
      setIsInitiated(true);
    };
    callInitApi();
  }, []);

  useMemo(() => {
    if (themeStyles) {
      STYLES.setTheme(themeStyles);
    }
  }, []);

  return isInitiated ? (
    <LMFeedContext.Provider value={myClient}>
      <LMFeedStylesContext.Provider value={{ universalFeedStyle, postListStyle, loaderStyle, postDetailStyle }}>
        <View style={styles.flexStyling}>{children}</View>
      </LMFeedStylesContext.Provider>
    </LMFeedContext.Provider>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
  },
});
