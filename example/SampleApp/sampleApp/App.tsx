import React from 'react';
import {
  ContextProvider,
  CreatePost,
  LMFeedProvider,
  PostDetail,
  PostLikesList,
  PostsList,
  UniversalFeed,
  UNIVERSAL_FEED,
  POSTS_LIST,
  POST_DETAIL,
  CREATE_POST,
  POST_LIKES_LIST,
} from '@likeminds.community/feed-rn-core';
import {myClient} from '.';
import {Text, ViewStyle} from 'react-native';
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
        userName="abc"
        userUniqueId="abc"
        postListStyle={{
          media: {
            postMediaStyle: {backgroundColor:'red', borderRadius:50},
            image: {
              height: 100,
              width: 100,
              imageStyle: {opacity:0.5},
              boxFit: "center",
              boxStyle: {borderColor:'green', borderWidth:2},
              // aspectRatio: 0.7,
              loaderWidget: (<Text>load</Text>),
              errorWidget: (<Text>error</Text>),
              showCancel: true,
              onCancel: () => {console.log('cansel')},
              cancelButton: {
                text: {children:<Text>cancel</Text>},
                icon: {assetPath: require('./media.png')},
                onTap: (value?: any) => {console.log('cancel button')},
                placement: "start",
                buttonStyle: {backgroundColor:'blue'},
                isClickable: true,
              }
            },
            video: {
              height: 100,
              width: 100,
              videoStyle: {opacity:0.8},
              boxFit: "stretch",
              boxStyle: {backgroundColor:'yellow'},
              // aspectRatio: 0.1,
              showControls: true,
              looping: false,
              loaderWidget: (<Text>load</Text>),
              errorWidget: (<Text>error</Text>),
              playButton: (<Text>play</Text>),
              pauseButton: (<Text>pause</Text>),
              autoPlay: false,
              showCancel: true,
              onCancel: () => {console.log('cansel')},
              cancelButton: {
                text: {children:<Text>cancel</Text>},
                icon: { assetPath: require('./media.png')},
                onTap: (value?: any) => {console.log('cancel button')},
                placement: "start",
                buttonStyle: {backgroundColor:'blue'},
                isClickable: true,
              }
            },
            carousel: {
              carouselStyle: {backgroundColor:'orange'},
              paginationBoxStyle: {borderColor:'red', borderWidth:2},
              activeIndicatorStyle: {borderRadius:0},
              inactiveIndicatorStyle: {backgroundColor:'greeb'},
              showCancel: true,
              onCancel: () => {console.log('cansel')},
              cancelButton: {
                text: {children:<Text>cancel</Text>},
                icon: { assetPath: require('./media.png')},
                onTap: (value?: any) => {console.log('cancel button')},
                placement: "start",
                buttonStyle: {backgroundColor:'blue'},
                isClickable: true,
              }
            },
            document: {
              documentIcon: { assetPath: require('./media.png')},
              defaultIconSize: 50,
              showPageCount: true,
              showDocumentSize: false,
              showDocumentFormat: true,
              documentTitleStyle: {color:'red'},
              documentDetailStyle: {color:'green'},
              documentViewStyle: {backgroundColor:"grey"},
              onTap: () => {console.log('doc')},
              showCancel: true,
              onCancel: () => {console.log('cancel doc')},
              showMoreText: false,
              showMoreTextStyle:  {color:'pink'},
              cancelButton: {
                text: {children:<Text>cancel</Text>},
                icon: { assetPath: require('./media.png')},
                onTap: (value?: any) => {console.log('cancel button')},
                placement: "start",
                buttonStyle: {backgroundColor:'blue'},
                isClickable: true,
              }
            },
            linkPreview: {
              onTap: ()=> {console.log('tap link')},
              showLinkUrl: true,
              linkPreviewBoxStyle: {borderRadius:50},
              linkTitleStyle: {color:'green'},
              linkDescriptionStyle: {color:'red'},
              linkUrlStyle: {color:'blue'},
              linkImageStyle: {borderColor:'black', borderWidth:3},
              showDescription: false,
              showImage: true,
              showTitle: true,
              showCancel: false,
              onCancel: () => {console.log('cancel link')},
              cancelButton: {
                text: {children:<Text>cancel</Text>},
                icon: {assetPath: require('./media.png')},
                onTap: (value?: any) => {console.log('cancel button')},
                placement: "start",
                buttonStyle: {backgroundColor:'blue'},
                isClickable: true,
              },
            }
          }
        }}>
        <NavigationContainer ref={navigationRef} independent={true}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={UNIVERSAL_FEED} component={UniversalFeed} />
            <Stack.Screen name={POSTS_LIST} component={PostsList} />
            <Stack.Screen name={POST_DETAIL} component={PostDetail} />
            <Stack.Screen name={CREATE_POST} component={CreatePost} />
            <Stack.Screen name={POST_LIKES_LIST} component={PostLikesList} />
          </Stack.Navigator>
        </NavigationContainer>
      </LMFeedProvider>
    </ContextProvider>
  );
};

export default App;
