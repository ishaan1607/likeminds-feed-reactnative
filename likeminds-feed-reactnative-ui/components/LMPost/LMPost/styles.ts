import { StyleSheet } from "react-native";
import STYLES from "../../../constants/constants";
import layout from "../../../utils/layout";

// default LMPost style
export const styles = StyleSheet.create({
  mainContainer: {
    width: layout.window.width,
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    marginBottom: 10,
    paddingTop: 10,
  },
});
