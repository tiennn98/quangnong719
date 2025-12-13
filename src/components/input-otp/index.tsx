import {Colors, Fonts} from '@/themes';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  needReset?: boolean;
  onChangeValue: (value: any) => void;
}

const InputOTP: React.FC<Props> = ({needReset, onChangeValue}) => {
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
      autoFocusOnLoad
      onCodeChanged={code => onChangeValue(code)}
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
  codeInputFieldStyle: {
    width: 44,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.h2,
    color: Colors.h1,
    borderRadius: 6,
    fontSize: 28,
    fontFamily: Fonts.SEMIBOLD,
    backgroundColor: Colors.primary,
  },
  codeInputHighlightStyle: {
    width: 44,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.h1,
  },
});

export default InputOTP;
