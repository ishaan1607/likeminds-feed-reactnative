import React, { PropsWithChildren, useContext, useState } from "react";
import { LMButtonProps } from "../../components/LMButton/types";

export const LMButtonContext = React.createContext({} as LMButtonProps);

export const useLMButtonContext = <LMButtonProps>() => {
  const contextValue = useContext(LMButtonContext) as unknown as LMButtonProps;
  return contextValue;
};
