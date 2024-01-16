import { StyleSheet } from "react-native";
import STYLES from "../../../constants/constants";
import layout from "../../../utils/layout";

// default LMImage style
export const defaultStyles = StyleSheet.create({
  imageStyle: {
    height: 325,
    width: layout.window.width,
    resizeMode: "contain",
  },
  imageContainer: {
    backgroundColor: STYLES.$COLORS.BLACK,
    width: layout.window.width,
  },
  loaderView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  errorView: {
    backgroundColor: STYLES.$COLORS.LIGHT_GREY,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  errorText: {
    color: STYLES.$COLORS.RED,
  },
  cancelButtonView: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 2000,
  },
  cancelButton: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});
