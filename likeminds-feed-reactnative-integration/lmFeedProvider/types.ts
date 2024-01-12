import React from "react";
import { LMFeedClient } from "@likeminds.community/feed-js-beta";

interface TextStyles {
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
}

interface ThemeStyles {
  hue?: number;
  fontColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  lightBackgroundColor?: string;
}
interface NewPostButtonStylesProps {
  backgroundColor: string;
  width: string;
  padding: string;
  borderRadius: number;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
  shadowColor: string;
}

export interface ThemeContextProps {
  textStyle?: TextStyles;
  newPostButtonStyles?: NewPostButtonStylesProps;
}

export interface LMFeedProviderProps {
  myClient: LMFeedClient;
  children: React.ReactNode;
  userName: string;
  userUniqueId: string;
  themeStyles?: ThemeStyles;
  newPostButtonStyles?: NewPostButtonStylesProps;
}
