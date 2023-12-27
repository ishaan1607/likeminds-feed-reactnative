import React, { PropsWithChildren, useContext, useState } from "react";
import { LMLoaderProps } from "../../components/LMLoader/types";

export const LMLoaderContext = React.createContext({} as LMLoaderProps);

export const useLMLoaderContext = <LMLoaderProps>() => {
  const contextValue = useContext(LMLoaderContext) as unknown as LMLoaderProps;
  return contextValue;
};
