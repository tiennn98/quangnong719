import {Colors, Fonts} from '@/themes';
import React, {useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {fontScale, scale} from 'react-native-utils-scale';
import CText from '../text';
import {Phone} from 'lucide-react-native';

interface Props extends TextInputProps {
  name: string;
  height?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  isIconPhone?: boolean;
}

const CInput = ({
  name,
  height = 40,
  disabled = false,
  style,
  isIconPhone,
  ...props
}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <View
        style={[
          styles.viewInput,
          {height: scale(height)},
          isFocus ? styles.focusBorder : errors[name] && styles.errorBorder,
          disabled && {backgroundColor: Colors.gray300},
          style,
        ]}>
        {isIconPhone && <Phone color={Colors.primary} size={24} />}
        <Controller
          name={name}
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={() => {
                setIsFocus(false);
                onBlur();
              }}
              onFocus={() => setIsFocus(true)}
              editable={!disabled}
              selectTextOnFocus={!disabled}
              onChangeText={text => onChange(text)}
              value={value}
              placeholderTextColor={Colors.gray500}
              {...props}
            />
          )}
          {...props}
        />
      </View>
      {errors[name] && (
        <CText style={{marginTop: scale(4)}} color={Colors.red}>
          {errors[name].message as any}
        </CText>
      )}
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  viewInput: {
    paddingHorizontal: scale(12),
    justifyContent: 'space-between',
    marginTop: scale(4),
    borderRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    gap: scale(8),
  },
  input: {
    color: Colors.text,
    fontFamily: Fonts.REGULAR,
    fontSize: fontScale(14),
    flex: 1,
    height: scale(40),
  },
  focusBorder: {
    borderColor: Colors.primary,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
});
