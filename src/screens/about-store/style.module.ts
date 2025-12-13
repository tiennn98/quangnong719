import { Colors } from '@/themes';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-utils-scale';
export const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    padding: scale(20),
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    gap: scale(20),
  },
  titleHeader:{
    fontSize: scale(24),
    fontWeight: '600',
    color: Colors.greenPrimary,
  },
    subTitleHeader:{
    fontSize: scale(14),
    fontWeight: '400',
    color: Colors.h2,
    marginBottom: scale(8),
  },
  infoStoreContainer:{
    flexDirection: 'column',
    gap: scale(8),
    marginTop: scale(16),
    backgroundColor: Colors.primary,
    borderRadius: scale(8),
    padding: scale(16),
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.h2,
  },
});
