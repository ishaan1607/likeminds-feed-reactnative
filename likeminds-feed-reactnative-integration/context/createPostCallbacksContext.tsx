import React, { createContext, ReactNode, useContext } from "react";

export interface CreatePostCallbacksContextProps {
  children?: ReactNode;
  handleGalleryProp: (type: string) => void;
  handleDocumentProp: () => void;
}

export interface CreatePostCustomisableMethodsContext {
  handleGalleryProp: (type: string) => void;
  handleDocumentProp: () => void;
}

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
  handleDocumentProp
}: CreatePostCallbacksContextProps) => {
  const contextValues: CreatePostCustomisableMethodsContext = {
    handleGalleryProp,
    handleDocumentProp
  };

  return (
    <CreatePostCustomisableMethodsContext.Provider value={contextValues}>
      {children}
    </CreatePostCustomisableMethodsContext.Provider>
  );
};
