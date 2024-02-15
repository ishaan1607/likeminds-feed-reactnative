import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LMProfilePictureProps } from "./types";
import LMText from "../LMText";
import { defaultStyles } from "./styles";

const LMProfilePicture = React.memo(({
  fallbackText,
  imageUrl,
  size,
  onTap,
  fallbackTextBoxStyle,
  profilePictureStyle,
}: LMProfilePictureProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={onTap ? false : true}
      onPress={() => (onTap ? onTap() : null)}
    >
      {imageUrl ? (
        // this renders the avatar image
        <Image
          source={{ uri: imageUrl }}
          style={StyleSheet.flatten([
            defaultStyles.avatarView,
            profilePictureStyle,
            {
              width: size ? size : defaultStyles.avatarView.width,
              height: size ? size : defaultStyles.avatarView.height,
              resizeMode: "cover",
            },
          ])}
        />
      ) : (
        // this renders the initial characters of the name in avatar view
        <View
          style={StyleSheet.flatten([
            defaultStyles.avatarView,
            fallbackTextBoxStyle,
            {
              width: size ? size : defaultStyles.avatarView.width,
              height: size ? size : defaultStyles.avatarView.height,
            },
          ])}
        >
          <LMText
            textStyle={StyleSheet.flatten([
              defaultStyles.nameInitialText,
              fallbackText.textStyle,
            ])}
            selectable={fallbackText.selectable ? fallbackText.selectable : false}
            maxLines={fallbackText.maxLines}
          >
            {fallbackText.children}
          </LMText>
        </View>
      )}
    </TouchableOpacity>
  );
})


export default LMProfilePicture;
