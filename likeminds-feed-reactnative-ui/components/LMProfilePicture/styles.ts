import { StyleSheet } from "react-native";
import STYLES from "../../constants/constants";

export const defaultStyles = StyleSheet.create({
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
      fontWeight: STYLES.$FONT_WEIGHT.MEDIUM,
      fontSize: 16,
      fontFamily: "Arial",
    },
  });