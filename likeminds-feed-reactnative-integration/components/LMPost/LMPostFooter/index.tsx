import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {LMButton} from "../../../uiComponents";
import { styles } from "./styles";
import { LMPostContextValues, useLMPostContext } from "../../../context";
import { useLMFeedStyles } from "../../../lmFeedProvider";

const LMPostFooter = React.memo(() => {
  const { post, footerProps }: LMPostContextValues = useLMPostContext();
  const LMFeedContextStyles = useLMFeedStyles();
  const { postListStyle } = LMFeedContextStyles;

  const [liked, setLiked] = useState(post?.isLiked);
  const [likeCount, setLikeCount] = useState(post?.likesCount);
  const showBookMarkIcon = postListStyle?.footer?.showBookMarkIcon != undefined ? postListStyle?.footer?.showBookMarkIcon : true;
  const showShareIcon = postListStyle?.footer?.showShareIcon != undefined ? postListStyle?.footer?.showShareIcon : true
  // handling like state and likes count locally
  useEffect(() => {
    setLiked(post?.isLiked);
    setLikeCount(post?.likesCount);
  }, [post?.isLiked, post?.likesCount]);
  const likesCountHandler = () => {
    postListStyle?.footer?.likeIconButton?.onTap && postListStyle?.footer?.likeIconButton?.onTap();
    footerProps?.likeIconButton?.onTap()
    //  todo : handle later
    // setLiked(!liked);
    // if (liked) {
    //   setLikeCount(likeCount - 1);
    // } else {
    //   setLikeCount(likeCount + 1);
    // }
  };
  return (
    <View style={StyleSheet.flatten([styles.postFooter, postListStyle?.footer?.footerBoxStyle])}>
      {/* like and comment view */}
      <View style={styles.alignRow}>
        {/* like section */}
        <View style={styles.alignRow}>
          {/* like icon button */}
          <LMButton
            onTap={likesCountHandler}
            icon={{
              assetPath: liked
                ? postListStyle?.footer?.likeIconButton?.activeIcon?.assetPath
                  ? postListStyle?.footer?.likeIconButton.activeIcon.assetPath
                  : require("../../../assets/images/heart_red_icon3x.png")
                : postListStyle?.footer?.likeIconButton?.icon?.assetPath
                ? postListStyle?.footer?.likeIconButton.icon.assetPath
                : require("../../../assets/images/heart_icon3x.png"),
              iconUrl: postListStyle?.footer?.likeIconButton?.icon?.iconUrl,
              iconStyle: postListStyle?.footer?.likeIconButton?.icon?.iconStyle,
              color: postListStyle?.footer?.likeIconButton?.icon?.color,
              height: postListStyle?.footer?.likeIconButton?.icon?.height
                ? postListStyle?.footer?.likeIconButton.icon.height
                : 20.5,
              width: postListStyle?.footer?.likeIconButton?.icon?.width
                ? postListStyle?.footer?.likeIconButton.icon.width
                : 20.5,
              boxFit: postListStyle?.footer?.likeIconButton?.icon?.boxFit,
              boxStyle: postListStyle?.footer?.likeIconButton?.icon?.boxStyle,
            }}
            buttonStyle={
              postListStyle?.footer?.likeIconButton?.buttonStyle
                ? postListStyle?.footer?.likeIconButton.buttonStyle
                : styles.defaultLikeIconView
            }
            isClickable={postListStyle?.footer?.likeIconButton?.isClickable}
          />
          {/* like text button */}
          <LMButton
            onTap={
              footerProps?.likeTextButton?.onTap
                ? likeCount >= 1
                  ? () =>{footerProps?.likeTextButton?.onTap(), postListStyle?.footer?.likeTextButton?.onTap && postListStyle?.footer?.likeTextButton?.onTap()}
                  : () => null
                : () => null
            }
            text={{
              children: likeCount
                ? likeCount > 1
                  ? `${likeCount} Likes`
                  : `${likeCount} Like`
                : "Like",
              textStyle: postListStyle?.footer?.likeTextButton?.text
                ? postListStyle?.footer?.likeTextButton.text
                : {
                    fontSize: 14.5,
                    fontWeight: "400",
                    color: "#504B4B",
                    textAlign: "left",
                    width: 55,
                  },
            }}
            buttonStyle={
              postListStyle?.footer?.likeTextButton?.buttonStyle
                ? postListStyle?.footer?.likeTextButton.buttonStyle
                : styles.defaultLikeTextView
            }
            isClickable={postListStyle?.footer?.likeTextButton?.isClickable}
          />
        </View>

        {/* comment section */}
        <View style={StyleSheet.flatten([styles.alignRow])}>
          <LMButton
            onTap={postListStyle?.footer?.commentButton?.onTap ? postListStyle?.footer?.commentButton.onTap : footerProps?.commentButton?.onTap}
            text={{
              children:
                post?.commentsCount > 0
                  ? post?.commentsCount > 1
                    ? `${post?.commentsCount} Comments`
                    : `${post?.commentsCount} Comment`
                  : "Add Comment",
              textStyle: postListStyle?.footer?.commentButton?.text
                ? postListStyle?.footer?.commentButton.text
                : {
                    marginLeft: 8,
                    fontSize: 14.5,
                    fontWeight: "400",
                    color: "#504B4B",
                  },
            }}
            icon={{
              assetPath: postListStyle?.footer?.commentButton?.icon?.assetPath
                ? postListStyle?.footer?.commentButton.icon.assetPath
                : require("../../../assets/images/comment_icon3x.png"),
              iconUrl: postListStyle?.footer?.commentButton?.icon?.iconUrl,
              iconStyle: postListStyle?.footer?.commentButton?.icon?.iconStyle,
              color: postListStyle?.footer?.commentButton?.icon?.color,
              height: postListStyle?.footer?.commentButton?.icon?.height
                ? postListStyle?.footer?.commentButton.icon.height
                : 20,
              width: postListStyle?.footer?.commentButton?.icon?.width ? postListStyle?.footer?.commentButton.icon.width : 20,
              boxFit: postListStyle?.footer?.commentButton?.icon?.boxFit,
              boxStyle: postListStyle?.footer?.commentButton?.icon?.boxStyle,
            }}
            placement={postListStyle?.footer?.commentButton?.placement}
            buttonStyle={
              postListStyle?.footer?.commentButton?.buttonStyle
                ? postListStyle?.footer?.commentButton.buttonStyle
                : styles.defaultCommentView
            }
            isClickable={postListStyle?.footer?.commentButton?.isClickable}
          />
        </View>
      </View>

      {/* save and share view */}
      <View
        style={StyleSheet.flatten([
          styles.alignRow,
          showBookMarkIcon &&
          showShareIcon&& { width: "16%", justifyContent: "space-between" },
        ])}
      >
        {/* save section */}
        {showBookMarkIcon && (
          <LMButton
            onTap={postListStyle?.footer?.saveButton?.onTap ? postListStyle?.footer?.saveButton.onTap : footerProps?.saveButton?.onTap}
            text={postListStyle?.footer?.saveButton?.text}
            icon={{
              assetPath: postListStyle?.footer?.saveButton?.icon?.assetPath
                ? postListStyle?.footer?.saveButton.icon.assetPath
                : require("../../../assets/images/bookmark_icon3x.png"),
              iconUrl: postListStyle?.footer?.saveButton?.icon?.iconUrl,
              iconStyle: postListStyle?.footer?.saveButton?.icon?.iconStyle,
              color: postListStyle?.footer?.saveButton?.icon?.color,
              height: postListStyle?.footer?.saveButton?.icon?.height ? postListStyle?.footer?.saveButton.icon.height : 18,
              width: postListStyle?.footer?.saveButton?.icon?.width ? postListStyle?.footer?.saveButton.icon.width : 18,
              boxFit: postListStyle?.footer?.saveButton?.icon?.boxFit,
              boxStyle: postListStyle?.footer?.saveButton?.icon?.boxStyle,
            }}
            placement={postListStyle?.footer?.saveButton?.placement}
            isActive={post?.isSaved}
            activeIcon={{
              assetPath: postListStyle?.footer?.saveButton?.activeIcon?.assetPath
                ? postListStyle?.footer?.saveButton.activeIcon.assetPath
                : require("../../../assets/images/saved_bookmark_icon3x.png"),
              iconUrl: postListStyle?.footer?.saveButton?.activeIcon?.iconUrl,
              iconStyle: postListStyle?.footer?.saveButton?.activeIcon?.iconStyle,
              color: postListStyle?.footer?.saveButton?.activeIcon?.color,
              height: postListStyle?.footer?.saveButton?.activeIcon?.height
                ? postListStyle?.footer?.saveButton.activeIcon.height
                : 18,
              width: postListStyle?.footer?.saveButton?.activeIcon?.width
                ? postListStyle?.footer?.saveButton.activeIcon.width
                : 18,
              boxFit: postListStyle?.footer?.saveButton?.activeIcon?.boxFit,
              boxStyle: postListStyle?.footer?.saveButton?.activeIcon?.boxStyle,
            }}
            activeText={postListStyle?.footer?.saveButton?.activeText}
            buttonStyle={
              postListStyle?.footer?.saveButton?.buttonStyle
                ? postListStyle?.footer?.saveButton.buttonStyle
                : styles.buttonWithoutBorder
            }
            isClickable={postListStyle?.footer?.saveButton?.isClickable}
          />
        )}

        {/* share section */}
        {showShareIcon && (
          <LMButton
            onTap={postListStyle?.footer?.shareButton?.onTap ? postListStyle?.footer?.shareButton.onTap : () => null}
            text={postListStyle?.footer?.shareButton?.text}
            icon={{
              assetPath: postListStyle?.footer?.shareButton?.icon?.assetPath
                ? postListStyle?.footer?.shareButton.icon.assetPath
                : require("../../../assets/images/share_icon3x.png"),
              iconUrl: postListStyle?.footer?.shareButton?.icon?.iconUrl,
              iconStyle: postListStyle?.footer?.shareButton?.icon?.iconStyle,
              color: postListStyle?.footer?.shareButton?.icon?.color,
              height: postListStyle?.footer?.shareButton?.icon?.height ? postListStyle?.footer?.shareButton.icon.height : 18,
              width: postListStyle?.footer?.shareButton?.icon?.width ? postListStyle?.footer?.shareButton.icon.width : 18,
              boxFit: postListStyle?.footer?.shareButton?.icon?.boxFit,
              boxStyle: postListStyle?.footer?.shareButton?.icon?.boxStyle,
            }}
            placement={postListStyle?.footer?.shareButton?.placement}
            activeIcon={postListStyle?.footer?.shareButton?.activeIcon}
            activeText={postListStyle?.footer?.shareButton?.activeText}
            buttonStyle={
              postListStyle?.footer?.shareButton?.buttonStyle
                ? postListStyle?.footer?.shareButton.buttonStyle
                : styles.buttonWithoutBorder
            }
            isClickable={postListStyle?.footer?.shareButton?.isClickable}
          />
        )}
      </View>
    </View>
  );
})

export default LMPostFooter;
