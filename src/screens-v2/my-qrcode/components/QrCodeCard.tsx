import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ScanLine } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  qrValue: string;
  userCode: string;
};

const QrCodeCard: React.FC<Props> = ({ qrValue, userCode }) => (
  <View style={styles.card}>
    <View style={styles.qrWrap}>
      <QRCode
        value={qrValue}
        size={scale(180)}
        color={Colors.black}
        backgroundColor={Colors.white}
        quietZone={scale(8)}
      />
      <View style={styles.qrLogoPlaceholder} />
    </View>

    <View style={styles.scanRow}>
      <ScanLine color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
      <CText style={styles.scanText}>
        Quét tại quầy để tích điểm / nhận ưu đãi
      </CText>
    </View>

    <View style={styles.divider} />

    <CText style={styles.codeLabel}>Mã của bạn</CText>
    <CText style={styles.codeValue}>{userCode}</CText>
  </View>
);

export default memo(QrCodeCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(14),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  qrWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  qrLogoPlaceholder: {
    position: 'absolute',
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'red',
  },
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(14),
    paddingHorizontal: scale(8),
  },
  scanText: {
    flex: 1,
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginTop: scale(16),
    marginBottom: scale(14),
  },
  codeLabel: {
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  codeValue: {
    marginTop: scale(4),
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    letterSpacing: 0.5,
  },
});
