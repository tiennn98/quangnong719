import React, {useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {scale} from 'react-native-utils-scale';
import {CText} from '@/components';
import {Colors, Fonts} from '@/themes';
import {VoucherItemDTO} from '@/services/voucher.api';

type Props = {
  items?: VoucherItemDTO[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
};

const ExpiredTabScreen: React.FC<Props> = ({items, refreshing, onRefresh, onLoadMore}) => {
  const data = useMemo(() => {
    const now = Date.now();
    return (items || []).filter(v => {
      const exp = v?.expired_date ? new Date(v.expired_date).getTime() : 0;
      return (exp && exp < now) || v.status === 3;
    });
  }, [items]);
  
  if (!data.length) {
    return (
      <View style={styles.center}>
        <CText fontFamily={Fonts.BOLD} fontSize={16} color={Colors.h1}>
          Chưa có voucher hết hạn
        </CText>
        <CText fontFamily={Fonts.REGULAR} fontSize={14} color={Colors.h2} style={{marginTop: scale(8)}}>
          Kéo xuống để tải lại.
        </CText>
      </View>
    );
  }
  
  return (
    <FlatList
      data={data}
      keyExtractor={(it) => String(it.voucher_instance_id)}
      contentContainerStyle={{paddingBottom: scale(24)}}
      refreshControl={<RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />}
      onEndReachedThreshold={0.6}
      onEndReached={() => onLoadMore?.()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <CText fontFamily={Fonts.BOLD} color={Colors.h1}>{item.name}</CText>
          <CText fontFamily={Fonts.REGULAR} color={Colors.h2} fontSize={12} style={{marginTop: 4}}>
            Mã: {item.code}
          </CText>
        </View>
      )}
    />
  );
};

export default ExpiredTabScreen;

const styles = StyleSheet.create({
  card: {backgroundColor: Colors.white, borderRadius: scale(12), padding: scale(12), marginBottom: scale(12)},
  center: {paddingHorizontal: scale(16), paddingVertical: scale(28), alignItems: 'center', justifyContent: 'center'},
});
