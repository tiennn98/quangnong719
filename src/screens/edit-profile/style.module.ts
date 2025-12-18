import { Colors } from '@/themes';
import { fontScale, scale } from 'react-native-utils-scale';
import { StyleSheet } from 'react-native';
export
const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F7F4EF'},
  scroll: {padding: scale(16), paddingBottom: scale(24)},

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: scale(10),
  },
  logoDot: {
    width: scale(34),
    height: scale(34),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.14)',
  },
  brandName: {fontSize: fontScale(20), fontWeight: '900', color: Colors.greenPrimary},

  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: scale(18),
    padding: scale(14),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },
  h1: {fontSize: fontScale(22), fontWeight: '900', color: Colors.h1},
  sub: {marginTop: scale(4), fontSize: fontScale(13), color: 'rgba(0,0,0,0.55)', fontWeight: '600'},

  progressTrack: {
    marginTop: scale(12),
    height: scale(10),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.greenPrimary,
    borderRadius: 999,
  },
  progressText: {
    marginTop: scale(8),
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.50)',
    fontWeight: '700',
  },

  tipBanner: {
    marginTop: scale(12),
    backgroundColor: 'rgba(11,43,30,0.06)',
    borderRadius: scale(14),
    padding: scale(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(11,43,30,0.14)',
  },
  tipText: {fontSize: fontScale(13), fontWeight: '800', color: Colors.h2},

  formCard: {
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(18),
    padding: scale(14),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
  },

  avatarRow: {flexDirection: 'row', gap: scale(12), alignItems: 'center', marginBottom: scale(12)},
  avatarCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {fontSize: fontScale(13), fontWeight: '900', color: Colors.h1},
  uploadBtn: {
    marginTop: scale(8),
    height: scale(44),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    backgroundColor: '#F6F6F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {fontSize: fontScale(14), fontWeight: '900', color: Colors.h1},

  labelRow: {flexDirection: 'row', alignItems: 'center', gap: scale(8), marginTop: scale(6), marginBottom: scale(6)},
  labelIcon: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(10),
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {fontSize: fontScale(13), fontWeight: '900', color: 'rgba(0,0,0,0.72)'},

  select: {
    height: scale(52),
    borderRadius: scale(12),
    backgroundColor: '#F6F6F1',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectDisabled: {opacity: 0.6},
  selectError: {borderColor: Colors.red},
  selectText: {fontSize: fontScale(15), fontWeight: '800', color: Colors.h1, flex: 1, marginRight: scale(10)},
  placeholder: {color: 'rgba(0,0,0,0.40)', fontWeight: '700'},

  hint: {marginTop: scale(6), fontSize: fontScale(12), color: 'rgba(0,0,0,0.45)', fontWeight: '600'},
  err: {marginTop: scale(6), fontSize: fontScale(12), color: Colors.red, fontWeight: '700'},

  bottomBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: Colors.white,
    padding: scale(14),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.10)',
  },
  bottomHint: {marginBottom: scale(8), fontSize: fontScale(12), color: 'rgba(0,0,0,0.50)', fontWeight: '700'},
  cta: {height: scale(52)},
});
