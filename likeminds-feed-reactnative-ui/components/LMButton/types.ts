import {ViewStyle} from 'react-native';
import {LMTextProps} from '../LMText/types';
import {LMIconProps} from '../LMIcon/types';

export interface LMButtonProps {
  text?: LMTextProps; // this represents the text displayed on the button
  icon?: LMIconProps; // this represents ths icon displayed on the button
  onTap: (value?: any) => void; // this represents the functionality to be executed on click of button
  placement?: 'start' | 'end'; // this represents the placement of the icon on the button
  isActive?: boolean; // this represents the active/inactive state of the button
  activeIcon?: LMIconProps; // this represents the icon to be displayed when the button is in active state
  activeText?: LMTextProps; // this represents the text to be displayed when the button is in active state
  buttonStyle?: ViewStyle; // this represents the style of the button
  isClickable?: boolean; // this represents if the button is disabled or not
}
