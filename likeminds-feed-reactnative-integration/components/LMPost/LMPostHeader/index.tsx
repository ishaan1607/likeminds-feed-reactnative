import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { timeStamp } from "../../../utils";
import LMPostMenu from "../LMPostMenu";
import { LMIcon, LMText, LMProfilePicture } from "../../../uiComponents";
import { nameInitials } from "../../../utils";
import { styles } from "./styles";
import { LMPostContextValues, useLMPostContext } from "../../../context";
import { useLMFeedStyles } from "../../../lmFeedProvider";
import { STATE_ADMIN } from "../../../constants/Strings";
import { useAppSelector } from "../../../store/store";

const LMPostHeader = React.memo(() => {
  const { post, headerProps }: LMPostContextValues = useLMPostContext();
  const LMFeedContextStyles = useLMFeedStyles();
  const { postListStyle } = LMFeedContextStyles;
  const memberData = useAppSelector((state) => state.login.member);

  const [modalPosition, setModalPosition] = useState(
    headerProps?.postMenu?.modalPosition
  );
  const [showPostMenuModal, setShowPostMenuModal] = useState(
    headerProps?.postMenu?.modalVisible
  );
  const showMenuIcon =
    postListStyle?.header?.showMenuIcon != undefined
      ? postListStyle?.header?.showMenuIcon
      : true;
  const showMemberStateLabel =
    postListStyle?.header?.showMemberStateLabel != undefined
      ? postListStyle?.header?.showMemberStateLabel
      : true;

  // this function closes the menu list modal
  const closePostMenuModal = () => {
    headerProps?.postMenu?.onCloseModal();
    setShowPostMenuModal(false);
  };

  // this function is executed on the click of menu icon & handles the position and visibility of the modal
  const onThreedotsClick = (event: {
    nativeEvent: { pageX: number; pageY: number };
  }) => {
    const { pageX, pageY } = event.nativeEvent;
    setShowPostMenuModal(true);
    setModalPosition({ x: pageX, y: pageY });
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.postHeader,
        postListStyle?.header?.postHeaderViewStyle,
      ])}
    >
      {/* author detail section */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => postListStyle?.header?.onTap(post?.user)}
      >
        <View style={styles.alignRow}>
          <LMProfilePicture
            fallbackText={{
              children: nameInitials(post?.user?.name),
              textStyle:
                postListStyle?.header?.profilePicture?.fallbackTextStyle,
            }}
            imageUrl={post?.user?.imageUrl}
            onTap={postListStyle?.header?.profilePicture?.onTap}
            size={postListStyle?.header?.profilePicture?.size}
            fallbackTextBoxStyle={
              postListStyle?.header?.profilePicture?.fallbackTextBoxStyle
            }
            profilePictureStyle={
              postListStyle?.header?.profilePicture?.profilePictureStyle
            }
          />
          {/* author details */}
          <View style={styles.autherDetailView}>
            {/* author heading */}
            <View style={styles.alignRow}>
              <LMText
                selectable={false}
                textStyle={StyleSheet.flatten([
                  styles.postAuthorName,
                  postListStyle?.header?.titleText,
                ])}
              >
                {post?.user?.name}
              </LMText>
              {/* member state label view */}
              {showMemberStateLabel && memberData?.state === STATE_ADMIN && (
                <View
                  style={StyleSheet.flatten([
                    styles.labelView,
                    postListStyle?.header?.memberStateViewStyle,
                  ])}
                >
                  <LMText
                    textStyle={StyleSheet.flatten([
                      styles.labelText,
                      postListStyle?.header?.memberStateTextStyle,
                    ])}
                  >{`Admin`}</LMText>
                </View>
              )}
            </View>

            {/* author subHeading */}
            <View style={styles.alignRow}>
              <LMText
                selectable={false}
                textStyle={StyleSheet.flatten([
                  styles.postedDetail,
                  postListStyle?.header?.createdAt,
                ])}
              >
                {timeStamp(Number(post?.createdAt)) ===
                undefined
                  ? "now"
                  : `${timeStamp(Number(post?.createdAt))}`}
              </LMText>
              {/* checks if the post is edited or not */}
              {post?.isEdited && (
                <>
                  <LMIcon
                    assetPath={require("../../../assets/images/single_dot3x.png")}
                    width={styles.dotImageSize.width}
                    height={styles.dotImageSize.height}
                    iconStyle={styles.dotImageSize}
                    color="#0F1E3D66"
                  />
                  <LMText
                    textStyle={StyleSheet.flatten([
                      styles.postedDetail,
                      postListStyle?.header?.createdAt,
                    ])}
                  >{`Edited`}</LMText>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Top right action buttons */}
      <View
        style={[
          styles.topRightView,
          post?.isPinned && styles.topRightViewIfPinned,
        ]}
      >
        {/* pin icon section */}
        {post?.isPinned && (
          <>
            {
              <LMIcon
                assetPath={
                  postListStyle?.header?.pinIcon?.assetPath
                    ? postListStyle?.header?.pinIcon?.assetPath
                    : require("../../../assets/images/pin_icon3x.png")
                }
                iconStyle={postListStyle?.header?.pinIcon?.iconStyle ? postListStyle?.header?.pinIcon?.iconStyle : styles.iconSize}
                iconUrl={postListStyle?.header?.pinIcon?.iconUrl}
                color={postListStyle?.header?.pinIcon?.color}
                width={
                  postListStyle?.header?.pinIcon?.width ? postListStyle?.header?.pinIcon?.width : 20
                }
                height={
                  postListStyle?.header?.pinIcon?.height
                    ? postListStyle?.header?.pinIcon?.height
                    : 20
                }
                boxFit={postListStyle?.header?.pinIcon?.boxFit}
                boxStyle={postListStyle?.header?.pinIcon?.boxStyle}
              />
            }
          </>
        )}
        {/* menu icon section */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onThreedotsClick}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <>
            {showMenuIcon && (
              <LMIcon
                assetPath={
                  postListStyle?.header?.menuIcon?.assetPath
                    ? postListStyle?.header?.menuIcon?.assetPath
                    : require("../../../assets/images/three_dots3x.png")
                }
                iconStyle={postListStyle?.header?.menuIcon?.iconStyle ? postListStyle?.header?.menuIcon?.iconStyle : styles.iconSize}
                iconUrl={postListStyle?.header?.menuIcon?.iconUrl}
                color={postListStyle?.header?.menuIcon?.color}
                width={
                  postListStyle?.header?.menuIcon?.width
                    ? postListStyle?.header?.menuIcon.width
                    : 20
                }
                height={
                  postListStyle?.header?.menuIcon?.height
                    ? postListStyle?.header?.menuIcon.height
                    : 20
                }
                boxFit={postListStyle?.header?.menuIcon?.boxFit}
                boxStyle={postListStyle?.header?.menuIcon?.boxStyle}
              />
            )}
          </>
        </TouchableOpacity>
      </View>

      {/* menu list modal */}
      <LMPostMenu
        postId={post?.id}
        menuItems={post?.menuItems}
        onSelected={headerProps?.postMenu?.onSelected}
        modalPosition={modalPosition}
        modalVisible={showPostMenuModal}
        onCloseModal={closePostMenuModal}
        menuItemTextStyle={postListStyle?.header?.postMenu?.menuItemTextStyle}
        menuViewStyle={postListStyle?.header?.postMenu?.menuViewStyle}
        backdropColor={postListStyle?.header?.postMenu?.backdropColor}
      />
    </View>
  );
});

export default LMPostHeader;
