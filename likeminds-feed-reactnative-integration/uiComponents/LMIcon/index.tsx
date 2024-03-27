import {Image, View, StyleSheet} from 'react-native';
import React from 'react';
import {LMIconProps} from './types';
import { defaultStyles } from './styles';
import { ICON_PATH_VALIDATION_ERROR } from '../../constants/Strings';

const LMIcon = React.memo(({
  iconUrl,
  assetPath,
  color,
  height,
  width,
  boxStyle,
  iconStyle,
  boxFit,
}: LMIconProps) => {
  // this throws the error if both image url and image path are passed as props because only one is required
  if (iconUrl && assetPath) {
    throw new Error(ICON_PATH_VALIDATION_ERROR);
  }

  return (
    <>
      {/* this renders the png image */}
        <View style={boxStyle}>
          <Image
            source={
              assetPath
                ? assetPath
                : {
                    uri: iconUrl,
                  }
            }
            style={StyleSheet.flatten([
              iconStyle,
              {
                width: width ? width : defaultStyles.iconStyle.width,
                height: height ? height : defaultStyles.iconStyle.height,
                tintColor: color,
                resizeMode: boxFit
                  ? boxFit
                  : defaultStyles.iconStyle.resizeMode,
              },
            ])}
          />
        </View>
   
    </>
  );
})

export default LMIcon;
