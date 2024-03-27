import React, { createContext, ReactNode, useContext } from "react";

export interface PostDetailCallbacksContextProps {
  children?: ReactNode;
  getCommentsRepliesProp: (    postId: string,
    commentId: string,
    repliesResponseCallback: any,
    pageNo: number) => void;
  addNewCommentProp: (postId: string) => void;
  addNewReplyProp: (postId: string, commentId: string) => void;
  commentLikeHandlerProp: (postId: string, commentId: string) => void;
  onCommentMenuItemSelectProp: (commentId: string, itemId?: number) => void;
}

export interface PostDetailCustomisableMethodsContext {
  getCommentsRepliesProp: (    postId: string,
    commentId: string,
    repliesResponseCallback: any,
    pageNo: number) => void;
  addNewCommentProp: (postId: string) => void;
  addNewReplyProp: (postId: string, commentId: string) => void;
  commentLikeHandlerProp: (postId: string, commentId: string) => void;
  onCommentMenuItemSelectProp: (commentId: string, itemId?: number) => void;
}

const PostDetailCustomisableMethodsContext = createContext<
  PostDetailCustomisableMethodsContext | undefined
>(undefined);

export const usePostDetailCustomisableMethodsContext = () => {
  const context = useContext(PostDetailCustomisableMethodsContext);
  if (!context) {
    throw new Error(
      "usePostDetailCustomisableMethodsContext must be used within an PostDetailCustomisableMethodsContext"
    );
  }
  return context;
};

export const PostDetailCustomisableMethodsContextProvider = ({
  children,
  onCommentMenuItemSelectProp,
  getCommentsRepliesProp,
  commentLikeHandlerProp,
  addNewCommentProp,
  addNewReplyProp
}: PostDetailCallbacksContextProps) => {
  const contextValues: PostDetailCustomisableMethodsContext = {
    onCommentMenuItemSelectProp,
    getCommentsRepliesProp,
    commentLikeHandlerProp,
    addNewCommentProp,
    addNewReplyProp
  };

  return (
    <PostDetailCustomisableMethodsContext.Provider value={contextValues}>
      {children}
    </PostDetailCustomisableMethodsContext.Provider>
  );
};
