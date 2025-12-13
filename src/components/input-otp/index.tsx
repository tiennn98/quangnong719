import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors, Fonts} from '@/themes';

interface Props {
  needReset?: boolean;
  onChangeValue: (value: string) => void;
}

const InputOTP: React.FC<Props> = ({needReset, onChangeValue}) => {
  const ref = useRef<any>(null);

  // Force focus after mount (Android often needs delay)
  useEffect(() => {
    const t = setTimeout(() => {
      ref.current?.focusField?.(0);
    }, 300);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (needReset) {
      ref.current?.onReset?.();
      setTimeout(() => ref.current?.focusField?.(0), 200);
    }
  }, [needReset]);

  return (
    <OTPInputView
      ref={ref}
      style={styles.otpView}
      pinCount={6}
      autoFocusOnLoad
      keyboardType="number-pad"
      onCodeChanged={code => onChangeValue(code)}
      codeInputFieldStyle={styles.codeInputFieldStyle}
      codeInputHighlightStyle={styles.codeInputHighlightStyle}
      textInputProps={{
        autoFocus: true,
        autoCorrect: false,
        importantForAutofill: 'yes',
        textContentType: 'oneTimeCode',
        showSoftInputOnFocus: true,
        keyboardType: 'number-pad',
        returnKeyType: 'done',
      }}
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
