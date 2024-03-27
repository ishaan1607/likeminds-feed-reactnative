import { StyleSheet } from "react-native";
import STYLES from "../../../constants/Styles";
import layout from "../../../constants/Layout";

// default LMDocument style
export const styles = StyleSheet.create({
  postMedia: {
    width: "100%",
  },
  docView: {
    flexDirection: "row",
    borderColor: STYLES.$COLORS.LIGHT_GREY,
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  pdfIcon: {
    width: 28,
    height: 36,
  },
  alignRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  docTitle: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "500",
  },
  docDetail: {
    color: "#666666",
    fontSize: 13,
  },
  dotImageSize: {
    width: layout.normalize(5),
    height: layout.normalize(5),
    marginHorizontal: 5,
    tintColor: "#666666",
  },
  showMoreText: {
    fontSize: 16,
    color: STYLES.$COLORS.THEME,
  },
  documentDetailView: {
    marginLeft: 12,
    width: "90%",
    height: 36,
  },
  detailViewWithCancelOption: {
    marginLeft: 12,
    width: "72%",
    height: 36,
  },
  cancelButton: {
    marginLeft: 30,
    borderWidth: 0,
  },
  showMoreView: { paddingHorizontal: 15, marginTop: 8 },
});
