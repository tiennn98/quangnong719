import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {scale} from 'react-native-utils-scale';
import {CText} from '@/components';
import {Colors, Fonts} from '@/themes';
import VoucherCard from '../components/VoucherCard';
import type {VoucherItemDTO} from '@/services/voucher.api';

type Props = {
  items?: VoucherItemDTO[];
  isLoading?: boolean;
  onPressUse?: (item: VoucherItemDTO) => void;
};

const ActiveTabScreen: React.FC<Props> = ({items, isLoading, onPressUse}) => {
  const data = items || [];
  
  if (isLoading) {
    return (
      <View style={styles.center}>
        <CText fontFamily={Fonts.MEDIUM} color={Colors.h2}>
          Đang tải voucher...
        </CText>
      </View>
    );
  }
  
  if (!data.length) {
    return (
      <View style={styles.center}>
        <CText fontFamily={Fonts.BOLD} fontSize={16} color={Colors.h1}>
          Chưa có voucher hoạt động
        </CText>
        <CText fontFamily={Fonts.REGULAR} fontSize={14} color={Colors.h2} style={styles.desc}>
          Khi có chương trình mới, voucher sẽ hiển thị tại đây.
        </CText>
      </View>
    );
  }
  
  return (
    <FlatList
      data={data}
      keyExtractor={(it) => String(it.voucher_instance_id)}
      contentContainerStyle={{paddingBottom: scale(24), gap: scale(12)}}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <VoucherCard item={item} onPressUse={onPressUse} />}
    />
  );
};

export default ActiveTabScreen;

const styles = StyleSheet.create({
  center: {paddingHorizontal: scale(16), paddingVertical: scale(28), alignItems: 'center', justifyContent: 'center'},
  desc: {marginTop: scale(8), textAlign: 'center'},
});
