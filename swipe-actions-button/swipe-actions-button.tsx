import React, {Component, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {ActionButton, SwipeActionsButtonProps} from './interfaces';
import styles from './swipe-actions-button.styles';

const SwipeActionsButton = ({
  leftAction,
  rightActions,
  leftThreshold = 150,
  rightThreshold = 40,
  rightActionsTotalWidthInPrecentages = '50%',
  onPressButton,
  onEndSwipeLeft,
  style,

  ...props
}: SwipeActionsButtonProps) => {
  let swipeableRow = useRef();
  const renderLeftActions = (progress, dragX) => {
    return (
      <RectButton
        style={{
          ...styles.leftAction,

          ...leftAction.buttonStyle,
        }}
        onPress={() => {
          leftAction.onPress && leftAction.onPress();
          close();
        }}>
        <Animated.Text style={[styles.actionText, {...leftAction.textStyle}]}>
          {leftAction.name}
        </Animated.Text>
      </RectButton>
    );
  };
  const renderRightAction = ({
    text,

    onPress,
    x,
    progress,
    buttonStyle,
    textStyle,
  }: {
    text?: string;
    backColor?: string;
    textColor?: string;
    onPress?: () => void;
    x: any;
    progress: any;
    buttonStyle?: ViewStyle;
    textStyle: TextStyle;
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
            ...buttonStyle,
          }}
          onPress={() => {
            onPress && onPress();
            close();
          }}>
          <Text style={[{...styles.actionText}, {...textStyle}]}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = progress => (
    <View
      style={{
        width: rightActionsTotalWidthInPrecentages,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {rightActions.map((action: ActionButton) =>
        renderRightAction({
          text: action.name,

          onPress: action.onPress,
          x: 0,
          progress,
          buttonStyle: action.buttonStyle,
          textStyle: action.textStyle,
        }),
      )}
    </View>
  );
  const updateRef = ref => {
    swipeableRow = ref;
  };
  const close = () => {
    swipeableRow.close();
  };

  return (
    <Pressable
      style={style ? style : {}}
      onPress={() => {
        onPressButton && onPressButton();
      }}>
      <Swipeable
        ref={updateRef}
        friction={2}
        leftThreshold={leftThreshold}
        rightThreshold={rightThreshold}
        onSwipeableOpen={direction => {
          if (direction === 'left') {
            onEndSwipeLeft && onEndSwipeLeft();
          }
        }}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}>
        {props.children}
      </Swipeable>
    </Pressable>
  );
};

export default SwipeActionsButton;
