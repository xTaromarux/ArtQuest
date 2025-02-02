import { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";

const isIOS = Platform.OS === "ios";
const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardDidShow = (e: any) => {
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const showEvent = isIOS ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = isIOS ? "keyboardWillHide" : "keyboardDidHide";
    Keyboard.addListener(showEvent, handleKeyboardDidShow);
    Keyboard.addListener(hideEvent, handleKeyboardDidHide);
    return () => {
      Keyboard.removeAllListeners(showEvent);
      Keyboard.removeAllListeners(hideEvent);
    };
  }, []);

  return { keyboardHeight };
};

export default useKeyboardHeight;
