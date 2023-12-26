import React, { PropsWithChildren, useContext, useState } from "react";
import { LMTextProps } from "../../components/LMText/types";

export const LMTextContext = React.createContext({} as LMTextProps);

export const useLMTextContext = <LMTextProps>() => {
  const contextValue = useContext(LMTextContext) as unknown as LMTextProps;
  return contextValue;
};
