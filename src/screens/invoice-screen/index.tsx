import {CText} from '@/components';
import {useGetProfile} from '@/hooks/useProfile';
import {Colors, Fonts} from '@/themes';
import React, {useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  SectionList,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import {scale} from 'react-native-utils-scale';
import {useGetInvoiceList} from '@/hooks/useInvoice';
import reactotron from 'reactotron-react-native';
import moment from 'moment';

interface InvoiceDetail {
  productId: number;
  productCode: string;
  productName: string;
}

interface Invoice {
  id: number;
  uuid: string;
  code: string;
  purchaseDate: string;
  branchName: string;
  customerName: string;
  total: number;
  totalPayment: number;
  statusValue: string;
  invoiceDetails: InvoiceDetail[];
}

interface InvoiceSection {
  title: string;
  data: Invoice[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const InvoiceScreen = () => {
  const {data: profile} = useGetProfile();
  const {data: invoiceList = []} = useGetInvoiceList(profile?.phone_number);
  reactotron.log('INVOICE LIST:', invoiceList);

  const sections: InvoiceSection[] = useMemo(() => {
    if (!invoiceList || invoiceList?.length === 0) {
      return [];
    }

    const groupedByDate: {[key: string]: Invoice[]} = {};

    invoiceList?.forEach?.((invoice: Invoice) => {
      const dateKey = moment(invoice.purchaseDate).format('DD/MM/YYYY');
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(invoice);
    });

    return Object.keys(groupedByDate)
      .map(date => ({
        title: date,
        data: groupedByDate[date],
      }))
      .sort(
        (a, b) =>
          moment(b.title, 'DD/MM/YYYY').valueOf() -
          moment(a.title, 'DD/MM/YYYY').valueOf(),
      );
  }, [invoiceList]);

  const _renderHeader = useCallback(() => {
    return (
      <View style={styles.viewHeader}>
        <View style={styles.headerLeft}>
          <CText
            fontFamily={Fonts.BOLD}
            color={Colors.greenPrimary}
            fontSize={24}>
            Lịch sử mua hàng
          </CText>
          <CText
            fontFamily={Fonts.REGULAR}
            color={Colors.greenPrimary}
            fontSize={14}>
            Xem tất cả hóa đơn và giao dịch của bạn
          </CText>
        </View>
        <View style={styles.headerRight}>
          <CText
            align="center"
            fontFamily={Fonts.REGULAR}
            color={Colors.greenPrimary}
            fontSize={12}>
            Tổng số hoá đơn : {profile?.total_invoiced || 0}
          </CText>
        </View>
      </View>
    );
  }, [profile?.total_invoiced]);

  const _renderItem = useCallback(({item}: ListRenderItemInfo<Invoice>) => {
    return (
      <View style={styles.invoiceItem}>
        <View style={styles.itemRow}>
          <CText fontFamily={Fonts.MEDIUM} color={Colors.h1} fontSize={16}>
            {item.code} - {item.branchName}
          </CText>
          <CText
            fontFamily={Fonts.MEDIUM}
            color={Colors.greenPrimary}
            fontSize={16}>
            {formatCurrency(item.total)}
          </CText>
        </View>
        <View style={styles.itemRow}>
          <CText fontFamily={Fonts.REGULAR} color={Colors.h2} fontSize={14}>
            Khách hàng: {item.customerName}
          </CText>
          <CText fontFamily={Fonts.REGULAR} color={Colors.h2} fontSize={14}>
            Thanh toán: {formatCurrency(item.totalPayment)}
          </CText>
        </View>
        <View style={styles.itemRow}>
          <CText fontFamily={Fonts.MEDIUM} color={Colors.h1} fontSize={14}>
            Chi tiết ({item.invoiceDetails.length} SP)
          </CText>
          <CText
            fontFamily={Fonts.BOLD}
            color={item.status === 1 ? Colors.greenPrimary : Colors.red}
            fontSize={14}>
            {item.statusValue}
          </CText>
        </View>
      </View>
    );
  }, []);

  const _renderSectionHeader = useCallback(
    ({section: {title}}: {section: InvoiceSection}) => {
      return (
        <View style={styles.sectionHeader}>
          <CText fontFamily={Fonts.BOLD} color={Colors.h1} fontSize={18}>
            Ngày: {title}
          </CText>
        </View>
      );
    },
    [],
  );

  const _renderInvoiceList = () => {
    return (
      <View style={styles.listContainer}>
        {sections.length > 0 ? (
          <SectionList<Invoice, InvoiceSection>
            sections={sections}
            keyExtractor={(item, index) => item.id.toString() + index}
            renderItem={_renderItem}
            renderSectionHeader={_renderSectionHeader}
            stickySectionHeadersEnabled={true}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.contentContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CText fontFamily={Fonts.REGULAR} color={Colors.h2} fontSize={16}>
              Chưa có hóa đơn nào được ghi nhận.
            </CText>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {_renderHeader()}
        {_renderInvoiceList()}
      </View>
    </SafeAreaView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(16),
  },
  headerLeft: {
    paddingRight: scale(16),
    flex: 2,
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
    borderRadius: scale(16),
    padding: scale(12),
    maxHeight: scale(80),
  },
  listContainer: {
    flex: 1,
  },
  invoiceItem: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(5),
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(4),
  },
  separator: {
    height: 1,
    backgroundColor: Colors.h2,
    marginHorizontal: scale(5),
  },
  sectionHeader: {
    backgroundColor: Colors.backgroundInput,
    paddingVertical: scale(8),
    paddingHorizontal: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: Colors.h2,
  },
  contentContainer: {
    paddingBottom: scale(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: scale(50),
  },
});
