import { CText } from '@/components';
import CButton from '@/components/button';
import { VoucherItemDTO } from '@/services/voucher.api';
import { Colors, Fonts } from '@/themes';
import { Gift, QrCode } from 'lucide-react-native';
import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { scale } from 'react-native-utils-scale';

type Props = {
  items?: VoucherItemDTO[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  onPressUse?: (item: VoucherItemDTO) => void;
};

const fmtDate = (iso?: string) => {
  if (!iso) {return '--';}
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {return String(iso).slice(0, 10);}
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const ActiveTabScreen: React.FC<Props> = ({
                                            items,
                                            refreshing,
                                            onRefresh,
                                            onLoadMore,
                                            isFetchingNextPage,
                                            hasNextPage,
                                            onPressUse,
                                          }) => {
  // active: chưa dùng + status 0/1 + chưa hết hạn
  const data = useMemo(() => {
    const now = Date.now();
    return (items || []).filter(v => {
      const exp = v?.expired_date ? new Date(v.expired_date).getTime() : 0;
      const isExpired = !!exp && exp < now;
      const okStatus = v.status === 0 || v.status === 1;
      return okStatus && !v.is_used && !isExpired;
    });
  }, [items]);

  const renderFooter = () => {
    if (!hasNextPage) {return <View style={{height: scale(12)}} />;}
    if (!isFetchingNextPage) {return <View style={{height: scale(12)}} />;}
    return (
      <View style={styles.footer}>
        <ActivityIndicator />
        <CText style={{marginTop: scale(6)}} color={Colors.h2} fontSize={12}>
          Đang tải thêm...
        </CText>
      </View>
    );
  };

  if (!data.length) {
    return (
      <View style={styles.center}>
        <CText fontFamily={Fonts.BOLD} fontSize={16} color={Colors.h1}>
          Chưa có voucher hoạt động
        </CText>
        <CText
          fontFamily={Fonts.REGULAR}
          fontSize={14}
          color={Colors.h2}
          style={{marginTop: scale(8), textAlign: 'center'}}>
          Kéo xuống để tải lại voucher.
        </CText>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(it) => String(it.voucher_instance_id)}
      contentContainerStyle={{paddingBottom: scale(24)}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={!!refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.greenPrimary as any}
        />
      }
      onEndReachedThreshold={0.6}
      onEndReached={() => {
        // ✅ “kéo xuống cuối list” -> call API page tiếp theo
        onLoadMore?.();
      }}
      ListFooterComponent={renderFooter}
      renderItem={({item}) => (
        <View style={styles.containerItem}>
          <View style={styles.item}>
            <Gift color={Colors.yellow} />
            <View style={styles.gap}>
              <CText fontFamily={Fonts.BOLD} fontSize={14}>
                {item.name}
              </CText>
              <CText fontFamily={Fonts.REGULAR} fontSize={12} color={Colors.h2}>
                Mã: {item.code}
              </CText>
            </View>
          </View>

          <View style={styles.rowBetween}>
            <CText fontFamily={Fonts.REGULAR} fontSize={12} color={Colors.h2}>
              Hạn dùng:
            </CText>
            <CText fontFamily={Fonts.BOLD} fontSize={12} color={Colors.h1}>
              {fmtDate(item.expired_date)}
            </CText>
          </View>

          <View style={styles.barcodeBox}>
            <CText fontFamily={Fonts.REGULAR} fontSize={11} color={Colors.h2}>
              BARCODE / CODE
            </CText>
            <CText
              fontFamily={Fonts.BOLD}
              fontSize={18}
              color={Colors.h1}
              style={{letterSpacing: 2}}>
              {item.code}
            </CText>
          </View>

          <View style={styles.viewButton}>
            <CButton
              title="Sử dụng voucher"
              onPress={() => onPressUse?.(item)}
              renderIconLeft={<QrCode color={Colors.white} size={20} style={styles.icon} />}
            />
          </View>
        </View>
      )}
    />
  );
};

export default ActiveTabScreen;

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    gap: scale(8),
    marginBottom: scale(12),
  },
  item: {flexDirection: 'row', alignItems: 'center', gap: scale(8)},
  gap: {gap: scale(5), flex: 1},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  barcodeBox: {
    marginTop: scale(6),
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {paddingHorizontal: scale(12), marginTop: scale(8)},
  icon: {marginRight: scale(8)},
  center: {paddingHorizontal: scale(16), paddingVertical: scale(28), alignItems: 'center', justifyContent: 'center'},
  footer: {paddingVertical: scale(14), alignItems: 'center', justifyContent: 'center'},
});
