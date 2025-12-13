import React, {useMemo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Images} from '@/assets';
import {Colors} from '@/themes';
import {fontScale, scale} from 'react-native-utils-scale';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CText from '../text';

type InvoiceStatus = 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';

interface InvoiceBlockProps {
  invoiceId: string;
  branch: string;
  purchaseDate: string;
  totalAmount: string;
  status: InvoiceStatus;
  remainingDebt?: string;
  onDetailPress: () => void;
  hideDetailButton?: boolean;
}

const getStatusDisplay = (status: InvoiceStatus) => {
  switch (status) {
    case 'PAID':
      return {text: 'Đã thanh toán', color: Colors.green, bgColor: '#E7F4ED'};
    case 'PARTIALLY_PAID':
      return {text: 'Nợ một phần', color: Colors.orange, bgColor: '#FFF4E6'};
    case 'CANCELLED':
      return {text: 'Đã hủy', color: Colors.red, bgColor: '#FFE6E6'};
    default:
      return {text: '', color: Colors.h2, bgColor: Colors.white};
  }
};

const StatusTag: React.FC<{status: InvoiceStatus}> = React.memo(({status}) => {
  const {text, color, bgColor} = getStatusDisplay(status);

  if (!text) {
    return null;
  }

  return (
    <View
      style={[
        styles.statusTag,
        {backgroundColor: bgColor, borderColor: color},
      ]}>
      <CText style={[styles.statusTagText, {color}]}>{text}</CText>
    </View>
  );
});

const InvoiceBlock: React.FC<InvoiceBlockProps> = React.memo(
  ({
    invoiceId,
    branch,
    purchaseDate,
    totalAmount,
    status,
    remainingDebt,
    onDetailPress,
    hideDetailButton = false,
  }) => {
    const debtDisplay = useMemo(() => {
      if (status !== 'PAID' && remainingDebt) {
        return (
          <CText fontSize={fontScale(14)} style={styles.debtText}>
            Còn nợ : {remainingDebt}
          </CText>
        );
      }
      return null;
    }, [status, remainingDebt]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.invoiceInfo}>
            <View style={styles.iconWrapper}>
              <Image source={Images.invoiceIcon} style={styles.invoiceIcon} />
            </View>
            <CText fontSize={fontScale(20)} style={styles.invoiceIdText}>
              {invoiceId}
            </CText>
          </View>

          <StatusTag status={status} />
        </View>

        <View style={styles.content}>
          <View>
            <CText style={styles.purchaseDateText}>
              Ngày mua : {purchaseDate}
            </CText>
            <CText style={styles.totalAmountText}>
              Tổng tiền : {totalAmount}
            </CText>
            {debtDisplay}
          </View>

          <View style={styles.buttonContainer}>
            {!hideDetailButton && (
              <TouchableOpacity
                style={styles.detailButton}
                onPress={onDetailPress}
                activeOpacity={0.7}>
                <CText style={styles.detailButtonText}>Xem Chi Tiết</CText>
                <AntDesign
                  name="right"
                  size={fontScale(13)}
                  color={Colors.h2}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.watermark}>
          <Image source={Images.logo} style={styles.watermarkImage} />
        </View>
      </View>
    );
  },
);

export default InvoiceBlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: scale(15),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(10),
  },
  invoiceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  iconWrapper: {
    width: scale(30),
    height: scale(30),
    backgroundColor: '#E6EFEA',
    borderRadius: scale(8),
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoiceIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  invoiceIdText: {
    fontWeight: 'bold',
    color: Colors.h2,
  },

  statusTag: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(15),
    borderWidth: 1,
    marginLeft: scale(10),
  },
  statusTagText: {
    fontSize: fontScale(12),
    fontWeight: 'bold',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: scale(5),
  },
  purchaseDateText: {
    fontSize: fontScale(14),
    color: Colors.h2,
    marginBottom: scale(10),

  },
  totalAmountText: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: Colors.h1,
    marginBottom: scale(10),
  },
  debtText: {
    color: Colors.red,
    fontWeight: '600',
  },

  buttonContainer: {
    marginLeft: 'auto',
    justifyContent: 'flex-end',
  },
  detailButton: {
    backgroundColor: Colors.iconBg,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderColor: Colors.h2,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailButtonText: {
    color: Colors.h2,
    fontSize: fontScale(13),
    marginRight: scale(5),
  },

  watermark: {
    position: 'absolute',
    right: scale(20),
    top: scale(0),
    opacity: 0.1,
    transform: [{rotate: '45deg'}],
    zIndex: -1,
  },
  watermarkImage: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
});
