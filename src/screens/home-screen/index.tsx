import {CHeader, CText} from '@/components';
import {Colors, Fonts} from '@/themes';
import React from 'react';
import {View, StyleSheet, ScrollView, Image, ImageProps} from 'react-native';
import {scale, width} from 'react-native-utils-scale';
import {BarcodeCreatorView, BarcodeFormat} from 'react-native-barcode-creator';
import {ChevronRight} from 'lucide-react-native';
import {Images} from '@/assets';
import {formatToVND} from '@/utils/tools';

const HomeScreen = () => {
  const valueBarCode = 'KH00001KH00001';
  const FakeInvoice = [{}, {}, {}];
  const headerComponent = (icon: ImageProps, title: string) => {
    return (
      <View style={styles.viewContentHeader}>
        <Image source={icon} style={styles.iconLeft} />
        <CText fontSize={16} fontFamily={Fonts.BOLD}>
          {title}
        </CText>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CHeader isHome title={'Xin chào Nhâm báo thủ!'} />
      <View style={styles.viewBarCode}>
        <CText
          fontFamily={Fonts.MEDIUM}
          fontSize={16}
          color={Colors.text}
          align="center">
          ĐƯA MÃ CHO NHÂN VIÊN ĐỂ TÍCH ĐIỂM, SỬ DỤNG ĐIỂM
        </CText>
        <BarcodeCreatorView
          value={valueBarCode}
          background={'#FFFFFF'}
          foregroundColor={'#000000'}
          format={BarcodeFormat.CODE128}
          style={styles.barcode}
        />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.contentHeader}>
          <View
            style={[styles.itemHeader, {backgroundColor: Colors.greenPrimary}]}>
            <CText color={Colors.white} fontFamily={Fonts.BOLD} fontSize={15}>
              999 điểm
            </CText>
            <View style={styles.row}>
              <CText color={Colors.white} fontFamily={Fonts.BOLD} fontSize={15}>
                Xem lịch sử
              </CText>
              <ChevronRight color={Colors.white} />
            </View>
            <View
              style={[
                styles.imageBackground,
                {backgroundColor: Colors.yellow},
              ]}>
              <Image source={Images.wallet} style={styles.iconHeader} />
            </View>
          </View>
          <View style={[styles.itemHeader, {backgroundColor: Colors.yellow}]}>
            <CText color={Colors.white} fontFamily={Fonts.BOLD} fontSize={15}>
              999 điểm
            </CText>
            <View style={styles.row}>
              <CText color={Colors.white} fontFamily={Fonts.BOLD} fontSize={15}>
                Xem quà
              </CText>
              <ChevronRight color={Colors.white} />
            </View>
            <View
              style={[
                styles.imageBackground,
                {backgroundColor: Colors.greenPrimary},
              ]}>
              <Image source={Images.gift} style={styles.iconHeader} />
            </View>
          </View>
        </View>
        <View style={styles.viewDebt}>
          <View style={styles.row}>
            <View style={styles.viewImageLeft}>
              <Image source={Images.debt} style={styles.iconHeader} />
            </View>
            <View style={styles.gap}>
              <CText color={Colors.white} fontFamily={Fonts.BOLD} fontSize={14}>
                Tổng công nợ
              </CText>
              <CText
                color={Colors.red400}
                fontFamily={Fonts.BOLD}
                fontSize={18}>
                {formatToVND(10000000)}
              </CText>
            </View>
          </View>
          <View style={styles.viewRight}>
            <CText color={'#313851'} fontFamily={Fonts.BOLD} fontSize={14}>
              Chi tiết
            </CText>
            <ChevronRight color={'#313851'} size={16} />
          </View>
        </View>
        {headerComponent(Images.referral, 'Chương trình khuyến mãi')}
        <View style={styles.viewReferral}>
          <View style={styles.promoLeft}>
            <CText color={Colors.yellow} fontFamily={Fonts.BOLD} fontSize={16}>
              COMBO 5 XÔ NAVI KP 11-7 10KG
            </CText>
            <CText
              color={Colors.white}
              fontFamily={Fonts.SEMIBOLD}
              fontSize={12}>
              Mua 5 xô được tặng một gói kích hoa trị giá 500k
            </CText>
            <CText
              color={Colors.white}
              fontFamily={Fonts.SEMIBOLD}
              fontSize={12}>
              Từ ngày : 04/11/2025
            </CText>
            <CText
              color={Colors.white}
              fontFamily={Fonts.SEMIBOLD}
              fontSize={12}>
              Đến ngày : 15/11/2025
            </CText>
          </View>
          <Image source={Images.thung} style={styles.imageRight} />
        </View>
        {headerComponent(Images.listInvoice, 'Hoá đơn gần đây')}
        <View style={styles.list}>
          {FakeInvoice.map((e, index) => {
            return (
              <View key={index} style={styles.viewInvoice}>
                <View style={styles.promoLeft}>
                  <CText
                    color={Colors.greenPrimary}
                    fontFamily={Fonts.BOLD}
                    fontSize={16}>
                    Mã hoá đơn : HD004771
                  </CText>
                  <CText
                    color={Colors.greenPrimary}
                    fontFamily={Fonts.SEMIBOLD}
                    fontSize={12}>
                    Số lượng sản phẩm: 6
                  </CText>
                  <CText
                    color={Colors.greenPrimary}
                    fontFamily={Fonts.SEMIBOLD}
                    fontSize={12}>
                    Tổng cộng : 1,250,000 đ
                  </CText>
                  <CText
                    color={Colors.greenPrimary}
                    fontFamily={Fonts.SEMIBOLD}
                    fontSize={12}>
                    Thời gian : 28/10/2025 07:18
                  </CText>
                </View>
                <View style={styles.viewRightDetail}>
                  <CText fontFamily={Fonts.BOLD} fontSize={14}>
                    Chi tiết
                  </CText>
                  <ChevronRight color={Colors.black} size={16} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenPrimary,
  },
  viewBarCode: {
    padding: scale(12),
    borderRadius: 16,
    width: width - scale(40),
    backgroundColor: Colors.white,
    marginLeft: scale(20),
    marginBottom: scale(20),
  },
  barcode: {
    width: '100%',
    height: scale(50),
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemHeader: {
    width: (width - scale(60)) / 2,
    borderRadius: scale(16),
    borderColor: Colors.yellow,
    borderWidth: scale(1),
    gap: scale(12),
    paddingLeft: scale(16),
    paddingVertical: scale(12),
    position: 'relative',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    position: 'absolute',
    bottom: scale(-5),
    right: scale(-5),
    width: scale(50),
    height: scale(50),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeader: {
    width: scale(24),
    height: scale(24),
  },
  viewDebt: {
    width: width - scale(40),
    borderRadius: scale(16),
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#313851',
    marginTop: scale(16),
  },
  viewImageLeft: {
    width: scale(45),
    height: scale(45),
    borderRadius: 999,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  gap: {
    gap: scale(4),
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    gap: scale(4),
  },
  viewContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginVertical: scale(16),
  },
  iconLeft: {
    width: scale(30),
    height: scale(30),
  },
  viewReferral: {
    width: width - scale(40),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
  },
  promoLeft: {
    gap: scale(8),
    flex: 1,
  },
  imageRight: {
    width: scale(80),
    height: scale(120),
  },
  viewInvoice: {
    width: width - scale(40),
    backgroundColor: Colors.yellow,
    borderRadius: scale(12),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
  },
  viewRightDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    gap: scale(2),
    height: 'auto',
  },
  list: {
    gap: scale(12),
    paddingBottom: scale(50),
  },
});
