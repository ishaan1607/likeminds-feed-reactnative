import {ReactElement} from 'react';

export interface LMHeaderProps {
  heading?: string;
  rightComponent?: ReactElement;
  showBackArrow?: boolean;
  onBackPress?: () => void;
  subHeading?: string;
  // backIcon
}
