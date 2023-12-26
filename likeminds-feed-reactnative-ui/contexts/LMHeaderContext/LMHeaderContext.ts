import React, { PropsWithChildren, useContext, useState } from "react";
import { LMHeaderProps } from "../../components/LMHeader/types";

export const LMHeaderContext = React.createContext({} as LMHeaderProps);

export const useLMHeaderContext = <LMHeaderProps>() => {
  const contextValue = useContext(LMHeaderContext) as unknown as LMHeaderProps;
  return contextValue;
};
