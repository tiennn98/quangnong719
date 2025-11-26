import {Colors, Fonts} from '@/themes';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  needReset?: boolean;
  onChangeValue: (value: any) => void;
  valueText?: any;
}

const InputOTP: React.FC<Props> = ({needReset, onChangeValue, valueText}) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (needReset) {
      ref?.current?.onReset?.();
    }
  }, [needReset]);

  return (
    <OTPInputView
      ref={ref}
      style={styles.otpView}
      pinCount={6}
      code={valueText}
      onCodeChanged={code => onChangeValue(code)}
      autoFocusOnLoad
      codeInputFieldStyle={styles.codeInputFieldStyle}
      codeInputHighlightStyle={styles.codeInputHighlightStyle}
      //   onCodeFilled={code => {
      //     onChangeValue(code)
      //   }}
    />
  );
};

const styles = StyleSheet.create({
  otpView: {
    width: '100%',
    height: 65,
    marginTop: 10,
  },
  timeView: {
    marginTop: 22,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  expireTimeLabel: {
    fontSize: 13,
    fontFamily: Fonts.REGULAR,
    color: Colors.grayText,
  },
  expireTime: {
    fontSize: 13,
    fontFamily: Fonts.REGULAR,
    color: Colors.blue400,
  },
  codeInputFieldStyle: {
    width: 44,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.gray900,
    color: Colors.gray900,
    borderRadius: 6,
    fontSize: 28,
    fontFamily: Fonts.SEMIBOLD,
  },
  codeInputHighlightStyle: {
    width: 44,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.gray900,
  },
});

export default InputOTP;
