import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import STYLES from "../../constants/Styles";
import { LMNotificationFeedItemProps } from "./types";
import {LMIcon, LMText, LMProfilePicture} from "../../uiComponents";
import { DOCUMENT_ATTACHMENT_TYPE, IMAGE_ATTACHMENT_TYPE, VIDEO_ATTACHMENT_TYPE } from "../../constants/Strings";
import { styles } from "./styles";
import { timeStamp } from "../../utils";

const LMNotificationFeedItem = React.memo(({
  activity,
  userProfilePicture,
  boxStyle,
  activityDateStyle,
  activityTextStyle,
  onMenuTap,
  onTap,
  menuIcon,
}: LMNotificationFeedItemProps) => {
  // storing the attachments if present
  const activityAttachments = activity.activityEntityData?.attachments;
  // storing the value of attachment type of the attachment if present
  const activityAttachmentType = activityAttachments
    ? activityAttachments[0].attachmentType
    : "";
  //creating profile picture props as per customization
  const updatedProfilePictureProps = userProfilePicture
    ? userProfilePicture
    : {
        fallbackText: { children: <Text>{activity.activityByUser.name}</Text> },
        size: 50,
        imageUrl: activity.activityByUser.imageUrl,
      };
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        boxStyle,
        { backgroundColor: activity.isRead ? "" : STYLES.$COLORS.LIGHT_GREY },
      ])}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onTap}
        style={styles.flexView}
      >
        {/* profile avatar view */}
        <View>
          {/* profile picture section */}
          <LMProfilePicture {...updatedProfilePictureProps} />
          {/* handles the gallery and document icon on profile picture */}
          {activityAttachments &&
            // show gallery icon
            (activityAttachmentType === IMAGE_ATTACHMENT_TYPE ||
            activityAttachmentType === VIDEO_ATTACHMENT_TYPE ? (
              <LMIcon
                assetPath={require("../../assets/images/notification_image3x.png")}
                boxStyle={styles.notificationTypeIcon}
                height={35}
                width={35}
              />
            ) : // show document icon
            activityAttachmentType === DOCUMENT_ATTACHMENT_TYPE ? (
              <LMIcon
                assetPath={require("../../assets/images/notification_doc3x.png")}
                boxStyle={styles.notificationTypeIcon}
                height={35}
                width={35}
              />
            ) : null)}
        </View>

        {/* activity content text */}
        <View style={styles.contentView}>
          <LMText textStyle={StyleSheet.flatten([activityTextStyle])}>
            {activity.activityText.replace(/<<([^|]+)\|[^>]+>>/g, "$1")}
          </LMText>
          <LMText textStyle={StyleSheet.flatten([activityDateStyle])}>
            {timeStamp(Number(activity.createdAt))} ago
          </LMText>
        </View>
      </TouchableOpacity>
      {/* menu icon section */}
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={onMenuTap}
      >
        <>
          {menuIcon ? (
            menuIcon
          ) : (
            <LMIcon
              assetPath={require("../../assets/images/three_dots3x.png")}
              iconStyle={styles.iconSize}
            />
          )}
        </>
      </TouchableOpacity>
    </View>
  );
})

export default LMNotificationFeedItem;
