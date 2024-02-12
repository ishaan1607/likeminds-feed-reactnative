import { View, SafeAreaView, FlatList } from "react-native";
import React from "react";
import {
  LMHeader,
  LMLikeUI,
  LMMemberListItem,
  LMLoader,
} from "likeminds_feed_reactnative_ui";
import { styles } from "./styles";
import {
  PostLikesListContextProvider,
  PostLikesListContextValues,
  usePostLikesListContext,
} from "../../context";

const PostLikesList = ({ navigation, route, children }: any) => {
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
            return <LMMemberListItem likes={item} />;
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
