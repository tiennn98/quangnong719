import {StyleSheet} from 'react-native';
import {fontScale, scale} from 'react-native-utils-scale';
import {Colors} from '@/themes';

export const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F5F5F5'},

  header: {
    height: scale(54),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  backBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontScale(16),
    fontWeight: '900',
    color: Colors.h1,
  },

  scrollContent: {paddingVertical: scale(14)},

  heroCard: {
    marginHorizontal: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
    marginBottom: scale(16),
  },
  h1: {fontSize: fontScale(18), fontWeight: '900', color: Colors.h1},
  sub: {
    marginTop: scale(6),
    fontSize: fontScale(13),
    color: 'rgba(0,0,0,0.55)',
  },

  progressTrack: {
    marginTop: scale(14),
    height: scale(10),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.greenPrimary,
  },
  progressText: {
    marginTop: scale(10),
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.55)',
    fontWeight: '700',
  },

  tipBanner: {
    marginTop: scale(12),
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    borderRadius: scale(12),
    backgroundColor: 'rgba(255,215,0,0.14)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,215,0,0.25)',
  },
  tipText: {fontSize: fontScale(12), fontWeight: '800', color: Colors.h2},

  formCard: {
    marginHorizontal: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(16),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  avatarCircle: {
    width: scale(54),
    height: scale(54),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },

  sectionLabel: {fontSize: fontScale(13), fontWeight: '800', color: Colors.h1},
  uploadBtn: {
    marginTop: scale(8),
    alignSelf: 'flex-start',
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderRadius: 999,
    backgroundColor: 'rgba(11,43,30,0.08)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(11,43,30,0.14)',
  },
  uploadText: {
    fontSize: fontScale(12),
    fontWeight: '900',
    color: Colors.greenPrimary,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  labelIcon: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(10),
    backgroundColor: 'rgba(11,43,30,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  label: {fontSize: fontScale(13), fontWeight: '900', color: Colors.h1},

  missingChip: {
    marginLeft: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 999,
    backgroundColor: 'rgba(255,0,0,0.08)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,0,0,0.18)',
  },
  missingText: {fontSize: fontScale(11), fontWeight: '900', color: Colors.red},

  select: {
    height: scale(50),
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.14)',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectDisabled: {opacity: 0.65},
  selectError: {borderColor: 'rgba(255,0,0,0.55)'},
  selectText: {fontSize: fontScale(14), fontWeight: '900', color: Colors.h1},
  placeholder: {color: 'rgba(0,0,0,0.45)'},

  hint: {
    marginTop: scale(6),
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.52)',
    fontWeight: '700',
  },
  err: {
    marginTop: scale(6),
    fontSize: fontScale(12),
    color: Colors.red,
    fontWeight: '800',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    paddingBottom: scale(12),
    backgroundColor: 'rgba(245,245,245,0.98)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  bottomHint: {
    marginBottom: scale(8),
    fontSize: fontScale(12),
    fontWeight: '800',
    color: Colors.red,
  },
  bottomHint2: {
    marginTop: scale(8),
    fontSize: fontScale(12),
    fontWeight: '700',
    color: 'rgba(0,0,0,0.55)',
  },
  cta: {borderRadius: scale(14)},

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: scale(16),
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(14),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  modalTitle: {fontSize: fontScale(16), fontWeight: '900', color: Colors.h1},
  modalClose: {
    fontSize: fontScale(13),
    fontWeight: '900',
    color: Colors.greenPrimary,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    paddingHorizontal: scale(12),
    height: scale(44),
    borderRadius: scale(12),
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
    marginBottom: scale(10),
  },
  searchInput: {
    flex: 1,
    fontSize: fontScale(14),
    fontWeight: '800',
    color: Colors.h1,
  },

  pickItem: {
    paddingVertical: scale(14),
    paddingHorizontal: scale(10),
    borderRadius: scale(12),
  },
  pickItemText: {fontSize: fontScale(14), fontWeight: '900', color: Colors.h1},
  sep: {height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(0,0,0,0.08)'},
  emptyText: {
    textAlign: 'center',
    fontSize: fontScale(13),
    fontWeight: '800',
    color: 'rgba(0,0,0,0.55)',
  },
});
