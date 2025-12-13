import {Colors} from '@/themes';
import {StyleSheet} from 'react-native';
import {fontScale, scale, width} from 'react-native-utils-scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: scale(30),
    paddingTop: scale(40),
    paddingBottom: scale(20),
  },
  backgroundImage: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0.25,
    resizeMode: 'cover',
  },

  headerContainer: {
    alignItems: 'center',
    marginTop: scale(30),
  },
  logoBox: {
    width: width / 3,
    height: width / 3,
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoIcon: {
    color: 'white',
    width: width / 3.5,
    height: width / 3.5,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: fontScale(38),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: scale(10),
  },
  tagline1: {
    fontSize: fontScale(18),
    color: 'white',
    fontWeight: '600',
    marginBottom: scale(2),
  },
  tagline2: {
    fontSize: fontScale(16),
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: scale(30),
  },

  featuresBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: scale(15),
    paddingVertical: scale(25),
    paddingHorizontal: scale(20),
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(15),
  },
  bulletPoint: {
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: 'orange',
    marginRight: scale(15),
  },
  listItemText: {
    fontSize: fontScale(16),
    color: Colors.h1,
    fontWeight: '500',
    flexShrink: 1,
  },

  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: scale(12),
    paddingVertical: scale(15),
    marginTop: scale(40),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  startButtonText: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: Colors.h2,
    marginRight: scale(5),
  },

  termsText: {
    fontSize: fontScale(14),
    color: Colors.white,
    textAlign: 'center',
    marginTop: scale(20),
  },
  linkText: {
    fontWeight: 'bold',
    color: Colors.yellow,
    textDecorationLine: 'underline',
  },
});
