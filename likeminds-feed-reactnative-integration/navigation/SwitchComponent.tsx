import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PostDetail, PostsList, UniversalFeed} from '../screens';
import {navigationRef} from './RootNavigation';
import {
  POSTS_LIST,
  POST_DETAIL,
  UNIVERSAL_FEED,
} from '../constants/screenNames';

const Stack = createStackNavigator();
const SwitchComponent = () => {

  return (
      <NavigationContainer ref={navigationRef} independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={UNIVERSAL_FEED} component={UniversalFeed} />
          <Stack.Screen name={POST_DETAIL} component={PostDetail} />
          <Stack.Screen name={POSTS_LIST} component={PostsList} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default SwitchComponent;
