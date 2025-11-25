import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface IProps {
  condition: boolean;
  isReturnNull?: boolean;
  style?: StyleProp<ViewStyle>;
  fallbackComponent?: () => React.ReactElement;
  children: React.ReactNode;
}
//component check show/hide
const CanView: React.FC<IProps> = ({
  condition,
  children,
  isReturnNull,
  style = {},
  fallbackComponent,
}) => {
  if (!condition && fallbackComponent) {
    return fallbackComponent();
  }

  if (!condition && isReturnNull) {
    return null;
  }
  return (
    <View style={[{display: !!condition ? 'flex' : 'none'}, style]}>
      {children}
    </View>
  );
};

export default CanView;
