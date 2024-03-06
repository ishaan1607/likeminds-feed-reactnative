import {TextStyle, ViewStyle} from 'react-native';
import {LMProfilePictureProps, LMIconProps} from '../../uiComponents';
import {LMActivityUI} from '../../models/LMActivityUI';

export interface LMNotificationFeedItemProps {
  activity: LMActivityUI; // notification activity data
  boxStyle?: ViewStyle; // style of the notification item view
  userProfilePicture?: LMProfilePictureProps; // props of the profile avatar
  activityTextStyle?: TextStyle; // style of activity text
  activityDateStyle?: TextStyle; // style of createdAt text
  onTap?: () => void; // callback function executed on click of notification item
  onMenuTap?: () => void; // callback funtion executed on click of menu icon
  menuIcon?: LMIconProps; // custom menu icon
}
