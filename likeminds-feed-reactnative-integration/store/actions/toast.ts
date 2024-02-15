import {Alert} from 'react-native';
import {SHOW_TOAST} from '../types/loader';

// show toast message action
export const showToastMessage =
  (payload?: any) => () => {
    try {
      return {
        type: SHOW_TOAST,
        body: payload,
      };
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
