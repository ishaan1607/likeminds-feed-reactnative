import { ReactElement } from "react";
import { LMIconProps } from "../LMIcon/types";
import { TextStyle } from "react-native";

export interface LMHeaderProps {
  heading?: string; // title on the screen
  rightComponent?: ReactElement; // any icon to be displayed on right side of header
  showBackArrow?: boolean; // wheather the back arrow has to be shown or not
  onBackPress?: () => void; // function to be executed on the back icon click
  subHeading?: string; // sub heading of the screen
  backIcon?: LMIconProps; // custom back icon
  headingStyle?: TextStyle; // style of title text
  subHeadingStyle?: TextStyle; // style of sub heading text
}
