import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Check, Circle, Store, Truck } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { RedemptionMethod, RedemptionMethodId } from '../types';

type Props = {
  methods: RedemptionMethod[];
  selectedId: RedemptionMethodId;
  onSelect: (id: RedemptionMethodId) => void;
};

const METHOD_ICONS = {
  store: Store,
  truck: Truck,
} as const;

const RedemptionMethodSection: React.FC<Props> = ({
  methods,
  selectedId,
  onSelect,
}) => (
  <View style={styles.section}>
    <CText style={styles.sectionTitle}>Chọn hình thức nhận quà</CText>

    <View style={styles.optionsBox}>
      {methods.map((method, index) => {
        const selected = method.id === selectedId;
        const Icon = METHOD_ICONS[method.icon];

        return (
          <Pressable
            key={method.id}
            onPress={() => onSelect(method.id)}
            style={({ pressed }) => [
              styles.option,
              selected ? styles.optionSelected : styles.optionUnselected,
              index < methods.length - 1 && styles.optionBorder,
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[
                styles.iconWrap,
                selected ? styles.iconWrapSelected : styles.iconWrapUnselected,
              ]}
            >
              <Icon
                color={selected ? Colors.greenPrimary : Colors.h2}
                size={18}
                strokeWidth={2.2}
              />
            </View>

            <View style={styles.optionContent}>
              <CText style={styles.optionTitle}>{method.title}</CText>
              <CText style={styles.optionDesc}>{method.description}</CText>
            </View>

            {selected ? (
              <View style={styles.checkCircle}>
                <Check color={Colors.white} size={12} strokeWidth={2.5} />
              </View>
            ) : (
              <Circle color={Colors.gray300} size={20} strokeWidth={1.5} />
            )}
          </Pressable>
        );
      })}
    </View>
  </View>
);

export default memo(RedemptionMethodSection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
  },
  sectionTitle: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(10),
  },
  optionsBox: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    padding: scale(12),
  },
  optionSelected: {
    backgroundColor: '#F5FBF7',
  },
  optionUnselected: {
    backgroundColor: Colors.white,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  pressed: {
    opacity: 0.9,
  },
  iconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconWrapSelected: {
    backgroundColor: '#EAF6EE',
  },
  iconWrapUnselected: {
    backgroundColor: Colors.gray100,
  },
  optionContent: {
    flex: 1,
    minWidth: 0,
  },
  optionTitle: {
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  optionDesc: {
    marginTop: scale(2),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(14),
  },
  checkCircle: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
