import {StyleSheet} from 'react-native';
import {fontScale, scale} from 'react-native-utils-scale';
import {Colors, Fonts} from '@/themes';
export const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#FFFFFF'},

  header: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  backBtn: {
    width: scale(42),
    height: scale(42),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: fontScale(20),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },
  headerSub: {
    marginTop: scale(4),
    fontSize: fontScale(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.8,
  },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: 999,
    borderWidth: 1,
  },
  statusPillText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.BOLD,
  },

  topCard: {
    marginHorizontal: scale(16),
    borderRadius: scale(16),
    padding: scale(14),
    backgroundColor: '#F6F8F7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },

  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    width: '48%',
  },
  metaText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
  },

  barcodeBox: {
    marginTop: scale(12),
    borderRadius: scale(14),
    backgroundColor: '#FFFFFF',
    paddingVertical: scale(12),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  codeText: {
    marginTop: scale(8),
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    letterSpacing: 1,
  },
  codChip: {
    marginTop: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
    backgroundColor: 'rgba(255,185,0,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,185,0,0.35)',
  },
  codChipText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },

  listWrap: {flex: 1, marginTop: scale(12)},
  sectionHeader: {
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginBottom: scale(10),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },

  row: {
    marginHorizontal: scale(16),
    padding: scale(14),
    borderRadius: scale(14),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  rowTitle: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },
  rowSub: {
    marginTop: scale(6),
    fontSize: fontScale(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.85,
  },
  rowMoney: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },
  rowDiscountLine: {
    marginTop: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  rowDiscountText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.greenPrimary,
  },

  chipPoint: {
    marginTop: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
    backgroundColor: 'rgba(67,170,100,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(67,170,100,0.25)',
  },
  chipPointText: {
    fontSize: fontScale(16),
    fontFamily: Fonts.BOLD,
    color: Colors.greenPrimary,
  },

  sepStrong: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: scale(12),
  },

  summaryWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  summaryCard: {
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    padding: scale(14),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  summaryLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(8),
  },
  sumLabel: {
    fontSize: fontScale(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.9,
  },
  sumValue: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },
  sumLabelStrong: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
  },
  sumValueStrong: {
    fontSize: fontScale(20),
    fontFamily: Fonts.BOLD,
  },
  summaryHint: {
    marginTop: scale(10),
    fontSize: fontScale(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.7,
  },
  noteText: {
    marginTop: scale(10),
    fontSize: fontScale(12),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.7,
    lineHeight: fontScale(16),
  },
});
