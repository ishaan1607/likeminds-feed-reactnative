import { View, Text } from 'react-native'
import React from 'react'
import Feed from './feed'
import DetailScreen from './detailScreen'
import { PostDetailContextProvider } from '@likeminds.community/feed-rn-core'

const Wrapper = ({navigation, route}) => {
  return (
    <PostDetailContextProvider navigation={navigation} route={route}>
      <DetailScreen />
    </PostDetailContextProvider>
  )
}

export default Wrapper