import React, { PropsWithChildren, useContext, useState } from "react";
import { LMIconProps } from "../../components/LMIcon/types";

export const LMIconContext = React.createContext({} as LMIconProps);

export const useLMIconContext = <LMIconProps>() => {
  const contextValue = useContext(LMIconContext) as unknown as LMIconProps;
  return contextValue;
};
