import { Colors } from '@/themes';
import {StyleSheet} from 'react-native';
import {scale, fontScale} from 'react-native-utils-scale';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    backgroundColor: '#F7F4EF',
  },
  scrollContent: {
    paddingTop: scale(10),
    paddingBottom: scale(18),
  },

  header: {marginBottom: scale(8)},
  headerRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: scale(10),
  },
  backBtn: {paddingVertical: scale(4), paddingRight: scale(6)},
  headerTextWrap: {flex: 1},

  h1: {fontWeight: '900'},
  hint: {marginTop: scale(4), opacity: 0.82, lineHeight: fontScale(20)},

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(18),
    padding: scale(16),
    marginTop: scale(14),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },

  identityTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    marginBottom: scale(10),
  },

  avatarCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLogo: {
    width: scale(28),
    height: scale(28),
  },

  name: {fontWeight: '900'},
  sub: {marginTop: scale(2), opacity: 0.78},
  subBold: {fontWeight: '900'},

  actionCol: {
    gap: scale(8),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  actionBtn: {
    width: scale(36),
    height: scale(36),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  codeWrapOuter: {alignItems: 'center', marginTop: scale(8)},
  codeWrapInner: {
    width: '100%',
    height: scale(220),
    borderRadius: scale(18),
    backgroundColor: '#E9E6DE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
    overflow: 'hidden',
  },

  emptyBarcode: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
  },

  tipRow: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
  },
  tipDot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 999,
    backgroundColor: Colors.greenPrimary,
    opacity: 0.6,
  },
  codeHint: {textAlign: 'center', opacity: 0.85},

  sectionTitle: {fontWeight: '900', marginBottom: scale(10)},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(7),
  },
  label: {flex: 1, opacity: 0.75},
  value: {flex: 1, textAlign: 'right', fontWeight: '700'},
  valueBold: {fontWeight: '900'},

  howCard: {backgroundColor: '#FBFAF7'},
  howHeader: {flexDirection: 'row', alignItems: 'center', gap: scale(10)},
  infoDot: {
    width: scale(28),
    height: scale(28),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  howTitle: {fontWeight: '900'},
  howList: {marginTop: scale(10)},
  howItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(10),
    marginTop: scale(10),
  },
  bullet: {
    width: scale(8),
    height: scale(8),
    borderRadius: 999,
    backgroundColor: Colors.greenPrimary,
    marginTop: scale(6),
    opacity: 0.55,
  },
  howItemText: {flex: 1, lineHeight: fontScale(22)},

  bottom: {marginTop: scale(14)},

  toastWrap: {
    position: 'absolute',
    left: scale(16),
    right: scale(16),
    bottom: scale(20),
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
    borderRadius: scale(14),
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: scale(16),
    justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: scale(18),
    padding: scale(16),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  modalCloseBtn: {
    width: scale(34),
    height: scale(34),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBarcodeBox: {
    width: '100%',
    height: scale(260),
    borderRadius: scale(16),
    backgroundColor: '#F3F1EA',
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },
});
