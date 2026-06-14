import React, { useCallback } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import BottomActions from './components/BottomActions';
import HowToUseSection from './components/HowToUseSection';
import ProductsSection from './components/ProductsSection';
import TermsSection from './components/TermsSection';
import ValiditySection from './components/ValiditySection';
import VoucherDetailHeader from './components/VoucherDetailHeader';
import VoucherHeroCard from './components/VoucherHeroCard';
import { DEFAULT_VOUCHER_DETAIL } from './data';

const VoucherDetailScreen: React.FC = () => {
  const voucher = DEFAULT_VOUCHER_DETAIL;

  const handleSeeMore = useCallback(() => {
    console.log('[VoucherDetail] see more products');
  }, []);

  const handleSave = useCallback(() => {
    console.log('[VoucherDetail] save voucher');
  }, []);

  const handleUse = useCallback(() => {
    console.log('[VoucherDetail] use voucher');
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7F6" />

      <VoucherDetailHeader />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <VoucherHeroCard voucher={voucher} />

        <TermsSection conditions={voucher.conditions} />

        <ProductsSection
          products={voucher.products}
          onSeeMore={handleSeeMore}
        />

        <ValiditySection
          startDate={voucher.startDate}
          endDate={voucher.endDate}
        />

        <HowToUseSection steps={voucher.usageSteps} />

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomActions onSave={handleSave} onUse={handleUse} />
    </View>
  );
};

export default VoucherDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(8),
  },
  bottomSpacer: {
    height: scale(8),
  },
});
