import React, { createContext, ReactNode, useContext } from "react";

export interface CreatePostCallbacksContextProps {
  children?: ReactNode;
  handleGalleryProp: () => void;
  handleDocumentProp: () => void;
  removeDocumentAttachmentProp: () => void;
  removeMediaAttachmentProp: () => void;
  removeSingleAttachmentProp: () => void;
}

export interface CreatePostCustomisableMethodsContext {}

const CreatePostCustomisableMethodsContext = createContext<
  CreatePostCustomisableMethodsContext | undefined
>(undefined);

export const useCreatePostCustomisableMethodsContext = () => {
  const context = useContext(CreatePostCustomisableMethodsContext);
  if (!context) {
    throw new Error(
      "useCreatePostCustomisableMethodsContext must be used within an CreatePostCustomisableMethodsContext"
    );
  }
  return context;
};

export const CreatePostCustomisableMethodsContextProvider = ({
  children,
  handleGalleryProp,
  handleDocumentProp,
  removeDocumentAttachmentProp,
  removeMediaAttachmentProp,
  removeSingleAttachmentProp,
}: CreatePostCallbacksContextProps) => {
  const contextValues: CreatePostCustomisableMethodsContext = {
    handleGalleryProp,
    handleDocumentProp,
    removeDocumentAttachmentProp,
    removeMediaAttachmentProp,
    removeSingleAttachmentProp,
  };

  return (
    <CreatePostCustomisableMethodsContext.Provider value={contextValues}>
      {children}
    </CreatePostCustomisableMethodsContext.Provider>
  );
};
