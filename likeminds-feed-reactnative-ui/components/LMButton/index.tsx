import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import LMIcon from "../LMIcon";
import STYLES from "../../constants/constants";
import { LMTextContext } from "../../contexts/LMTextContext/LMTextContext";
import LMText from "../LMText";
import { LMIconContext } from "../../contexts/LMIconContext/LMIconContext";
import { LMButtonContext } from "../../contexts/LMButtonContext/LMButtonContext";

const LMButton = () => {
  const {
    text,
    icon,
    onTap,
    placement,
    isActive,
    activeIcon,
    activeText,
    buttonStyle,
    isClickable = false,
  } = useContext(LMButtonContext);

  const [active, setActive] = useState(isActive);

  // this function handles the active state of the button
  const activeStateHandler = () => {
    if (isActive !== undefined) {
      setActive(!active);
    }
  };
  return (
    <TouchableOpacity
      disabled={isClickable}
      hitSlop={{ top: 10, bottom: 10 }}
      style={StyleSheet.flatten([defaultStyles.buttonViewStyle, buttonStyle])}
      activeOpacity={0.8}
      onPress={(event) => {
        onTap(event);
        activeStateHandler();
      }}
    >
      {/* button view */}
      <View
        style={StyleSheet.flatten([
          {
            flexDirection: placement === "end" ? "row-reverse" : "row",
            alignItems: "center",
          },
        ])}
      >
        {/* icon view */}
        {icon ? (
          active ? (
            activeIcon ? (
              // this renders the icon in active state
              <LMIconContext.Provider value={activeIcon}>
                <LMIcon></LMIcon>
              </LMIconContext.Provider>
            ) : null
          ) : (
            // this renders the icon in inactive state
            <LMIconContext.Provider value={icon}>
              <LMIcon></LMIcon>
            </LMIconContext.Provider>
          )
        ) : null}
        {/* text view */}
        {text ? (
          active ? (
            activeText ? (
              // this renders the text for active state
              <LMTextContext.Provider value={activeText}>
                <LMText></LMText>
              </LMTextContext.Provider>
            ) : null
          ) : (
            // this renders the text in inactive state
            <LMTextContext.Provider value={text}>
              <LMText></LMText>
            </LMTextContext.Provider>
          )
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

// default button style
const defaultStyles = StyleSheet.create({
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

export default LMButton;
