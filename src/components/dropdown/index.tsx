import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';
import {ChevronDown} from 'lucide-react-native';

import CText from '@/components/text';
import {fontScale} from 'react-native-utils-scale';
import {Colors} from '@/themes/color';

export type DropdownItem<T extends string | number = string> = {
  label: string;
  value: T;
};

export type CDropdownProps<T extends string | number = string> = {
  name: string;
  items: DropdownItem<T>[];
  placeholder?: string;
  disabled?: boolean;
  closeOnSelect?: boolean;

  containerStyle?: StyleProp<ViewStyle>;
  selectStyle?: StyleProp<ViewStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
};

function CDropdownComponent<T extends string | number = string>({
  name,
  items,
  placeholder = 'Chọn',
  disabled = false,
  closeOnSelect = true,
  containerStyle,
  selectStyle,
  dropdownStyle,
  optionStyle,
}: CDropdownProps<T>) {
  const {control} = useFormContext();
  const [open, setOpen] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  const iconRotate = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      }),
    [progress],
  );

  const opacity = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [0, 0.3, 1],
      }),
    [progress],
  );

  const run = useCallback(
    (toOpen: boolean) => {
      Animated.timing(progress, {
        toValue: toOpen ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    },
    [progress],
  );

  const toggle = useCallback(() => {
    if (disabled) {
      return;
    }
    setOpen(prev => {
      const next = !prev;
      run(next);
      return next;
    });
  }, [disabled, run]);

  const close = useCallback(() => {
    setOpen(false);
    run(false);
  }, [run]);

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}}) => {
        const selected = items.find(it => it.value === value);
        const displayLabel = selected?.label ?? '';

        const onSelect = (item: DropdownItem<T>) => {
          onChange(item.value);

          if (closeOnSelect) {
            requestAnimationFrame(() => close());
          }
        };

        return (
          <View style={containerStyle}>
            <Pressable
              onPress={toggle}
              style={[
                styles.selectBox,
                selectStyle,
                disabled && styles.disabled,
              ]}
              hitSlop={8}>
              <CText
                fontSize={fontScale(16)}
                color={displayLabel ? Colors.h2 : 'rgba(0,0,0,0.45)'}
                style={{flex: 1}}
                numberOfLines={1}>
                {displayLabel || placeholder}
              </CText>

              <Animated.View style={{transform: [{rotate: iconRotate}]}}>
                <ChevronDown size={20} color="#0B2B1E" />
              </Animated.View>
            </Pressable>

            {open && (
              <Animated.View
                style={[styles.dropdown, dropdownStyle, {opacity}]}>
                {items.map(item => {
                  const isSelected = item.value === value;
                  return (
                    <Pressable
                      key={String(item.value)}
                      onPress={() => onSelect(item)}
                      style={[styles.option, optionStyle]}>
                      <CText
                        fontSize={fontScale(15)}
                        color={Colors.h2}
                        style={{flex: 1}}>
                        {item.label}
                      </CText>
                      {isSelected ? <View style={styles.dot} /> : null}
                    </Pressable>
                  );
                })}
              </Animated.View>
            )}
          </View>
        );
      }}
    />
  );
}

const CDropdown = memo(CDropdownComponent) as typeof CDropdownComponent;
export default CDropdown;

const styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  disabled: {opacity: 0.6},

  dropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    borderRadius: 14,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: Colors.greenPrimary,
  },
});
