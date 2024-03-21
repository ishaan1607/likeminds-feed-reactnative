import { StyleSheet } from "react-native";
import STYLES from '../../constants/Styles';

// default inputText style
export const defaultStyles = StyleSheet.create({
    textInput: {
      margin: 10,
      shadowRadius: 5,
      elevation: 8,
      borderRadius: 10,
      backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textInputWithRightIcon: {
      width: '90%',
      fontSize: 14,
      color: STYLES.$COLORS.BLACK,
    },
    textInputWithoutRightIcon: {
      width: '100%',
      fontSize: 14,
      color: STYLES.$COLORS.BLACK,
    },
    rightIconButton: {
      borderWidth: 0,
    },
  });