import { StyleSheet } from "react-native";
import STYLES from "../../../constants/constants";

// default link preview style
export const styles = StyleSheet.create({
  postMedia: {
    width: "100%",
    paddingHorizontal: 15,
  },
  previewContainer: {
    borderColor: STYLES.$COLORS.LIGHT_GREY,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  previewImage: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  previewTitle: {
    fontWeight: "500",
    color: STYLES.$COLORS.TEXT_COLOR,
    fontSize: 16,
  },
  previewDescription: {
    color: STYLES.$COLORS.TEXT_COLOR,
    paddingVertical: 2,
    opacity: 0.8,
  },
  previewLink: {
    color: STYLES.$COLORS.TEXT_COLOR,
    fontSize: 12,
    opacity: 0.7,
  },
  previewDetailView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  cancelButtonView: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  previewImageView: {
    borderRadius: 8,
    width: "100%",
  },
  cancelButton: {
    borderWidth: 0,
    backgroundColor: "transparent",
  },
});
