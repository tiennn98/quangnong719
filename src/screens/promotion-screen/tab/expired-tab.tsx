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
};

const ExpiredTabScreen: React.FC<Props> = ({items, isLoading}) => {
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
          Chưa có voucher hết hạn / đã huỷ
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
      renderItem={({item}) => <VoucherCard item={item} showUseButton={false} />}
    />
  );
};

export default ExpiredTabScreen;

const styles = StyleSheet.create({
  center: {paddingHorizontal: scale(16), paddingVertical: scale(28), alignItems: 'center', justifyContent: 'center'},
});
