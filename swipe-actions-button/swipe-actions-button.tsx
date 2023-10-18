import React, {Component, useRef} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  Pressable,
} from "react-native";

import {RectButton, Swipeable} from "react-native-gesture-handler";
import {ActionButton, SwipeActionsButtonProps} from "./interfaces";

const SwipeActions = ({
  leftAction,
  rightActions,
  leftThreshold = 150,
  rightThreshold = 40,
  rightActionsTotalWidthInPrecentages = "50%",
  onPressButton,
  ...props
}: SwipeActionsButtonProps) => {
  let swipeableRow = useRef();
  const renderLeftActions = (progress, dragX) => {
    return (
      <RectButton
        style={{
          ...styles.leftAction,
          ...(leftAction.backgroundColor
            ? {backgroundColor: leftAction.backgroundColor}
            : {}),
        }}
        onPress={() => {
          leftAction.onPress && leftAction.onPress();
          close();
        }}
      >
        <Animated.Text style={[styles.actionText]}>
          {leftAction.name}
        </Animated.Text>
      </RectButton>
    );
  };
  const renderRightAction = ({
    text,
    backColor,
    textColor,
    onPress,
    x,
    progress,
  }: {
    text?: string;
    backColor?: string;
    textColor?: string;
    onPress?: () => void;
    x: any;
    progress: any;
  }) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
        <RectButton
          style={{
            ...styles.rightAction,
            ...(backColor ? {backgroundColor: backColor} : {}),
          }}
          onPress={() => {
            onPress && onPress();
            close();
          }}
        >
          <Text
            style={{
              ...styles.actionText,
              ...(textColor ? {color: textColor} : {}),
            }}
          >
            {text}
          </Text>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = (progress) => (
    <View
      style={{
        width: rightActionsTotalWidthInPrecentages,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {rightActions.map((action: ActionButton) =>
        renderRightAction({
          text: action.name,
          backColor: action.backgroundColor,
          textColor: action.textColor,
          onPress: action.onPress,
          x: 0,
          progress,
        })
      )}
    </View>
  );
  const updateRef = (ref) => {
    swipeableRow = ref;
  };
  const close = () => {
    swipeableRow.close();
  };

  return (
    <Pressable
      onPress={() => {
        onPressButton && onPressButton();
      }}
    >
      <Swipeable
        ref={updateRef}
        friction={2}
        leftThreshold={leftThreshold}
        rightThreshold={rightThreshold}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
      >
        {props.children}
      </Swipeable>
    </Pressable>
  );
};

export default SwipeActions;

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
