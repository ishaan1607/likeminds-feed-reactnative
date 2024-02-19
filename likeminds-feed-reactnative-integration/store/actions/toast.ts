import { Alert } from "react-native";
import { SHOW_TOAST } from "../types/loader";

interface ToastMessagePayload {
  isToast: boolean;
  message?: string;
}
// show toast message action
export const showToastMessage = (payload: ToastMessagePayload) => () => {
  try {
    return {
      type: SHOW_TOAST,
      body: payload,
    };
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
