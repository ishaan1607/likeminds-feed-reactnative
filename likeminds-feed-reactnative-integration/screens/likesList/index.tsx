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
  const { postListStyle, postLikesListStyle } = LMFeedContextStyles;
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LMHeader
        {...postLikesListStyle?.screenHeader}
        showBackArrow={
          postLikesListStyle?.screenHeader?.showBackArrow != undefined
            ? postLikesListStyle?.screenHeader?.showBackArrow
            : true
        }
        heading={
          postLikesListStyle?.screenHeader?.heading
            ? postLikesListStyle?.screenHeader?.heading
            : "Likes"
        }
        subHeading={
          postLikesListStyle?.screenHeader?.subHeading
            ? postLikesListStyle?.screenHeader?.subHeading
            : totalLikes > 1
            ? `${totalLikes} likes`
            : `${totalLikes} like`
        }
        onBackPress={() => {
          navigation.goBack();
          postLikesListStyle?.screenHeader?.onBackPress();
        }}
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
                boxStyle={postLikesListStyle?.likeListItemStyle}
                nameProps={{ textStyle: postLikesListStyle?.userNameTextStyle }}
                customTitleProps={{
                  textStyle: postLikesListStyle?.userDesignationTextStyle,
                }}
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
