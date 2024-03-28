import { StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";

 // default button style
 export const defaultStyles = StyleSheet.create({
  buttonViewStyle: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    borderColor: STYLES.$COLORS.BLACK,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
  },
});