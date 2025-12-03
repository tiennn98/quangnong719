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
    fontSize: fontScale(20),
  },
  subtitleText: {
    color: Colors.h2,
    fontSize: fontScale(13),
    marginBottom: scale(20),
  },
  labelText: {
    color: Colors.h1,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.buttonbg,
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
});
