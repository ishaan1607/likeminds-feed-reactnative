import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {LMHeaderProps} from './types';
import { defaultStyles } from './styles';

const LMHeader = ({
  heading,
  rightComponent,
  showBackArrow,
  onBackPress,
  subHeading,
}: LMHeaderProps) => {
  return (
    <View style={defaultStyles.headerViewStyle}>
      {showBackArrow && (
        <TouchableOpacity
          activeOpacity={0.8}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={onBackPress}>
          <Image
            source={require('../../assets/images/backArrow_icon3x.png')}
            style={defaultStyles.backArrowSize}
          />
        </TouchableOpacity>
      )}
      <Text style={defaultStyles.headingStyle}>
        {heading}
        {subHeading && (
          <>
            {'\n'}
            <Text style={defaultStyles.subHeadingStyle}>{subHeading}</Text>
          </>
        )}
      </Text>
      {rightComponent}
    </View>
  );
};

export default LMHeader;
