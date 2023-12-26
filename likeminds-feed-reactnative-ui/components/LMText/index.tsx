import { StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import {LMTextContext} from '../../contexts/LMTextContext/LMTextContext'

const LMText = () => {
  const {textStyle, maxLines, children, onTextLayout, selectable}  = useContext(LMTextContext)
  return (
    // this renders the text component
    <Text
      selectable={selectable ? selectable : false} // default selectable value is false
      numberOfLines={maxLines}
      onTextLayout={onTextLayout}
      style={StyleSheet.flatten([defaultStyles.textStyle,textStyle])}
    >
      {children}
    </Text>
  );
};

// default text style
const defaultStyles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "auto",
    fontStyle: "normal",
  },
});
export default LMText
