/* eslint-disable react-native/no-inline-styles */
import {Colors, Fonts} from '@/themes';
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {scale} from 'react-native-utils-scale';
import CText from '../text';

type Props = {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  renderIconLeft?: ReactNode;
};

const CButton = ({
  onPress,
  title,
  isLoading,
  disabled,
  style,
  renderIconLeft,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isLoading || disabled}
      style={[
        styles.container,
        style,
        {
          opacity: disabled ? 0.5 : 1,
          // backgroundColor: Colors.buttonbg,
        },
      ]}>
      {isLoading && (
        <ActivityIndicator
          style={{marginRight: scale(6)}}
          color={Colors.white}
        />
      )}
      {renderIconLeft && renderIconLeft}
      <CText color={Colors.primary} fontFamily={Fonts.BOLD}>
        {title}
      </CText>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
    flexDirection: 'row',
  },
});
