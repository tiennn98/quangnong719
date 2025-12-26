import {CText} from '@/components';
import CButton from '@/components/button';
import {Colors, Fonts} from '@/themes';
import {Gift, QrCode} from 'lucide-react-native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {scale} from 'react-native-utils-scale';
import type {VoucherItemDTO} from '@/services/voucher.api';
import HeaderBack from '@/components/HeaderBack';

type Props = {
  item: VoucherItemDTO;
  onPressUse?: (item: VoucherItemDTO) => void;
  showUseButton?: boolean;
  rightBadge?: React.ReactNode;
};

const fmtDate = (iso?: string) => {
  if (!iso) return '--';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const statusLabel = (status?: number, isUsed?: boolean) => {
  const s = Number(status);
  if (isUsed || s === 2) return {text: 'Đã dùng', bg: 'rgba(239,68,68,0.12)', color: '#EF4444'};
  if (s === 3) return {text: 'Đã huỷ', bg: 'rgba(148,163,184,0.22)', color: '#64748B'};
  if (s === 1) return {text: 'Đã phát hành', bg: 'rgba(20,174,92,0.14)', color: '#14AE5C'};
  return {text: 'Chưa dùng', bg: 'rgba(245,158,11,0.15)', color: '#F59E0B'};
};

const VoucherCard: React.FC<Props> = ({item, onPressUse, showUseButton = true, rightBadge}) => {
  const st = statusLabel(item.status, item.is_used);
  
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.leftRow}>
          <Gift color={Colors.yellow} />
          <View style={{flex: 1}}>
            <CText fontFamily={Fonts.BOLD} fontSize={14} numberOfLines={2}>
              {item.name}
            </CText>
            <CText fontFamily={Fonts.REGULAR} fontSize={12} color={Colors.h2}>
              Mã: {item.code}
            </CText>
          </View>
        </View>
        
        {rightBadge ? (
          rightBadge
        ) : (
          <View style={[styles.pill, {backgroundColor: st.bg}]}>
            <CText fontFamily={Fonts.BOLD} fontSize={11} color={st.color}>
              {st.text}
            </CText>
          </View>
        )}
      </View>
      
      <View style={styles.rowBetween}>
        <CText fontFamily={Fonts.REGULAR} fontSize={12} color={Colors.h2}>
          Hạn dùng
        </CText>
        <CText fontFamily={Fonts.BOLD} fontSize={12} color={Colors.h1}>
          {fmtDate(item.expired_date)}
        </CText>
      </View>
      
      <View style={styles.codeBox}>
        <CText fontFamily={Fonts.REGULAR} fontSize={11} color={Colors.h2}>
          BARCODE / CODE
        </CText>
        <CText fontFamily={Fonts.BOLD} fontSize={18} color={Colors.h1} style={{letterSpacing: 2}}>
          {item.code}
        </CText>
      </View>
      
      {showUseButton ? (
        <View style={{marginTop: scale(10)}}>
          <CButton
            title="Sử dụng voucher"
            onPress={() => onPressUse?.(item)}
            renderIconLeft={<QrCode color={Colors.white} size={20} style={{marginRight: scale(8)}} />}
          />
        </View>
      ) : null}
    </View>
  );
};

export default VoucherCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    gap: scale(10),
  },
  topRow: {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: scale(10)},
  leftRow: {flexDirection: 'row', alignItems: 'center', gap: scale(8), flex: 1},
  rowBetween: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  codeBox: {
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    backgroundColor: 'rgba(0,0,0,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});
