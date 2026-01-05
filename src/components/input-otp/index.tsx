import React, {memo, useCallback, useEffect, useRef} from 'react';
import {Platform, StyleSheet, InteractionManager} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors, Fonts} from '@/themes';

interface Props {
  needReset?: boolean;
  onChangeValue: (value: string) => void;
}

const PIN_COUNT = 6;
const ONLY_DIGITS = /[^0-9]/g;

const InputOTP: React.FC<Props> = ({needReset, onChangeValue}) => {
  const ref = useRef<any>(null);
  const mountedRef = useRef(true);

  const focusFirst = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!mountedRef.current) {
        return;
      }
      ref.current?.focusField?.(0);
    });
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (Platform.OS === 'android') {
      const t = setTimeout(focusFirst, 250);
      return () => {
        mountedRef.current = false;
        clearTimeout(t);
      };
    }

    return () => {
      mountedRef.current = false;
    };
  }, [focusFirst]);

  useEffect(() => {
    if (!needReset) {
      return;
    }

    ref.current?.onReset?.();

    if (Platform.OS === 'android') {
      const t = setTimeout(focusFirst, 200);
      return () => clearTimeout(t);
    }
  }, [needReset, focusFirst]);

  const handleCodeChanged = useCallback(
    (code: string) => {
      const clean = (code ?? '').replace(ONLY_DIGITS, '').slice(0, PIN_COUNT);
      onChangeValue(clean);
    },
    [onChangeValue],
  );

  return (
    <OTPInputView
      ref={ref}
      style={styles.otpView}
      pinCount={PIN_COUNT}
      autoFocusOnLoad={Platform.OS === 'ios'}
      keyboardType="number-pad"
      onCodeChanged={handleCodeChanged}
      onCodeFilled={handleCodeChanged}
      codeInputFieldStyle={styles.codeInputFieldStyle}
      codeInputHighlightStyle={styles.codeInputHighlightStyle}
      textInputProps={{
        autoFocus: false,
        autoCorrect: false,
        importantForAutofill: Platform.OS === 'android' ? 'yes' : 'auto',
        textContentType: Platform.OS === 'ios' ? 'oneTimeCode' : 'none',
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

export default memo(InputOTP);
