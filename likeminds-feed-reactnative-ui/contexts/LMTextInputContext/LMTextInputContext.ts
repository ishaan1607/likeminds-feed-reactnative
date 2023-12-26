import React, { PropsWithChildren, useContext, useState } from "react";
import { LMInputTextProps } from "../../components/LMTextInput/types";

export const LMInputTextContext = React.createContext({} as LMInputTextProps);

export const useLMTextContext = <LMInputTextProps>() => {
  const contextValue = useContext(LMInputTextContext) as unknown as LMInputTextProps;
  return contextValue;
};
