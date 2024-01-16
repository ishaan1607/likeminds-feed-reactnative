import { StyleSheet } from "react-native";
import STYLES from "../../constants/constants";
import layout from "../../utils/layout";

// default notification feed item style
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  iconSize: {
    width: layout.normalize(22),
    height: layout.normalize(22),
    resizeMode: "contain",
  },
  postedDetail: {
    color: STYLES.$COLORS.BLACK,
    fontSize: 14,
  },
  flexView: {
    flexDirection: "row",
  },
  notificationTypeIcon: {
    position: "absolute",
    bottom: -10,
    right: -8,
  },
  contentView: { width: "75%", marginLeft: 10 },
});
