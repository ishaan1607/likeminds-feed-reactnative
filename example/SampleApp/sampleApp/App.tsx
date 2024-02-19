import React from 'react';
import {
  ContextProvider,
  LMFeedProvider,
  PostDetail,
  PostsList,
  UniversalFeed,
  UNIVERSAL_FEED,
  POSTS_LIST,
  POST_DETAIL
} from 'likeminds-feed-reactnative-integration';
import {myClient} from '.';
import {ViewStyle} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';

const App = () => {
  const Stack = createStackNavigator();
  // custom style of new post button
  const newPostButtonStyle: ViewStyle = {
    backgroundColor: 'red',
    width: '40%',
    padding: '10%',
    borderRadius: 35,
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  };
  return (
    <ContextProvider>
      <LMFeedProvider
        myClient={myClient}
        userName="user123"
        userUniqueId="user123"
        >
        <NavigationContainer ref={navigationRef} independent={true}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={UNIVERSAL_FEED} component={UniversalFeed} />
            <Stack.Screen name={POSTS_LIST} component={PostsList} />
            <Stack.Screen name={POST_DETAIL} component={PostDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </LMFeedProvider>
    </ContextProvider>
  );
};

export default App;
