import {StyleSheet, Platform} from 'react-native';
import {Colors} from '@/themes';
import {fontScale, height, scale, width} from 'react-native-utils-scale';
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.primary,
    paddingBottom: scale(60),
  },

  headerBackground: {
    backgroundColor: Colors.h2,
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    overflow: 'hidden',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.h2,
    height: height / 3.8,
  },
  headerLogo: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  headerGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    overflow: 'hidden',
  },
  headerHelloContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  greetingTitle: {
    fontSize: fontScale(14),
    color: Colors.h1,
    paddingHorizontal: scale(10),
  },
  greetingSubtitle: {
    fontSize: fontScale(14),
    color: Colors.h2,
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
  },

  customerInfoBox: {
    marginHorizontal: scale(20),
    borderRadius: scale(15),
    padding: scale(20),
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(15),
  },
  label: {
    fontSize: fontScale(12),
    color: Colors.h2,
  },
  customerPhone: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: Colors.h2,
    marginTop: scale(5),
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  diamondIcon: {
    fontSize: fontScale(14),
    marginBottom: scale(2),
  },
  pointsText: {
    fontSize: fontScale(12),
    color: '#007bff',
    fontWeight: '600',
  },
  pointsValue: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    color: '#007bff',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scale(15),
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  quickActionIcon: {
    width: scale(24),
    height: scale(24),
    marginRight: scale(8),
  },
  quickActionText: {
    fontSize: fontScale(14),
    color: Colors.h2,
    fontWeight: '500',
  },

  mainContent: {
    paddingHorizontal: scale(20),
  },

  bannerContainer: {
    height: scale(140),
    borderRadius: scale(15),
    overflow: 'hidden',
    marginBottom: scale(20),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    paddingLeft: scale(20),
  },
  bannerTextMain: {
    fontSize: fontScale(22),
    fontWeight: 'bold',
    color: Colors.white,
  },
  bannerTextSub: {
    fontSize: fontScale(16),
    color: Colors.white,
    fontWeight: '500',
  },

  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoBoxContainer: {
    width: '48%',
    marginBottom: scale(15),
  },
  infoBox: {
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(15),
    height: scale(120),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  infoIconWrapper: {
    marginBottom: scale(5),
  },
  gridIcon: {
    fontSize: fontScale(24),
  },
  infoBoxValue: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  infoBoxLabel: {
    fontSize: fontScale(14),
    color: Colors.h2,
  },

  blockWrapper: {
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(15),
    marginBottom: scale(15),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  blockIconCircle: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  blockIconText: {
    fontSize: fontScale(18),
  },
  blockTitle: {
    fontSize: fontScale(16),
    fontWeight: '600',
    color: Colors.h2,
  },

  nextTaskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.h1,
    padding: scale(15),
    borderRadius: scale(10),
  },
  taskTitle: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    color: Colors.h2,
  },
  taskDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDetailText: {
    fontSize: fontScale(14),
    color: Colors.h2,
    marginRight: scale(5),
  },
  taskArrow: {
    fontSize: fontScale(16),
    color: Colors.h2,
    fontWeight: 'bold',
  },

  paidTag: {
    backgroundColor: Colors.h2,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(15),
    marginLeft: 'auto',
  },
  paidTagText: {
    fontSize: fontScale(12),
    fontWeight: 'bold',
    color: Colors.h2,
  },
  invoiceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: scale(10),
  },
  invoiceId: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    color: Colors.h2,
  },
  invoiceDate: {
    fontSize: fontScale(14),
    color: Colors.h2,
    marginBottom: scale(5),
  },
  invoiceAmount: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    color: Colors.h2,
  },
  invoiceDetailButton: {
    backgroundColor: Colors.h1,
    paddingHorizontal: scale(15),
    paddingVertical: scale(8),
    borderRadius: scale(8),
  },
  invoiceDetailText: {
    color: Colors.white,
    fontSize: fontScale(14),
    fontWeight: '600',
  },

  eventContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDetails: {
    flexShrink: 1,
    marginRight: scale(10),
  },
  eventTitle: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
    color: Colors.h2,
    marginBottom: scale(2),
  },
  eventTime: {
    fontSize: fontScale(14),
    color: Colors.h2,
  },
  eventViewAllButton: {
    backgroundColor: Colors.h1,
    paddingHorizontal: scale(15),
    paddingVertical: scale(8),
    borderRadius: scale(20),
  },
  eventViewAllText: {
    color: Colors.h2,
    fontSize: fontScale(14),
    fontWeight: '500',
  },

  quickAccessGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  quickAccessBox: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(120),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickAccessLabel: {
    fontSize: fontScale(14),
    fontWeight: '600',
    color: Colors.h2,
    marginTop: scale(10),
  },

  tabBarContainer: {
    flexDirection: 'row',
    height: scale(60),
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? scale(5) : 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    fontSize: fontScale(22),
    color: Colors.h2,
  },
  tabIconInactive: {
    fontSize: fontScale(22),
    color: Colors.h2,
  },
  tabLabelActive: {
    fontSize: fontScale(10),
    color: Colors.h2,
    marginTop: scale(2),
  },
  tabLabelInactive: {
    fontSize: fontScale(10),
    color: Colors.h2,
    marginTop: scale(2),
  },
  iconStyle:{
    width: scale(24),
    height: scale(24),
    marginRight: scale(8),
  },
  invoiceCurrentHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
  },
});
