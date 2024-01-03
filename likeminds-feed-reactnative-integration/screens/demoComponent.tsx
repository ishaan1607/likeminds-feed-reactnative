import React from 'react';
import {Button, Text, View} from 'react-native'
import { useAppContext } from '../store/AppContext';

const DemoComponent = () => {
  const { state, dispatch } = useAppContext();

  const handleButtonClick = () => {
    // Dispatch an action when the button is clicked
    dispatch({ type: 'ACTION_TYPE', payload: 'new name' });
  };

  return (
    <View>
      <Text>State value: {state.name}</Text>
      <Text onPress={handleButtonClick}>Click me</Text>
    </View>
  );
};

export default DemoComponent;
