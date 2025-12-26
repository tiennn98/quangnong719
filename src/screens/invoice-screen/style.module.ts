import {StyleSheet} from 'react-native';
import {Colors} from '@/themes';
import {scale, width} from 'react-native-utils-scale';

export const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.white,paddingTop:scale()},
  container: {flex: 1, paddingHorizontal: scale(16)},
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {flex: 1},
  headerRight: {
    backgroundColor: Colors.yellow,
    borderRadius: scale(12),
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(90),
    width: width / 3,
  },
  invoiceItem: {marginBottom: scale(8)},
  sectionHeader: {
    backgroundColor: Colors.white,
    paddingVertical: scale(10),
  },
  contentContainer: {paddingBottom: scale(20)},
  footerLoader: {paddingVertical: scale(20)},
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(50),
    paddingHorizontal: scale(16),
  },
  emptyLogo: {
    width: scale(120),
    height: scale(120),
    opacity: 0.9,
  },
});
