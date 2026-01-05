/* eslint-disable react-native/no-inline-styles */
import {Colors, Fonts} from '@/themes';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {isIOS, scale} from 'react-native-utils-scale';
import CText from '../text';

interface Props {
  title?: string;
  titleStyle?: any;
  statusBarColor?: string;
  back?: boolean;
  rightIcon?: JSX.Element | null | (JSX.Element | null)[];
  rightText?: string | null;
  onPressRight?: () => void;
  onBack?: () => void;
  styles?: ViewStyle;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  rightActiveOpacity?: number;
  styleText?: TextStyle;
  isHome?: boolean;
}

const CHeader: React.FC<Props> = props => {
  const {goBack} = useNavigation();
  const {
    title,
    titleStyle = {},
    statusBarColor = Colors.greenPrimary,
    back,
    rightIcon,
    rightText,
    onPressRight,
    onBack,
    rightActiveOpacity = 0.5,
    styleText,
    isHome,
  } = props;

  return (
    <SafeAreaView
      style={{
        ...props.containerStyle,
        backgroundColor: statusBarColor,
        paddingTop: isIOS ? undefined : StatusBar.currentHeight,
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: statusBarColor,
          ...props.styles,
        }}>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor={statusBarColor}
        />

        {isHome ? (
          <CText
            fontSize={16}
            color={Colors.white}
            fontFamily={Fonts.BOLD}
            style={[
              {
                alignSelf: 'center',
                textAlign: 'left',
                ...titleStyle,
                textTransform: 'capitalize',
              },
              styleText,
            ]}>
            {title}
          </CText>
        ) : (
          <>
            <View style={styles.leftWrap}>
              {back && (
                <TouchableOpacity
                  onPress={() => (onBack ? onBack() : goBack())}>
                  <ArrowLeft size={24} color={Colors.white} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.centerWrap}>
              <CText
                fontSize={16}
                color={Colors.white}
                fontFamily={Fonts.BOLD}
                style={[
                  {
                    alignSelf: 'center',
                    textAlign: 'center',
                    ...titleStyle,
                    textTransform: 'capitalize',
                  },
                  styleText,
                ]}>
                {title}
              </CText>
            </View>

            <TouchableOpacity
              activeOpacity={rightActiveOpacity}
              style={styles.rightWrap}
              onPress={onPressRight}>
              {rightIcon ? rightIcon : <View />}
              {rightText && (
                <CText fontSize={16} color={Colors.white}>
                  {rightText}
                </CText>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CHeader;

const styles = StyleSheet.create({
  container: {
    height: scale(56),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backWrap: {
    width: scale(24),
    height: scale(24),
  },
  leftWrap: {
    flex: 0.1,
  },
  centerWrap: {
    flex: 0.8,
  },
  rightWrap: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
});
