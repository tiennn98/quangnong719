import { Colors } from '@/themes';
import { StyleSheet } from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    gap: scale(20),
    paddingBottom: scale(20),
  },
  viewImage: {
    alignItems: 'center',
    marginTop: scale(50),
  },
  imageLogo: {
    width: width / 2.5,
    height: width / 2.5,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBox: {
    gap: scale(8),
    backgroundColor: '#ffffff',
    padding: scale(20),
    borderRadius: scale(10),
  },
  viewButton: {
    marginTop: scale(20),
  },
  rowAgree: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  checkbox: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(4),
    borderWidth: 1,
    borderColor: Colors.h1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDot: {
    width: scale(24),
    height: scale(24),
  },
  titleText: {
    color: Colors.h1,
    fontWeight: 'bold',
    fontSize: fontScale(24),
  },
  subtitleText: {
    color: Colors.h2,
    fontSize: fontScale(16),
    marginBottom: scale(20),
  },
  labelText: {
    color: Colors.h1,
    fontWeight: 'bold',
    fontSize: fontScale(14),
  },
  input: {
    backgroundColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.buttonbg,
    height: scale(48),
  },
  termsText: {
    flex: 1,
  },
  linkText: {
    color: Colors.buttonbg,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.red,
    marginTop: scale(4),
    fontSize: fontScale(12),
  },
  phoneText:{
    fontWeight: 'bold',
    color: Colors.h1,
  },
    // ===== Modal OTP Error (ADD ONLY) =====
  modalWrap: {
    margin: 0,
    justifyContent: 'center',
    paddingHorizontal: scale(18),
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: scale(14),
    padding: scale(16),
  },
  modalTitle: {
    fontSize: fontScale(18),
    fontWeight: '900',
    color: Colors.h1,
  },
  modalDesc: {
    marginTop: scale(8),
    color: Colors.h2,
    fontSize: fontScale(14),
    lineHeight: fontScale(20),
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(14),
  },
  modalBtn: {
    flex: 1,
    height: scale(46),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnSecondary: {
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  modalBtnPrimary: {
    backgroundColor: Colors.greenPrimary,
  },
  modalBtnDisabled: {
    backgroundColor: Colors.gray500,
    opacity: 0.75,
  },
  modalBtnTextPrimary: {
    fontWeight: '900',
    color: Colors.white,
  },
  modalBtnTextSecondary: {
    fontWeight: '900',
    color: Colors.h1,
  },
  modalHint: {
    marginTop: scale(10),
    color: Colors.h2,
    fontSize: fontScale(12),
    textAlign: 'center',
    opacity: 0.8,
  },

});
