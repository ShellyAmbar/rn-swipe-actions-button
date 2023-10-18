type ActionButton = {
  name: string;
  textColor: string;
  backgroundColor?: string;
  onPress?: () => void;
};
type SwipeActionsButtonProps = {
  rightActions: ActionButton[];
  leftAction: ActionButton;
  leftThreshold: number;
  rightThreshold: number;
  rightActionsTotalWidthInPrecentages?: string;
  onPressButton?: () => void;
};

export {ActionButton, SwipeActionsButtonProps};
