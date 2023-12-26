import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { getNameInitials } from "../../utils";
import STYLES from "../../constants/constants";
import { LMProfilePictureContext } from "../../contexts/LMProfilePictureContext/LMProfilePictureContext";

const LMProfilePicture = () => {
  const {
    fallbackText,
    imageUrl,
    size,
    onTap,
    fallbackTextStyle,
    fallbackTextBoxStyle,
    profilePictureStyle,
  } = useContext(LMProfilePictureContext);

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
          <Text
            style={StyleSheet.flatten([
              defaultStyles.nameInitialText,
              fallbackTextStyle,
            ])}
          >
            {/* this function returns the initial characters of the string passed */}
            {getNameInitials(fallbackText)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const defaultStyles = StyleSheet.create({
  avatarView: {
    width: 48,
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    backgroundColor: STYLES.$COLORS.THEME,
    alignItems: "center",
    resizeMode: "contain",
  },
  nameInitialText: {
    color: STYLES.$COLORS.WHITE,
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Arial",
  },
});

export default LMProfilePicture;
