import moment from 'moment';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import {scale, width} from 'react-native-utils-scale';

import {Images} from '@/assets';
import {CText} from '@/components';
import InvoiceBlock from '@/components/invoice-block';
import {useGetInvoiceList} from '@/hooks/useInvoice';
import {useGetProfile} from '@/hooks/useProfile';
import {InvoiceData, InvoiceResponse} from '@/services/invoice.api';
import {Colors, Fonts} from '@/themes';
import { SCREEN_NAME } from '@/constants';
import { navigate } from '@/navigators';

type InvoiceSection = {
  title: string;
  data: InvoiceData[];
};

const InvoiceScreen: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const listRef = useRef<SectionList<InvoiceData, InvoiceSection>>(null);
  const lastEndReachedRef = useRef<number>(0);

  const {data: profile, refetch: refetchProfile} = useGetProfile();

  const {
    data: invoiceResponse,
    isLoading,
    isFetching,
    refetch: refetchInvoices,
  } = useGetInvoiceList(profile?.phone_number) as {
    data?: InvoiceResponse;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => Promise<any>;
  };

  const invoiceList = useMemo<InvoiceData[]>(
    () => invoiceResponse?.data ?? [],
    [invoiceResponse?.data],
  );
  const totalInvoices: number = invoiceResponse?.total ?? 0;

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchProfile(), refetchInvoices()]);
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchProfile, refetchInvoices]);

  const onEndReached = useCallback(() => {
    if (isLoading || isFetching) {
      return;
    }
    if (!invoiceList.length) {
      return;
    }

    const now = Date.now();
    if (now - lastEndReachedRef.current < 1500) {
      return;
    }
    lastEndReachedRef.current = now;

    refetchInvoices();
  }, [isLoading, isFetching, invoiceList.length, refetchInvoices]);

  const onScrollToIndexFailed = useCallback(
    (info: {
      index: number;
      highestMeasuredFrameIndex: number;
      averageItemLength: number;
    }) => {
      const offset = info.averageItemLength * info.index;
      requestAnimationFrame(() => {
        listRef.current?.scrollToOffset({offset, animated: false});
      });
    },
    [],
  );

  const sections: InvoiceSection[] = useMemo(() => {
    if (!invoiceList.length) {
      return [];
    }

    const grouped = invoiceList.reduce<Record<string, InvoiceData[]>>(
      (acc, inv) => {
        const dateKey = moment(inv.purchaseDate).format('DD/MM/YYYY');
        (acc[dateKey] ??= []).push(inv);
        return acc;
      },
      {},
    );

    return Object.keys(grouped)
      .map(date => ({title: date, data: grouped[date]}))
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
            <CText fontFamily={Fonts.BOLD} fontSize={18} style={{lineHeight: 24,textAlign: 'center'}}>
              {totalInvoices}
            </CText>
          </CText>
        </View>
      </View>
    ),
    [totalInvoices],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<InvoiceData>) => (
      <View style={styles.invoiceItem}>
        <InvoiceBlock
          invoiceId={item.code}
          branchName={item.branchName}
          purchaseDate={item.purchaseDate}
          totalAmount={String(item.total)}
          status={item.status as any}
          onDetailPress={() =>
         navigate(SCREEN_NAME.INVOICE_DETAIL_SCREEN, {invoice: item})
        }
          totalPayment={item.totalPayment}
          invoiceDetails={item.invoiceDetails}
        />
      </View>
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: InvoiceSection}) => (
      <View style={styles.sectionHeader}>
        <CText fontFamily={Fonts.BOLD} color={Colors.blue400} fontSize={14}>
          Ngày: {section.title}
        </CText>
      </View>
    ),
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isFetching || isRefreshing) {
      return <View style={{height: 20}} />;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.greenPrimary} />
      </View>
    );
  }, [isFetching, isRefreshing]);

  const EmptyComponent = useMemo(() => {
    if (isLoading) {
      return null;
    }
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={Images.logo}
          style={styles.emptyLogo}
          resizeMode="contain"
        />
        <CText
          color={Colors.h2}
          fontFamily={Fonts.BOLD}
          fontSize={16}
          style={{marginTop: scale(10)}}>
          Không có dữ liệu hóa đơn
        </CText>
        <CText
          color={Colors.h2}
          fontSize={13}
          style={{marginTop: scale(6), textAlign: 'center'}}>
          Khi bạn phát sinh mua hàng, hóa đơn sẽ hiển thị tại đây.
        </CText>
      </View>
    );
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {renderHeader}

        {
          <SectionList<InvoiceData, InvoiceSection>
          ref={listRef}
          sections={sections}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={true}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          onScrollToIndexFailed={onScrollToIndexFailed}
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
          ListEmptyComponent={EmptyComponent}
          removeClippedSubviews={Platform.OS === 'android' ? false : true}
          initialNumToRender={10}
        />
        }
      </View>
    </SafeAreaView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: Colors.white,paddingTop: scale(16)},
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
