import { View, Text } from 'react-native'
import React from 'react'
import Feed from './feed'
import DetailScreen from './detailScreen'
import { PostListContextProvider, UniversalFeedContextProvider } from '@likeminds.community/feed-rn-core'

const FeedWrapper = ({navigation, route}) => {
  return (
    <UniversalFeedContextProvider navigation={navigation} route={route}>
        <PostListContextProvider navigation={navigation} route={route} >
            <Feed />
        </PostListContextProvider>
    </UniversalFeedContextProvider>
  )
}

export default FeedWrapper