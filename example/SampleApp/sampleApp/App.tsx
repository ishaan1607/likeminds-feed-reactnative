import React from 'react';
import {
  AppProvider,
  LMFeedProvider,
} from 'likeminds-feed-reactnative-integration';
import {myClient} from '.';
import {Text} from 'react-native';
const App = () => {
  // custom style of new post button
  const newPostStyle = {
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
    <AppProvider>
      <LMFeedProvider
        myClient={myClient}
        userName="user123"
        userUniqueId="0e53748a-969b-44c6-b8fa-a4c8e1eb1208"
        newPostButtonStyles={newPostStyle}>
        <Text>Sample app</Text>
      </LMFeedProvider>
    </AppProvider>
  );
};

export default App;
