/* eslint-disable react-native/no-inline-styles */
import {Colors} from '@/themes';
import React, {ReactNode} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {fontScale} from 'react-native-utils-scale';

export interface Props extends TextProps {
  children?: ReactNode;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'justify' | 'center';
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
}

const CText = ({
  children,
  fontFamily,
  fontSize = 14,
  align = 'left',
  uppercase,
  style,
  color = Colors.text,
  ...props
}: Props) => {
  return (
    <Text
      style={[
        {
          fontSize: fontScale(fontSize),
          fontFamily: fontFamily,
          color: color,
          textAlign: align,
          textTransform: uppercase ? 'uppercase' : undefined,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CText;
