import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import LMProfilePicture from "../LMProfilePicture";
import LMText from "../LMText";
import { LMMemberListItemProps } from "./types";
import LMIcon from "../LMIcon";
import { styles } from "./styles";
import { getNameInitials } from "../../utils/utils";

const LMMemberListItem = ({
  likes,
  profilePictureProps,
  nameProps,
  customTitleProps,
  boxStyle,
  onTap,
}: LMMemberListItemProps) => {
  //creating profile picture props as per customization
  const updatedProfilePictureProps = {
    fallbackText: {
      textStyle: profilePictureProps?.fallbackText?.textStyle,
      children: <Text>{getNameInitials(likes.user.name)}</Text>,
    },
    size: profilePictureProps?.size ? profilePictureProps.size : 50,
    imageUrl: likes.user.imageUrl,
    onTap: profilePictureProps?.onTap,
    fallbackTextBoxStyle: profilePictureProps?.fallbackTextBoxStyle,
    profilePictureStyle: profilePictureProps?.profilePictureStyle,
  };
  //creating user name props as per customization
  const updatedNameProps = {
    children: <Text>{likes.user.name}</Text>,
    textStyle: nameProps?.textStyle,
  };
  //creating custom title props as per customization
  const updatedCustomTitleProps = {
    children: <Text>{likes.user.customTitle}</Text>,
    textStyle: customTitleProps?.textStyle,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (onTap ? onTap(likes.user) : null)}
    >
      <View style={StyleSheet.flatten([styles.container, boxStyle])}>
        {/* avatar view */}
        <LMProfilePicture {...updatedProfilePictureProps} />
        {/* member name */}
        <LMText
          {...updatedNameProps}
          textStyle={StyleSheet.flatten([
            styles.memberName,
            nameProps?.textStyle,
          ])}
        />
        {/* member title */}
        {likes.user.customTitle && (
          <>
            <LMIcon
              assetPath={require("../../assets/images/single_dot3x.png")}
              type="png"
              width={styles.dotImageSize.width}
              height={styles.dotImageSize.height}
              iconStyle={styles.dotImageSize}
            />
            <LMText
              {...updatedCustomTitleProps}
              textStyle={StyleSheet.flatten([
                styles.memberTitleText,
                customTitleProps?.textStyle,
              ])}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LMMemberListItem;
