import {TextStyle, ViewStyle} from 'react-native';

type ActionButton = {
  name: string;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  textStyle: TextStyle;
};
type SwipeActionsButtonProps = {
  rightActions: ActionButton[];
  leftAction: ActionButton;
  leftThreshold: number;
  rightThreshold: number;
  rightActionsTotalWidthInPrecentages?: string;
  onPressButton?: () => void;
  onEndSwipeLeft?: () => void;
  style?: ViewStyle;
};

export {ActionButton, SwipeActionsButtonProps};
