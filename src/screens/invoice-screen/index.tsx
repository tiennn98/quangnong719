import React, {useCallback, useMemo, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  SectionList,
  ListRenderItemInfo,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-utils-scale';
import moment from 'moment';
import reactotron from 'reactotron-react-native';
import {CText} from '@/components';
import InvoiceBlock from '@/components/invoice-block';
import {useGetProfile} from '@/hooks/useProfile';
import {useGetInvoiceList} from '@/hooks/useInvoice';
import {Colors, Fonts} from '@/themes';
import { InvoiceData } from '@/services/invoice.api';

const InvoiceScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {data: profile, refetch: refetchProfile} = useGetProfile();
  const {
    data: invoiceList = [],
    isLoading,
    isFetchingNextPage,
    refetch: refetchInvoices,
  } = useGetInvoiceList(profile?.phone_number, page);
reactotron.log('InvoiceList', invoiceList);
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setPage(1);
    try {
      await Promise.all([refetchProfile(), refetchInvoices()]);
    } catch (error) {
      reactotron.log('Error refreshing data', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchProfile, refetchInvoices]);

  const onLoadMore = useCallback(() => {
    if (!isLoading && !isFetchingNextPage && invoiceList.length > 0) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, isFetchingNextPage, invoiceList.length]);

  const sections: InvoiceSection[] = useMemo(() => {
    if (!invoiceList?.length) {
      return [];
    }

    const grouped = invoiceList?.reduce(
      (acc: {[key: string]: InvoiceData[]}, inv) => {
        const dateKey = moment(inv.purchaseDate).format('DD/MM/YYYY');
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(inv);
        return acc;
      },
      {},
    );

    return Object.keys(grouped)
      .map(date => ({
        title: date,
        data: grouped[date],
      }))
      .sort(
        (a, b) =>
          moment(b.title, 'DD/MM/YYYY').valueOf() -
          moment(a.title, 'DD/MM/YYYY').valueOf(),
      );
  }, [invoiceList]);

  const renderHeader = useMemo(
    () => (
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
            Xem tất cả hóa đơn của bạn
          </CText>
        </View>
        <View style={styles.headerRight}>
          <CText
            align="center"
            fontFamily={Fonts.REGULAR}
            color={Colors.greenPrimary}
            fontSize={12}>
            Tổng hóa đơn{'\n'}
            <CText fontFamily={Fonts.BOLD} fontSize={18}>
              {invoiceList?.total || 0}
            </CText>
          </CText>
        </View>
      </View>
    ),
    [profile?.total_invoiced],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<InvoiceData>) => (
      <View style={styles.invoiceItem}>
        <InvoiceBlock
          invoiceId={item.code}
          branchName={item.branchName}
          purchaseDate={item.purchaseDate}
          totalAmount={item.total.toString()}
          status={item.status}
          onDetailPress={() => {}}
          totalPayment={item.totalPayment}
          invoiceDetails={item.invoiceDetails}
        />
      </View>
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({section: {title}}: {section: InvoiceSection}) => (
      <View style={styles.sectionHeader}>
        <CText fontFamily={Fonts.BOLD} color={Colors.blue400} fontSize={14}>
          Ngày: {title}
        </CText>
      </View>
    ),
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return <View style={{height: 20}} />;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.greenPrimary} />
      </View>
    );
  }, [isFetchingNextPage]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {renderHeader}

        <SectionList<InvoiceData, InvoiceSection>
          sections={sections}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={Colors.greenPrimary}
              colors={[Colors.greenPrimary]}
            />
          }
          ListEmptyComponent={
            !isLoading && (
              <View style={styles.emptyContainer}>
                <CText color={Colors.h2}>Không có dữ liệu hóa đơn.</CText>
              </View>
            )
          }
          removeClippedSubviews={true}
          initialNumToRender={10}
        />
      </View>
    </SafeAreaView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.white},
  container: {flex: 1, paddingHorizontal: scale(16)},
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(16),
  },
  headerLeft: {flex: 1},
  headerRight: {
    backgroundColor: Colors.yellow,
    borderRadius: scale(12),
    padding: scale(10),
    justifyContent: 'center',
    minWidth: scale(90),
  },
  invoiceItem: {marginBottom: scale(8)},
  sectionHeader: {
    backgroundColor: Colors.white,
    paddingVertical: scale(10),
  },
  contentContainer: {paddingBottom: scale(20)},
  footerLoader: {paddingVertical: scale(20)},
  emptyContainer: {alignItems: 'center', marginTop: scale(50)},
});
