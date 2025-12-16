import React, {memo, useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Check} from 'lucide-react-native';
import {fontScale, scale} from 'react-native-utils-scale';
import CText from '@/components/text';
import {Colors} from '@/themes';

export type CropOption = {id: string; label: string};

interface Props {
  options: CropOption[];
  value: string[];              // list of selected ids
  onChange: (next: string[]) => void;
  columns?: 2 | 3;
  maxVisible?: number;          // show “Xem thêm” when > maxVisible
}

const CropMultiSelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  columns = 2,
  maxVisible = 8,
}) => {
  const selectedSet = useMemo(() => new Set(value), [value]);

  const [visibleOptions, hiddenCount] = useMemo(() => {
    if (options.length <= maxVisible) {return [options, 0] as const;}
    return [options.slice(0, maxVisible), options.length - maxVisible] as const;
  }, [options, maxVisible]);

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(selectedSet);
      if (next.has(id)) {next.delete(id);}
      else {next.add(id);}
      onChange(Array.from(next));
    },
    [onChange, selectedSet],
  );

  const itemWidth = useMemo(() => {
    // grid 2 cột: 48% / 3 cột: 31%
    return columns === 3 ? '31.5%' : '48%';
  }, [columns]);

  return (
    <View style={styles.wrap}>
      <View style={styles.grid}>
        {visibleOptions.map(opt => {
          const active = selectedSet.has(opt.id);
          return (
            <Pressable
              key={opt.id}
              onPress={() => toggle(opt.id)}
              style={({pressed}) => [
                styles.chip,
                {width: itemWidth},
                active ? styles.chipActive : styles.chipIdle,
                pressed && {opacity: 0.92},
              ]}>
              <View style={[styles.dot, active ? styles.dotActive : styles.dotIdle]}>
                {active ? <Check size={14} color={Colors.white} /> : null}
              </View>
              <CText style={[styles.chipText, active && {color: Colors.h1}]}>
                {opt.label}
              </CText>
            </Pressable>
          );
        })}
      </View>

      {hiddenCount > 0 ? (
        <View style={{marginTop: scale(6)}}>
          <CText style={styles.moreText}>+ {hiddenCount} loại cây khác (bấm “Xem thêm”)</CText>
        </View>
      ) : null}
    </View>
  );
};

export default memo(CropMultiSelect);

const styles = StyleSheet.create({
  wrap: {marginTop: scale(6)},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
    justifyContent: 'space-between',
  },

  chip: {
    height: scale(48),
    borderRadius: scale(14),
    paddingHorizontal: scale(12),
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  chipIdle: {
    backgroundColor: '#F6F6F1',
    borderColor: 'rgba(11,43,30,0.14)',
  },
  chipActive: {
    backgroundColor: 'rgba(11,43,30,0.10)',
    borderColor: Colors.greenPrimary,
  },

  dot: {
    width: scale(22),
    height: scale(22),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotIdle: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  dotActive: {
    backgroundColor: Colors.greenPrimary,
  },

  chipText: {
    fontSize: fontScale(14),
    fontWeight: '800',
    color: Colors.h2,
  },

  moreText: {
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.45)',
    fontWeight: '600',
  },
});
