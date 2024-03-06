import { View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { styles } from "./styles";
import {
  PostLikesListContextProvider,
  PostLikesListContextValues,
  usePostLikesListContext,
} from "../../context";
import { useLMFeedStyles } from "../../lmFeedProvider";
import { LMHeader, LMLoader, LMMemberListItem } from "../../components";
import { LMLikeUI } from "../../models";

const PostLikesList = ({ navigation, route, children }) => {
  return (
    <PostLikesListContextProvider
      navigation={navigation}
      route={route}
      children={children}
    >
      <PostLikesListComponent />
    </PostLikesListContextProvider>
  );
};

const PostLikesListComponent = React.memo(() => {
  const { totalLikes, postLike, navigation }: PostLikesListContextValues =
    usePostLikesListContext();
  const LMFeedContextStyles = useLMFeedStyles();
  const { postListStyle ,postLikesListStyle} = LMFeedContextStyles;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LMHeader
        showBackArrow
        heading="Likes"
        subHeading={
          totalLikes > 1 ? `${totalLikes} likes` : `${totalLikes} like`
        }
        onBackPress={() => navigation.goBack()}
      />
      {/* post likes list */}
      {postLike?.length > 0 ? (
        <FlatList
          data={postLike}
          renderItem={({ item }: { item: LMLikeUI }) => {
            return (
              <LMMemberListItem
                likes={item}
                profilePictureProps={postListStyle?.header?.profilePicture}
                boxStyle = {postLikesListStyle?.likeListItemStyle}
              />
            );
          }}
        />
      ) : (
        <View style={styles.loaderView}>
          <LMLoader />
        </View>
      )}
    </SafeAreaView>
  );
});

export { PostLikesList };
