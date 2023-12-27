import React, { PropsWithChildren, useContext, useState } from "react";
import { LMProfilePictureProps } from "../../components/LMProfilePicture/types";

export const LMProfilePictureContext = React.createContext({} as LMProfilePictureProps);

export const useLMProfilePictureContext = <LMProfilePictureProps>() => {
  const contextValue = useContext(LMProfilePictureContext) as unknown as LMProfilePictureProps;
  return contextValue;
};
