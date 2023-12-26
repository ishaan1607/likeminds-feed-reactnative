import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { LMIconContext } from "../../contexts/LMIconContext/LMIconContext";
import LMIcon from "../LMIcon";
import { LMIconProps } from "../LMIcon/types";
import { LMHeaderContext } from "../../contexts/LMHeaderContext/LMHeaderContext";

const LMHeader = () => {
  const {
    heading,
    rightComponent,
    showBackArrow,
    onBackPress,
    subHeading,
    backIcon,
    headingStyle,
    subHeadingStyle,
  } = useContext(LMHeaderContext);

  const leftComponent: LMIconProps = {
    assetPath: require("../../assets/images/backArrow_icon3x.png"),
    iconStyle: defaultStyles.backArrowSize,
  };
  return (
    <View style={defaultStyles.headerViewStyle}>
      {showBackArrow && (
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={onBackPress}
        >
          <LMIconContext.Provider value={backIcon ? backIcon : leftComponent}>
            <LMIcon></LMIcon>
          </LMIconContext.Provider>
        </TouchableOpacity>
      )}
      <Text
        style={StyleSheet.flatten([defaultStyles.headingStyle, headingStyle])}
      >
        {heading}
        {subHeading && (
          <>
            {"\n"}
            <Text
              style={StyleSheet.flatten([
                defaultStyles.subHeadingStyle,
                subHeadingStyle,
              ])}
            >
              {subHeading}
            </Text>
          </>
        )}
      </Text>
      {rightComponent}
    </View>
  );
};

// default header style
const defaultStyles = StyleSheet.create({
  headerViewStyle: {
    flexDirection: "row",
    borderBottomColor: "#00000011",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
  },
  backArrowSize: { width: 25, height: 25 },
  headingStyle: {
    fontSize: 16,
    color: "#222020",
    fontWeight: "400",
    marginLeft: 8,
    flex: 1,
  },
  subHeadingStyle: { fontSize: 12, color: "#666666" },
});

export default LMHeader;
