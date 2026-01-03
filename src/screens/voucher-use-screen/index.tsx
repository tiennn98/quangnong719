import { CText } from '@/components';
import HeaderBack from '@/components/HeaderBack';
import { Colors, Fonts } from '@/themes';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BarcodeCreatorView, BarcodeFormat } from 'react-native-barcode-creator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale, width } from 'react-native-utils-scale';

const fmtDate = (iso?: string) => {
  if (!iso) {
    return '--';
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return String(iso).slice(0, 10);
  }
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const VoucherUseScreen = ({route}: any) => {
  const voucher = route?.params?.voucher;
  const insets = useSafeAreaInsets();

  const desc = useMemo(() => {
    return [
      '• Áp dụng cho hóa đơn mua hàng tại Quang Nông 719.',
      '• Không quy đổi thành tiền mặt.',
      '• Không áp dụng đồng thời với một số chương trình khác.',
      '• Nhân viên sẽ quét barcode để ghi nhận sử dụng voucher.',
    ];
  }, []);

  return (
    <View
      style={[
        styles.safe,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <HeaderBack title="Sử dụng voucher" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <CText fontFamily={Fonts.BOLD} fontSize={16} color={Colors.h1}>
            {voucher?.name || 'Voucher ưu đãi'}
          </CText>

          <View style={styles.rowBetween}>
            <CText fontFamily={Fonts.REGULAR} fontSize={13} color={Colors.h2}>
              Mã voucher
            </CText>
            <CText fontFamily={Fonts.BOLD} fontSize={13} color={Colors.h1}>
              {voucher?.code || '--'}
            </CText>
          </View>

          <View style={styles.rowBetween}>
            <CText fontFamily={Fonts.REGULAR} fontSize={13} color={Colors.h2}>
              Hạn sử dụng
            </CText>
            <CText fontFamily={Fonts.BOLD} fontSize={13} color={Colors.h1}>
              {fmtDate(voucher?.expired_date)}
            </CText>
          </View>

          <View style={styles.barcodeWrap}>
            <CText fontFamily={Fonts.REGULAR} fontSize={12} color={Colors.h2}>
              Nhân viên sẽ quét barcode này
            </CText>

            <View style={{marginTop: scale(10), alignItems: 'center'}}>
              <BarcodeCreatorView
                value={voucher?.code ?? ''}
                background="#FFFFFF"
                foregroundColor="#000000"
                format={BarcodeFormat.CODE128}
                style={{width: width - scale(60), height: scale(260)}}
              />
            </View>

            <CText
              fontFamily={Fonts.BOLD}
              fontSize={fontScale(16)}
              color={Colors.h1}
              style={{marginTop: scale(8), textAlign: 'center'}}>
              {voucher?.code}
            </CText>
          </View>
        </View>

        <View style={styles.card}>
          <CText fontFamily={Fonts.BOLD} fontSize={16} color={Colors.h1}>
            Điều kiện & mô tả
          </CText>

          <View style={{marginTop: scale(10), gap: scale(8)}}>
            {desc.map((t, idx) => (
              <CText
                key={idx}
                fontFamily={Fonts.REGULAR}
                fontSize={13}
                color={Colors.h2}>
                {t}
              </CText>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VoucherUseScreen;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.primary},
  content: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    gap: scale(12),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    padding: scale(14),
    gap: scale(10),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barcodeWrap: {
    marginTop: scale(8),
    borderRadius: scale(12),
    padding: scale(12),
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
});
