import {
  BadgePercent,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ReceiptText,
  Store,
  User,
} from 'lucide-react-native';
import React, {useMemo} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {BarcodeCreatorView, BarcodeFormat} from 'react-native-barcode-creator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontScale, scale, width} from 'react-native-utils-scale';

import CText from '@/components/text';
import {Colors, Fonts} from '@/themes';
import {formatCurrency, formatISODate} from '@/utils/tools';

export type InvoiceDetail = {
  productId?: number;
  productCode?: string;
  productName?: string;
  categoryId?: number;
  categoryName?: string;
  quantity?: number;
  price?: number;
  discount?: number;
  discountRatio?: number;
  usePoint?: boolean;
  subTotal?: number;
  serialNumbers?: string;
  returnQuantity?: number;
};

export type InvoiceDTO = {
  id?: number;
  uuid?: string;
  code?: string;
  purchaseDate?: string;

  branchId?: number;
  branchName?: string;

  soldById?: number;
  soldByName?: string;

  customerId?: number;
  customerCode?: string;
  customerName?: string;

  orderCode?: string;
  total?: number;
  totalPayment?: number;
  discount?: number;

  status?: number;
  statusValue?: string;

  description?: string;
  usingCod?: boolean;
  createdDate?: string;

  invoiceDetails?: InvoiceDetail[];
};

const InvoiceDetailScreen: React.FC<any> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const invoice = route.params.invoice as unknown as InvoiceDTO;

  const code = invoice?.code || `HD-${invoice?.id ?? ''}`;
  const details = Array.isArray(invoice?.invoiceDetails)
    ? invoice.invoiceDetails
    : [];

  const totalQuantity = useMemo(() => {
    return details.reduce((sum, it) => sum + (Number(it?.quantity) || 0), 0);
  }, [details]);

  const totalAmount = Number(invoice?.total) || 0;
  const totalPayment = Number(invoice?.totalPayment) || 0;
  const discount = Number(invoice?.discount) || 0;

  const remaining = useMemo(() => {
    const v = totalAmount - totalPayment;
    return Math.abs(v) < 0.0001 ? 0 : v;
  }, [totalAmount, totalPayment]);

  const statusText =
    invoice?.statusValue || (invoice?.status === 1 ? 'Đã thanh toán' : '—');

  const statusTone = useMemo(() => {
    if (invoice?.status === 1) {
      return {
        bg: 'rgba(67,170,100,0.12)',
        border: 'rgba(67,170,100,0.35)',
        text: Colors.greenPrimary,
      };
    }
    return {
      bg: 'rgba(0,0,0,0.06)',
      border: 'rgba(0,0,0,0.10)',
      text: Colors.h2,
    };
  }, [invoice?.status]);

  const metaItems = useMemo(
    () => [
      {
        key: 'date',
        icon: <Calendar size={22} color={Colors.greenPrimary} />,
        label: 'Ngày mua',
        value: invoice?.purchaseDate
          ? formatISODate(invoice.purchaseDate)
          : '—',
      },
      {
        key: 'branch',
        icon: <Store size={22} color={Colors.greenPrimary} />,
        label: 'Chi nhánh',
        value: invoice?.branchName || '—',
      },
      {
        key: 'staff',
        icon: <User size={22} color={Colors.greenPrimary} />,
        label: 'Nhân viên',
        value: invoice?.soldByName || '—',
      },
      {
        key: 'customer',
        icon: <User size={22} color={Colors.greenPrimary} />,
        label: 'Khách hàng',
        value: invoice?.customerName
          ? `${invoice.customerName}${
              invoice.customerCode ? ` (${invoice.customerCode})` : ''
            }`
          : '—',
      },
    ],
    [
      invoice?.purchaseDate,
      invoice?.branchName,
      invoice?.soldByName,
      invoice?.customerName,
      invoice?.customerCode,
    ],
  );

  const renderRow = ({item, index}: {item: InvoiceDetail; index: number}) => {
    const qty = Number(item?.quantity) || 0;
    const price = Number(item?.price) || 0;
    const rowTotal = Number(item?.subTotal) || qty * price;
    const rowDiscount = Number(item?.discount) || 0;

    return (
      <View style={styles.detailCard}>
        <View style={styles.detailLeftBar} />

        <View style={{flex: 1}}>
          <View style={styles.detailTopLine}>
            <CText style={styles.detailTitle}>{`Dòng ${index + 1}`}</CText>

            {item?.categoryName ? (
              <View style={styles.tag}>
                <CText style={styles.tagText} numberOfLines={1}>
                  {item.categoryName}
                </CText>
              </View>
            ) : null}
          </View>

          <CText style={styles.detailSub}>
            {`Số lượng: ${qty} × ${formatCurrency(price)}`}
          </CText>

          {rowDiscount > 0 ? (
            <View style={styles.discountLine}>
              <BadgePercent size={18} color={Colors.greenPrimary} />
              <CText style={styles.discountText}>
                {`Giảm dòng: ${formatCurrency(rowDiscount)}`}
              </CText>
            </View>
          ) : null}

          {item?.usePoint ? (
            <View style={styles.pointPill}>
              <CText style={styles.pointPillText}>Có dùng điểm</CText>
            </View>
          ) : null}
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <CText style={styles.money}>{formatCurrency(rowTotal)}</CText>
        </View>
      </View>
    );
  };

  const ListHeader = (
    <View>
      <View style={styles.receiptCard}>
        <CText style={styles.receiptTitle}>Mã hóa đơn</CText>

        <View style={styles.barcodeWrap}>
          <BarcodeCreatorView
            value={code}
            background="#FFFFFF"
            foregroundColor="#000000"
            format={BarcodeFormat.CODE128}
            style={{width: width - scale(64), height: scale(95)}}
          />
        </View>

        <CText style={styles.receiptCode}>{code}</CText>

        <View style={styles.dashLine} />
        <View style={styles.receiptHintRow}>
          <ReceiptText size={20} color={Colors.h2} />
          <CText style={styles.receiptHint}>
            Đưa mã này cho nhân viên khi cần tra cứu nhanh
          </CText>
        </View>
      </View>

      <View style={styles.sectionHead}>
        <CText style={styles.sectionTitle}>Thông tin</CText>
        <CText style={styles.sectionNote}>Dễ xem – chữ to</CText>
      </View>

      <View style={{gap: scale(10), paddingHorizontal: scale(16)}}>
        {metaItems.map(it => (
          <View key={it.key} style={styles.metaCard}>
            <View style={styles.metaIcon}>{it.icon}</View>
            <View style={{flex: 1}}>
              <CText style={styles.metaLabel}>{it.label}</CText>
              <CText style={styles.metaValue} numberOfLines={2}>
                {it.value}
              </CText>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.sectionHead, {marginTop: scale(14)}]}>
        <CText style={styles.sectionTitle}>Chi tiết</CText>
        <CText style={styles.sectionNote}>{`${details.length} dòng`}</CText>
      </View>
    </View>
  );

  const SummaryDock = (
    <View style={[styles.dockWrap, {paddingBottom: insets.bottom + scale(12)}]}>
      <View style={styles.dockCard}>
        <View style={styles.sumRow}>
          <CText
            style={styles.sumLabel}>{`Tổng tiền (${totalQuantity})`}</CText>
          <CText style={styles.sumValue}>{formatCurrency(totalAmount)}</CText>
        </View>
        <View style={styles.sumRow}>
          <CText style={styles.sumLabel}>Tiền khách trả</CText>
          <CText style={styles.sumValue}>{formatCurrency(totalPayment)}</CText>
        </View>
        <View style={styles.sumRow}>
          <CText style={styles.sumLabel}>Giảm giá</CText>
          <CText style={styles.sumValue}>{formatCurrency(discount)}</CText>
        </View>

        <View style={styles.sep} />

        <View style={styles.sumRow}>
          <CText style={styles.sumLabelStrong}>Còn lại</CText>
          <CText
            style={[
              styles.sumValueStrong,
              remaining > 0
                ? {color: Colors.red}
                : {color: Colors.greenPrimary},
            ]}>
            {formatCurrency(remaining)}
          </CText>
        </View>

        <CText style={styles.sumHint}>
          {remaining > 0
            ? 'Bạn còn khoản chưa thanh toán. Vui lòng liên hệ cửa hàng nếu cần hỗ trợ.'
            : 'Hóa đơn đã hoàn tất. Cảm ơn bạn đã mua hàng!'}
        </CText>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.safe,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          style={styles.backBtn}>
          <ChevronLeft size={26} color={Colors.h1} />
        </Pressable>

        <View style={{flex: 1}}>
          <CText style={styles.hTitle}>Chi tiết hóa đơn</CText>
          <CText style={styles.hSub}>{code}</CText>
        </View>

        <View
          style={[
            styles.statusBadge,
            {backgroundColor: statusTone.bg, borderColor: statusTone.border},
          ]}>
          <CheckCircle2 size={18} color={statusTone.text} />
          <CText style={[styles.statusText, {color: statusTone.text}]}>
            {statusText}
          </CText>
        </View>
      </View>
      <FlatList
        data={details}
        keyExtractor={(it, idx) => String(it?.productId ?? idx)}
        renderItem={renderRow}
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={() => <View style={{height: scale(12)}} />}
        contentContainerStyle={{
          paddingBottom: scale(260) + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      />

      {SummaryDock}
    </View>
  );
};

export default InvoiceDetailScreen;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#FFFFFF'},

  header: {
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    paddingBottom: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  backBtn: {
    width: scale(46),
    height: scale(46),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hTitle: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(24),
  },
  hSub: {
    marginTop: scale(2),
    fontSize: fontScale(16),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.8,
    lineHeight: fontScale(22),
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderRadius: 999,
    borderWidth: 1,
  },
  statusText: {
    fontSize: fontScale(15),
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(20),
  },

  receiptCard: {
    marginHorizontal: scale(16),
    marginTop: scale(6),
    borderRadius: scale(18),
    backgroundColor: '#F7FAF8',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    padding: scale(14),
  },
  receiptTitle: {
    fontSize: fontScale(16),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(22),
    marginBottom: scale(10),
  },
  barcodeWrap: {
    borderRadius: scale(16),
    backgroundColor: '#FFFFFF',
    paddingVertical: scale(10),
    paddingHorizontal: scale(10),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  receiptCode: {
    marginTop: scale(10),
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: fontScale(24),
  },
  dashLine: {
    marginTop: scale(12),
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    opacity: 0.8,
  },
  receiptHintRow: {
    marginTop: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  receiptHint: {
    flex: 1,
    fontSize: fontScale(15),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.85,
    lineHeight: fontScale(21),
  },

  sectionHead: {
    marginTop: scale(14),
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(24),
  },
  sectionNote: {
    fontSize: fontScale(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.7,
    lineHeight: fontScale(18),
  },

  metaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    padding: scale(14),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  metaIcon: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(16),
    backgroundColor: 'rgba(67,170,100,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaLabel: {
    fontSize: fontScale(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.75,
    lineHeight: fontScale(18),
  },
  metaValue: {
    marginTop: scale(4),
    fontSize: fontScale(17),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(23),
  },

  detailCard: {
    marginHorizontal: scale(16),
    padding: scale(14),
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    flexDirection: 'row',
    gap: scale(12),
    alignItems: 'center',
  },
  detailLeftBar: {
    width: scale(6),
    height: '100%',
    borderRadius: 999,
    backgroundColor: 'rgba(67,170,100,0.25)',
  },
  detailTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    flexWrap: 'wrap',
  },
  detailTitle: {
    fontSize: fontScale(17),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(23),
  },
  detailSub: {
    marginTop: scale(6),
    fontSize: fontScale(15),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.85,
    lineHeight: fontScale(21),
  },
  money: {
    fontSize: fontScale(17),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(23),
  },

  tag: {
    maxWidth: scale(220),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  tagText: {
    fontSize: fontScale(13),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.9,
    lineHeight: fontScale(18),
  },

  discountLine: {
    marginTop: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  discountText: {
    fontSize: fontScale(15),
    fontFamily: Fonts.MEDIUM,
    color: Colors.greenPrimary,
    lineHeight: fontScale(21),
  },

  pointPill: {
    marginTop: scale(10),
    alignSelf: 'flex-start',
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
    backgroundColor: 'rgba(67,170,100,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(67,170,100,0.25)',
  },
  pointPillText: {
    fontSize: fontScale(13),
    fontFamily: Fonts.BOLD,
    color: Colors.greenPrimary,
    lineHeight: fontScale(18),
  },

  dockWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  dockCard: {
    borderRadius: scale(18),
    backgroundColor: '#FFFFFF',
    padding: scale(14),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  sumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(7),
  },
  sumLabel: {
    fontSize: fontScale(15),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.85,
    lineHeight: fontScale(20),
  },
  sumValue: {
    fontSize: fontScale(15),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(20),
  },
  sep: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: scale(10),
  },
  sumLabelStrong: {
    fontSize: fontScale(16),
    fontFamily: Fonts.BOLD,
    color: Colors.h1,
    lineHeight: fontScale(22),
  },
  sumValueStrong: {
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(24),
  },
  sumHint: {
    marginTop: scale(10),
    fontSize: fontScale(14),
    fontFamily: Fonts.MEDIUM,
    color: Colors.h2,
    opacity: 0.8,
    lineHeight: fontScale(20),
  },
});
