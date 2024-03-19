import React from "react"
import { LMFeedClient } from "@likeminds.community/feed-js";

export interface LMOverlayProviderProps {
  myClient: LMFeedClient;
  children: React.ReactNode;
  userName: string;
  userUniqueId: string;
}