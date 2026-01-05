import CText from '@/components/text';
import { Search } from 'lucide-react-native';
import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { scale } from 'react-native-utils-scale';
import { styles } from '../style.module';

export type PickerItem = {id: string; name: string; code: number};

type Props = {
  visible: boolean;
  title: string;
  items: PickerItem[];
  onClose: () => void;
  onSelect: (it: PickerItem) => void;
  emptyText?: string;
  loading?: boolean;
  errorText?: string;
};

const PickerModal = memo(({
  visible,
  title,
  items,
  onClose,
  onSelect,
  emptyText,
  loading,
  errorText,
}: Props) => {
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!visible) {setQ('');}
  }, [visible]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) {return items;}
    return items.filter(it => it.name.toLowerCase().includes(t));
  }, [items, q]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <CText style={styles.modalTitle}>{title}</CText>
            <Pressable onPress={onClose} hitSlop={10}>
              <CText style={styles.modalClose}>Đóng</CText>
            </Pressable>
          </View>

          <View style={styles.searchBox}>
            <Search size={16} color={'rgba(0,0,0,0.45)'} />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Gõ để tìm nhanh..."
              placeholderTextColor={'rgba(0,0,0,0.45)'}
              style={styles.searchInput}
              returnKeyType="done"
            />
          </View>

          {loading ? (
            <View style={{paddingVertical: scale(18)}}>
              <CText style={styles.emptyText}>Đang tải...</CText>
            </View>
          ) : errorText ? (
            <View style={{paddingVertical: scale(18)}}>
              <CText style={styles.emptyText}>{errorText}</CText>
            </View>
          ) : filtered.length === 0 ? (
            <View style={{paddingVertical: scale(18)}}>
              <CText style={styles.emptyText}>{emptyText || 'Không có dữ liệu'}</CText>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(it) => it.id}
              showsVerticalScrollIndicator={false}
              style={{maxHeight: scale(420)}}
              keyboardShouldPersistTaps="handled"
              initialNumToRender={18}
              windowSize={7}
              removeClippedSubviews
              renderItem={({item}) => (
                <Pressable
                  onPress={() => onSelect(item)}
                  style={({pressed}) => [styles.pickItem, pressed && {opacity: 0.9}]}>
                  <CText style={styles.pickItemText}>{item.name}</CText>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
            />
          )}
        </View>
      </View>
    </Modal>
  );
});

export default PickerModal;
