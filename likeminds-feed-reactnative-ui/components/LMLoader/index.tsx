import {ActivityIndicator} from 'react-native';
import React, { useContext } from 'react';
import STYLES from '../../constants/constants';
import { LMLoaderContext } from '../../contexts/LMLoaderContext/LMLoaderContext';

const LMLoader = () => {
  const {color, size} = useContext(LMLoaderContext)

  return (
    <ActivityIndicator
      size={size ? size : 'large'}
      color={color ? color : STYLES.$COLORS.THEME}
    />
  );
};

export default LMLoader;
