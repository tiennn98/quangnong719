import CText from '@/components/text';
import { ChevronDown } from 'lucide-react-native';
import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from '../style.module';

type Props = {
  value: string;
  onPress: () => void;
  disabled?: boolean;
  hint?: string;
  error?: boolean;
  placeholderLike?: boolean;
};

const SelectBox = memo(({value, onPress, disabled, hint, error, placeholderLike}: Props) => {
  const isPlaceholder = useMemo(() => {
    if (typeof placeholderLike === 'boolean') {return placeholderLike;}
    return value.includes('Bấm') || value.includes('Chọn') || value.includes('Nhập');
  }, [placeholderLike, value]);

  return (
    <View>
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({pressed}) => [
          styles.select,
          disabled && styles.selectDisabled,
          error && styles.selectError,
          pressed && !disabled && {opacity: 0.92},
        ]}>
        <CText style={[styles.selectText, isPlaceholder ? styles.placeholder : null]}>
          {value}
        </CText>
        <ChevronDown size={18} color={'rgba(0,0,0,0.45)'} />
      </Pressable>

      {hint ? <CText style={styles.hint}>{hint}</CText> : null}
    </View>
  );
});

export default SelectBox;
